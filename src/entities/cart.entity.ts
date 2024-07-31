import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, required: true, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  product_id: string;

  @Prop({ required: true })
  buissnes_code: string;

  @Prop({ type: SchemaTypes.Mixed })
  metadata: Record<string, any>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
