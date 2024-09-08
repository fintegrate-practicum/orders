import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Order, OrderDocument } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RabbitPublisherService } from '../rabbit-publisher/rabbit-publisher.service';
import { OrderStats } from '../interfaces/OrderStats';
import { StatusDistribution } from '../interfaces/statusDistribution';
import { OrderStatus } from 'src/enums/order.enum';


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
      // else
      //   mailAdress=savedOrder.user.email



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
      console.log('Mail data', message.data);
      console.log('Mail data', message.data);

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
        { _id: id },
        { $set: createOrderDto },
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
  async findAllOrders(): Promise<Order[]> {
    try {
      return await this.orderModel.find().exec();
    } catch (error) {
      this.logger.error('Failed to retrieve all orders', error.stack);
      throw new HttpException(
        'Failed to retrieve all orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
