// import { CreateUserDto } from '../dto/create-user.dto'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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
  user: string;

  //מטיפוס משתמש שאמור להגיע מצוות משתמשים...
  // @Prop({ required: true })
  // user: CreateUserDto;

  @Prop({ required: true })
  products: string[];

  //מטיפוס מוצר שאמור להגיע מצוות האדום...
  // @Prop({ required: true })
  // products: Product[];

  @Prop({
    required: true,
    type: {
      city: String,
      street: String,
      numBuild: Number,
    },
  })
  destinationAddress: { city: string; street: string; numBuild: number };

  @Prop({ default: OrderStatus.ACCEPTED })
  status: OrderStatus;

  @Prop({ default: new Date() })
  date: Date;
  //קוד בית העסק אמור להישלף מפרטי המנהל
  @Prop({ required: true })
  businessCode: string;

  @Prop({ required: true })
  settingManeger: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});

OrderSchema.set('toJSON', {
  virtuals: true,
});

OrderSchema.set('toObject', {
  virtuals: true,
});
