import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderStatus } from '../enums/order.enum';
import { Types } from 'mongoose';
@Injectable()
export class GeneralService {
  constructor(private readonly orderService: OrderService) {}
  //בדיקת הרשאה לעדיכון ההזמנה על פי סטאטוס ההזמנה והרשאות מנהל
  async checkingPermissions(
id: Types.ObjectId, objectId: Types.ObjectId, businessCode: string,
  ): Promise<boolean> {
    try {
      const allOrders =
        await this.orderService.findAllByBusinessCode(businessCode);
      const thisOrder = allOrders.find(
        (order) => order._id.toString() === id.toString(),
      );
      const oneDay = 24 * 60 * 60 * 1000;
      const diffMilliseconds = Math.abs(
        new Date().getTime() - thisOrder.date.getTime(),
      );
      const diffDays = Math.round(diffMilliseconds / oneDay);
      if (
        diffDays < thisOrder.settingManeger &&
        thisOrder.status === OrderStatus.ACCEPTED
      ) {
        return true;
      }
      return false;
    } catch (error) {
      throw new HttpException(
        'Failed in GeneralService',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
