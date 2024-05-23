import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import mongoose from "mongoose";


@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) { }


  async create(createOrderDto: CreateOrderDto): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      const savedOrder = await createdOrder.save();
      return { order: savedOrder, status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // createOrderDto: UpdateOrderDto
  async update(id:Types.ObjectId, createOrderDto: CreateOrderDto): Promise<{ order: Order; status: HttpStatus }> {
    console.log("put services");

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, createOrderDto, { new: true });
    console.log("put services updatedOrder!!!!!!!",updatedOrder);
    if (!updatedOrder) {
      return { order: null, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
    return { order: updatedOrder, status: HttpStatus.CREATED };

  }

  async remove(id: String): Promise<{ order: Order; status: HttpStatus }> {
    try {
      // Validate the object ID
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
      }

      // Delete the order
      const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();

      // If order not found, throw error
      if (!deletedOrder) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return { order: deletedOrder, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException('Failed to delete order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByBusinessCode(businessCode: string): Promise<Order[]> {
    try {
      return this.orderModel.find({ businessCode }).exec();
    } catch (error) {
      throw new HttpException('Failed to getAllByBusinessCode order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //צריך לשנות בשיביל פרטי העסק
  async findAllByCustomerName(customerName: string): Promise<Order[]> {
    try {
      return this.orderModel.find({ customerName }).exec();
    } catch (error) {
      throw new HttpException('Failed to find orders by customer name', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
