// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { OrderService } from '../service/order.service';
// import { CreateOrderDto } from '../dto/create-order.dto';
// import { UpdateOrderDto } from '../dto/update-order.dto';

// @Controller('order')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   create(@Body() createOrderDto: CreateOrderDto) {
//     return this.orderService.create(createOrderDto);
//   }

//   @Get()
//   findAll() {
//     return this.orderService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.orderService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
//     return this.orderService.update(+id, updateOrderDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.orderService.remove(+id);
//   }
// }
// // //
// import { Controller, Get, Post, Put, Delete, Param, Body,Res,HttpStatus  } from '@nestjs/common';
// import { OrderService } from '../service/order.service'
// import { CreateOrderDto } from '../dto/create-order.dto'
// import { OrderDocument } from 'src/entities/order.entity';
// import {Order} from '../entities/order.entity'
// @Controller('orders')
// export class OrderController {

//     constructor(private readonly ordersService: OrderService) {}


//     // @Post()
//     // async addAnOrder(@Body() newOrder: CreateOrderDto): Promise<number> {
//     //     return this.ordersService.addAnOrder(newOrder);
//     // }
//     // @Post()
//     // async create(@Body() newOrder: CreateOrderDto): Promise<Order> {
//     //     return this.ordersService.create(newOrder);
//     // }
//     @Post()
//     async create(@Body() newOrder: CreateOrderDto, @Res() response): Promise<Order> {
//       const result = await this.ordersService.create(newOrder);
//       return response.status(HttpStatus.CREATED).send(result);
//     }
//   }
//
import { Controller, Post, Delete, Body, HttpStatus, Res, HttpException, Get, Put, Param } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { OrderService } from '../service/order.service'
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async AddAnOrder(@Body() newOrder: CreateOrderDto, @Res() response): Promise<Order> {
        try {
            // if(newOrder.products.length===0)
            //     return response.status(HttpStatus.NOT_FOUND).send("your are not have products  ");

            const result = await this.orderService.create(newOrder);
            return response.status(HttpStatus.CREATED).send(result);
        } catch (error) {
            throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put(':id')
    async UpdateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Res() response): Promise<Order> {
        try {
            // Validate the object ID
            // if (!mongoose.isValidObjectId(id)) {
            //   throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

            // Update the order
            const updatedOrder = await this.orderService.upDate(id, updateOrderDto);
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
