import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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
      console.log(createdOrder);
      const savedOrder = await createdOrder.save();
      console.log(savedOrder);
      return { order: savedOrder, status: HttpStatus.CREATED};
    } catch (error) {
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(ObjectId:Types.ObjectId, createOrderDto: CreateOrderDto): Promise<{ order: Order; status: HttpStatus }> {
    try{
      const updatedOrder = await this.orderModel.findOneAndUpdate({ id: ObjectId },{ $set: createOrderDto }, { new: true });
      if (!updatedOrder) {
        return { order: null, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
      else{
        return { order: updatedOrder, status: HttpStatus.ACCEPTED };
      }
    }catch(err){
      throw new HttpException('Failed to service update order', HttpStatus.INTERNAL_SERVER_ERROR + err);
    }
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
  async findAllByBusinessCodeAndCustomerId(user: string, businessCode: string): Promise<Order[]> {
    try {
      return this.orderModel.find({ user, businessCode }).exec();
    } catch (error) {
      throw new HttpException('Failed to find orders by customer and busienss', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
