import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
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
// Add a virtual field 'id'
CartSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized.
CartSchema.set('toJSON', {
  virtuals: true,
});

CartSchema.set('toObject', {
  virtuals: true,
});
