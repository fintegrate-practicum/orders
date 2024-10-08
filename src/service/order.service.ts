import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Order, OrderDocument } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RabbitPublisherService } from '../rabbit-publisher/rabbit-publisher.service';
import { OrderStatus } from 'src/enums/order.enum';

export interface OrderStats {
  date: string;
  count: number;
}

export interface StatusDistribution {
  status: OrderStatus;
  count: number;
}


@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) { }

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      let mailAdress: string;
      if (process.env.ENV == 'DEVELOPMENT')
        mailAdress = process.env.SENDGRID_FROM_EMAIL;
      const savedOrder = await createdOrder.save();
      const message = {
        pattern: 'message_queue',
        data: {
          to: mailAdress,
          subject: 'Message about a new order',
          html: '',
          type: 'email',
          kindSubject: 'orderMessage',
          numOrder: savedOrder._id,
          nameBussniesCode: savedOrder.businessCode,
          date: `${savedOrder.date.getUTCDate()}/${savedOrder.date.getUTCMonth()}/${savedOrder.date.getUTCFullYear()}`,
        },
      };
      this.logger.log('mail data', message.data);
      this.rabbitPublisherService.publishMessageToCommunication(message);
      return { order: savedOrder, status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: Types.ObjectId,
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const updatedOrder = await this.orderModel.findOneAndUpdate(
        { _id: id },
        { $set: createOrderDto },
        { new: true },
      );
      if (!updatedOrder) {
        return { order: null, status: HttpStatus.NOT_FOUND };
      }
      return { order: updatedOrder, status: HttpStatus.OK };
    } catch (err) {
      throw new HttpException(
        'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(
    id: Types.ObjectId,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const deletedOrder = await this.orderModel.findOneAndDelete({ _id: id });
      if (!deletedOrder) {
        throw new HttpException(
          `Order with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return { order: deletedOrder, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByBusinessCode(businessCode: string): Promise<OrderDocument[]> {
    try {
      return await this.orderModel.find({ businessCode }).exec();
    } catch (error) {
      throw new HttpException(
        'Failed to get orders by business code',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByBusinessCodeAndCustomerId(
    user: string,
    businessCode: string,
  ): Promise<Order[]> {
    try {
      return this.orderModel.find({ user, businessCode }).exec();
    } catch (error) {
      throw new HttpException(
        'Failed to find orders by customer and business code',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrderStats(businessCode: string): Promise<OrderStats[]> {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const today = new Date();
  
    // יצירת מערך של תאריכים במשך השבועיים האחרונים
    const dates: { year: number, month: number, day: number }[] = [];
    let currentDate = new Date(twoWeeksAgo);
  
    while (currentDate <= today) {
      dates.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1, // חודשים ב-MongoDB הם בין 1 ל-12
        day: currentDate.getDate(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // מבצע אגרגציה למציאת מספר ההזמנות לפי תאריך
    const stats = await this.orderModel.aggregate([
      {
        $match: {
          date: { $gte: twoWeeksAgo },
          businessCode: businessCode,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id': 1 },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: '$_id.day',
                },
              },
            },
          },
          count: 1,
        },
      },
    ]);
  
    // התוצאה המלאה שתכיל גם תאריכים ללא הזמנות
    const result = dates.map(date => {
      const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
      const stat = stats.find(s => s.date === formattedDate);
      return {
        date: formattedDate,
        count: stat ? stat.count : 0,
      };
    });
  
    return result;
  }
  
  async getstatusDistribution(businessCode: string): Promise<StatusDistribution[]> {
    try {
      this.logger.log(`Matching businessCode: ${businessCode}`);

      const stats = await this.orderModel.aggregate([
        { $match: { businessCode: businessCode } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $project: { _id: 0, status: '$_id', count: 1 } }
      ]);

      this.logger.log('Aggregation results:', stats);

      const statusMap = {
        [OrderStatus.ACCEPTED]: 'ACCEPTED',
        [OrderStatus.HANDLING]: 'HANDLING',
        [OrderStatus.READY]: 'READY',
        [OrderStatus.SENT]: 'SENT',
      };

      return stats.map(item => ({
        count: item.count,
        status: statusMap[item.status] || 'UNKNOWN'
      }));
    } catch (error) {
      this.logger.error('Failed to get status distribution', error.stack);
      throw new HttpException(
        'Failed to get status distribution',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
