// import { CreateUserDto } from '../dto/create-user.dto';
import { OrderStatus } from '../enums/order.enum';
export class CreateOrderDto {
  // user: CreateUserDto;
  // products:product[] ;
  //רק בשביל ההרצה
  user: string;
  products: string[];
  status: OrderStatus;
  destinationAddress: {
    city: string;
    street: string;
    numBuild: number;
  };
  businessCode: string;
  settingManeger: number;
  date: Date;
}
