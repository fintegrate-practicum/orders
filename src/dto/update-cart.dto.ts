export class UpdateCartDto {
  readonly user_id?: string;
  readonly product_id?: string;
  readonly metadata?: Record<string, any>;
  readonly buissnes_code: string;
  readonly Quantity: number;
}
