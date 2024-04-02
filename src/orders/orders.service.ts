// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import {Order} from '../DTO/orders.dto';
// // import { CreateUserDto } from './dto/create-user.dto';
// // import { User, UserDocument } from './entities/user.entity';

// @Injectable()
// export class OrdersService {


//     constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) { }
//     // create(createUserDto: CreateUserDto) {
//     //     return this.userModel.create({ ...createUserDto });
//     //   }
      
//     async getAllOrders(): Promise<Order[]> {
//         return this.orderModel.find().exec();
//     }

//     async getOrderById(orderId: string): Promise<Order | null> {
//         return this.orderModel.findById(orderId).exec();
//     }
// }
    

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../DTO/orders.dto';

@Injectable()
export class OrdersService {

    constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) {}

    async addAnOrder(orderDetails: Order): Promise<number> {
        try {
            await this.orderModel.create(orderDetails);
            return HttpStatus.OK;
        } catch (error) {
            if (error.code === 11000) { // Duplicate key error
                return HttpStatus.BAD_REQUEST;
            } else {
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }
    }

    async updateOrder(orderId: string, updatedOrder: Order): Promise<number> {
        try {
            await this.orderModel.findByIdAndUpdate(orderId, updatedOrder);
            return HttpStatus.OK;
        } catch (error) {
            if (error.name === 'CastError') { // Invalid order ID
                return HttpStatus.NOT_FOUND;
            } else {
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }
    }

    async deleteOrder(orderId: string): Promise<number> {
        try {
            const result = await this.orderModel.findByIdAndDelete(orderId);
            if (result) {
                return HttpStatus.OK;
            } else {
                return HttpStatus.NOT_FOUND;
            }
        } catch (error) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async getAllOrders(): Promise<Order[]> {
        try {
            return await this.orderModel.find().exec();
        } catch (error) {
            return [];
        }
    }

    async getOrdersByUser(userId: string): Promise<Order[]> {
        try {
            return await this.orderModel.find({ userId }).exec();
        } catch (error) {
            return [];
        }
    }
}
