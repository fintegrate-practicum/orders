import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.enum';

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
  userId: String;

  @Prop({ required: true })
  products: { id: string, qty: number }[];
  
  @Prop({
    required: true,
    enum: ['selfCollection', 'delivery'],
  })
  deliveryMethod: string;

  @Prop({
    required: function () { return this.deliveryMethod === 'delivery'; },
    type: {
      city: String,
      street: String,
      numBuild: Number,
      apartmentNumber: Number,
      floor: Number,
      lastName: String
    },
  })
  destinationAddress: { city: string; street: string; numBuild: number; apartmentNumber: number; floor: number; lastName: string; };

  @Prop({ default: OrderStatus.ACCEPTED })
  status: OrderStatus;

  @Prop({ default: new Date() })
  date: Date;

  @Prop({ required: true })
  businessCode: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  settingManeger: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
