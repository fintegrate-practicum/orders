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
            if (newOrder.products.length === 0)
                return response.status(HttpStatus.UNPROCESSABLE_ENTITY).send("your are not have products");
            const result = await this.orderService.create(newOrder);
            return response.status(HttpStatus.CREATED).send(result);
        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({title:'Failed to create order',content:error.message});

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
            return response.status(error.status).send(error.message);
        }
    }


    @Delete(':id')
    async DeleteOrder(@Param('id') id: string, @Res() response) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                return response.status(HttpStatus.NOT_FOUND).send('Invalid code');
            }
            // if (!(this.generalService.checkingPermissions(id)))
            //     return response.status().send("אין אפשרות למחוק הזמנה זו");
            const result = await this.orderService.remove(id);
            return response.status(HttpStatus.OK).send("order:" + id + "deleted");
        }
        catch (error) {
            return response.status(error.status).send(error.message);
        }
    }

    @Get(':businessCode')
    async GetAllOrdersByBusinessCode(@Param('businessCode') businessCode: string, @Res() response): Promise<Order[]> {
        try {

            const result = await this.orderService.findAllByBusinessCode(businessCode);
            return response.status(HttpStatus.OK).send(result);

        } catch (error) {
            return response.status(error.status).send({title:'Failed to GetAllOrdersByBusinessCode',content:error.message});
        }
    }
    //צריך לשנות בשיביל פםרטי העסק
    @Get(':businessCode/:user')
    async GetOrdersByBusinessCodeByUser(@Param('user') user: string, @Param('businessCode') businessCode: string, @Res() response): Promise<Order[]> {
        try {
            console.log("enter");
            
            const result = await this.orderService.findAllByBusinessCodeAndCustomerId(user,businessCode);
            return response.status(HttpStatus.OK).send(result);

        } catch (error) {
            return response.status(error.status).send({title:'Failed to GetOrdersByBusinessCodeByUser',content:error.message});
        }
    }

}
