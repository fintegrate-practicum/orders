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
  HttpException,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderService } from '../service/order.service';
import { GeneralService } from '../service/general.service';
import { Types } from 'mongoose';
import { Order } from 'src/entities/order.entity';

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
          .send('Your order must contain products.');
      const result = await this.orderService.create(newOrder);
      return response
        .status(HttpStatus.CREATED)
        .send({ order: result.order, status: HttpStatus.CREATED });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        title: 'Failed to create order',
        content: error.message,
      });
    }
  }

  @Put(':id')
  async UpdateOrder(
    @Param('id') id: string,
    @Body() order: CreateOrderDto,
    @Res() response,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const objectId = this.convertToObjectId(id);
      const enabled = await this.generalService.checkingPermissions(
        objectId,
        order.businessCode,
      );
      if (!enabled) {
        return response.status(HttpStatus.FORBIDDEN).send('Not authorized');
      }
      const { order: updatedOrder } = await this.orderService.update(
        objectId,
        order,
      );
      return response.status(200).send(updatedOrder);
    } catch (error) {
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          title: 'Failed to update order',
          content: error.message,
        });
    }
  }

  @Delete(':id')
  async DeleteOrder(
    @Param('id') id: string,
    @Body() businessCode: any,
    @Res() response,
  ) {
    try {
      const objectId = this.convertToObjectId(id);
      const enabled = await this.generalService.checkingPermissions(
        objectId,
        businessCode.businessCode,
      );
      if (!enabled) {
        return response.status(HttpStatus.FORBIDDEN).send('Not authorized');
      }
      await this.orderService.remove(objectId);
      return response.status(HttpStatus.OK).send(`Order:${id} deleted`);
    } catch (error) {
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          title: 'Failed to delete order',
          content: error.message,
        });
    }
  }

  //צריך לשנות בשיביל פםרטי העסק
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
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          title: 'Failed to get orders by business code',
          content: error.message,
        });
    }
  }

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
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          title: 'Failed to get orders by business code and user',
          content: error.message,
        });
    }
  }

  private convertToObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(
        'Invalid ObjectId format',
        HttpStatus.BAD_REQUEST,
      );
    }
    return new Types.ObjectId(id);
  }
}
