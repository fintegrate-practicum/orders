import {
  Controller,
  Post,
  Delete,
  Body,
  HttpStatus,
  Res,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderService } from '../service/order.service';
import { GeneralService } from '../service/general.service';
import { Order } from '../entities/order.entity';
import { Types } from 'mongoose';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly generalService: GeneralService,
  ) {}
  @Post()
  async AddAnOrder(
    @Body() newOrder: CreateOrderDto,
    @Res() response,
  ): Promise<any> {
    try {
      if (newOrder.products.length === 0)
        return response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send('your are not have products');
      const result = await this.orderService.create(newOrder);
      return response
        .status(HttpStatus.CREATED)
        .send({ order: result, status: HttpStatus.CREATED });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        title: 'Failed to create order',
        content: error.message,
      });
    }
  }

  @Put(':id')
  async UpdateOrder(
    @Param('id') id: Types.ObjectId,
    @Body() order: CreateOrderDto,
    @Res() response,
  ): Promise<Order> {
    try {
      const enabled = await this.generalService.checkingPermissions(
        id,
        order.businessCode,
      );
      if (!enabled) {
        return response.status(HttpStatus.FORBIDDEN).send('Not authorized');
      }
      const updatedOrder = await this.orderService.update(id, order);
      return response.status(HttpStatus.OK).send(updatedOrder);
    } catch (error) {
      return response.status(error.status).send(error.message);
    }
  }

  @Delete(':id')
  async DeleteOrder(
    @Param('id') id: Types.ObjectId,
    @Body() businessCode: any,
    @Res() response,
  ) {
    try {
      const enabled = await this.generalService.checkingPermissions(
        id,
        businessCode.businessCode,
      );
      if (!enabled) {
        return response.status(HttpStatus.FORBIDDEN).send('Not authorized');
      }
      await this.orderService.remove(id);
      return response.status(HttpStatus.OK).send('order:' + id + 'deleted');
    } catch (error) {
      return response.status(error.status).send({
        title: 'Failed to GetAllOrdersByBusinessCode',
        content: error.message,
      });
    }
  }

  @Get(':businessCode')
  async GetAllOrdersByBusinessCode(
    @Param('businessCode') businessCode: string,
    @Res() response,
  ): Promise<Order[]> {
    try {
      const result =
        await this.orderService.findAllByBusinessCode(businessCode);
      return response.status(HttpStatus.OK).send(result);
    } catch (error) {
      return response.status(error.status).send({
        title: 'Failed to GetAllOrdersByBusinessCode',
        content: error.message,
      });
    }
  }
  //צריך לשנות בשיביל פםרטי העסק
  @Get(':businessCode/:user')
  async GetOrdersByBusinessCodeByUser(
    @Param('user') user: string,
    @Param('businessCode') businessCode: string,
    @Res() response,
  ): Promise<Order[]> {
    try {
      const result = await this.orderService.findAllByBusinessCodeAndCustomerId(
        user,
        businessCode,
      );
      return response.status(HttpStatus.OK).send(result);
    } catch (error) {
      return response.status(error.status).send({
        title: 'Failed to GetOrdersByBusinessCodeByUser',
        content: error.message,
      });
    }
  }
}
