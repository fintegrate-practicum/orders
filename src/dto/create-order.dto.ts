import { CreateUserDto } from '../dto/create-user.dto'
export class CreateOrderDto {
    custemer: CreateUserDto;
    products:product[] ;
    status: boolean;
    destinationAddress:{
      city:string,
      street:string,
      numBuild:number
    };
  date: Date;
}
