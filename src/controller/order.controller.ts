import { Controller, Post, Delete, Body, HttpStatus, Res, HttpException, Get, Put, Param } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { OrderService } from '../service/order.service'
import { Order } from '../entities/order.entity';
import mongoose from "mongoose";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async AddAnOrder(@Body() newOrder: CreateOrderDto, @Res() response): Promise<Order> {
        try {
            if(newOrder.products.length===0)
                return response.status(HttpStatus.NOT_FOUND).send("your are not have products  ");
            const result = await this.orderService.create(newOrder);
            console.log("result",result);
            return response.status(HttpStatus.CREATED).send(result);
        } catch (error) {
            throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @Put(':id')
    async UpdateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Res() response): Promise<Order> {
        try {
            if (!mongoose.isValidObjectId(id)) {
                console.log("enter");
                return response.status(HttpStatus.NOT_FOUND).send('Invalid code');
              }
            const updatedOrder = await this.orderService.update(id, updateOrderDto);
             return response.status(HttpStatus.OK).send(updatedOrder);

        }
        catch (error) {
            throw new HttpException('Failed to update order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Delete(':id')
    async DeleteOrder(@Param('id') id: string, @Res() response) {
        try {
            const result = await this.orderService.remove(id);
            return response.status(HttpStatus.OK).send(result);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get()
    async GetAllOrders(@Res() response): Promise<Order[]> {
        try {
            const result = await this.orderService.findAll();
            return response.status(HttpStatus.OK).send(result);

        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get('user/:customerName')
    async GetOrdersByUser(@Param('customerName') customerName: string, @Res() response): Promise<Order[]> {
        try {
            const orders = await this.orderService.findAllByCustomerName(customerName);
            return response.status(HttpStatus.OK).send(orders);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

}
