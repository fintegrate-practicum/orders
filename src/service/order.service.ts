import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Order, OrderDocument } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RabbitPublisherService } from '../rabbit-publisher/rabbit-publisher.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      const mailAdress =
        process.env.ENV === 'DEVELOPMENT'
          ? process.env.SENDGRID_FROM_EMAIL
          : ''; // Adjust as needed

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
}
