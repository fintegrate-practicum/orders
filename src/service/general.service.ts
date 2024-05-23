import { Injectable } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderStatus } from '../enums/order.enum';
import { Types } from 'mongoose';
// import mongoose from "mongoose";
@Injectable()
export class GeneralService {
    constructor(private readonly orderService: OrderService) { }
    //בדיקת הרשאה לעדיכון ההזמנה על פי סטאטוס ההזמנה והרשאות מנהל

    async checkingPermissions(id: Types.ObjectId, businessCode: string): Promise<boolean> {
        console.log("global");
        console.log("id1", id);

        const allOrders = await this.orderService.findAllByBusinessCode(businessCode);
        allOrders.map(o => {
            console.log(o.id.toString());

        })
        const thisOrder = allOrders.find(order => order.id.toString() === id.toString());
        console.log("thisOrder", thisOrder);
        const oneDay = 24 * 60 * 60 * 1000;
        const diffMilliseconds = Math.abs(new Date().getTime() - thisOrder.date.getTime());
        const diffDays = Math.round(diffMilliseconds / oneDay);

        if (diffDays < thisOrder.settingManeger){//&& thisOrder.status === OrderStatus.ACCEPTED) {
            console.log("true");
            return true;
        }
        return false;

    }

}
