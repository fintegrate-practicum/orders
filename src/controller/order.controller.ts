import { Controller, Post, Delete, Body, HttpStatus, Res, HttpException, Get, Put, Param } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { OrderService } from '../service/order.service'
import { GeneralService } from '../service/general.service'
import { Order } from '../entities/order.entity';
import { Types } from 'mongoose';
// import { OrderStatus } from '../enums/order.enum'
import { CreateManagerDto } from '../dto/create-manager.dto';
import mongoose from "mongoose";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService,private readonly generalService:GeneralService) { }
    // constructor(private readonly orderService: OrderService) { }

    @Post()
    async AddAnOrder(@Body() newOrder: CreateOrderDto, @Res() response): Promise<Order> {
        try {
            if (newOrder.products.length === 0)
                return response.status(HttpStatus.UNPROCESSABLE_ENTITY).send("your are not have products");
            const result = await this.orderService.create(newOrder);
            console.log("result", result);
            return response.status(HttpStatus.CREATED).send(result);
        } catch (error) {
            throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Put(':id')
    async UpdateOrder(@Param('id') id:Types.ObjectId, @Body() order: CreateOrderDto, @Res() response): Promise<Order> {
        try {
            // if (!mongoose.isValidObjectId(order.id)) {
            //     return response.status(HttpStatus.NOT_FOUND).send('Invalid code');
            // }
            //,CreateManagerDto.setting
            if (!(this.generalService.checkingPermissions(id,order.businessCode))) {
                console.log("false");
                return response.status(HttpStatus.FORBIDDEN).send('Not authorized');
            }
            console.log("controller put");
            
            const updatedOrder = await this.orderService.update(id,order);
            console.log('updatedOrder',updatedOrder);
            
            return response.status(HttpStatus.OK).send(updatedOrder);
        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(order);
        }
    }

    @Delete(':id')
    async DeleteOrder(@Param('id') id: String, @Res() response) {
        try {
            const result = await this.orderService.remove(id);
            return response.status(HttpStatus.OK).send(result);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get(':businessCode')
    async GetAllOrdersByBusinessCode(@Param('businessCode') businessCode: string, @Res() response): Promise<Order[]> {
        try {
            const result = await this.orderService.findAllByBusinessCode(businessCode);
            return response.status(HttpStatus.OK).send(result);

        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    //צריך לשנות בשיביל פםרטי העסק
    @Get('user/:customerName')
    async GetOrdersByBusinessCodeByUser(@Param('customerName') customerName: string, @Res() response): Promise<Order[]> {
        try {
            const orders = await this.orderService.findAllByCustomerName(customerName);
            return response.status(HttpStatus.OK).send(orders);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

}
