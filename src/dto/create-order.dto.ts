// import { CreateUserDto } from '../dto/create-user.dto';
import { OrderStatus } from '../enums/order.enum'
import { Types } from 'mongoose';
export class CreateOrderDto {
  // user: CreateUserDto;
  // products:product[] ;
  //רק בשביל ההרצה
  user: String;
  products: String[];
  status: OrderStatus;
  destinationAddress: {
    city: String,
    street: String,
    numBuild: Number
  };
  businessCode: string;
  settingManeger:number;
  date: Date;
  id: Types.ObjectId;
}
