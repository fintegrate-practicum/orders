// import { Controller, Get, Param } from '@nestjs/common';
// import { OrdersService } from './orders.service';
// import {Order} from '../DTO/orders.dto'
// @Controller('orders')
// export class OrdersController {

//     constructor(private srv: OrdersService) { }
//     @Get()
//     getOrders() {
//         return this.srv.getAllOrders();
//     }

//     @Get(':id')
//     getOrderById(@Param('id') id: string): Promise<Order | null> {
//         return this.srv.getOrderById(id);
//     }

// }

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../DTO/orders.dto';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async addAnOrder(@Body() orderDetails: Order): Promise<number> {
        return this.ordersService.addAnOrder(orderDetails);
    }

    @Put(':id')
    async updateOrder(@Param('id') orderId: string, @Body() updatedOrder: Order): Promise<number> {
        return this.ordersService.updateOrder(orderId, updatedOrder);
    }

    @Delete(':id')
    async deleteOrder(@Param('id') orderId: string): Promise<number> {
        return this.ordersService.deleteOrder(orderId);
    }

    @Get()
    async getAllOrders(): Promise<Order[]> {
        return this.ordersService.getAllOrders();
    }

    @Get(':user')
    async getOrdersByUser(@Param('user') userId: string): Promise<Order[]> {
        return this.ordersService.getOrdersByUser(userId);
    }
}

