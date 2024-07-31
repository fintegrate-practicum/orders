export class CreateCartDto {
  readonly user_id: string;
  readonly product_id: string;
  readonly buissnes_code: string;
  readonly metadata: Record<string, any>;
}
