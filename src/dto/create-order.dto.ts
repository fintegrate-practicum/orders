import { CreateUserDto } from '../dto/create-user.dto';
import { OrderStatus } from '../enums/order.enum'
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
  date: Date;
}
