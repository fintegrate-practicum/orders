import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto'
export type OrderDocument = Order & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Order {
  
  @Prop({ required: true })
  custemer: CreateUserDto;

  @Prop({ required: true })
  products:product[] ;

  @Prop({
    required: true,
    type: Object,
    default: {
      city: '',
      street: '',
      numBuild: 0,
    },
  })
  destinationAddress: Object;

  @Prop({ required: true })
  status: boolean;
  
  @Prop({ required: true })
  date: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
