import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from 'src/dto/create-cart.dto';
import { UpdateCartDto } from 'src/dto/update-cart.dto';
import { Cart, CartDocument } from 'src/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findByBusinessCodeAndUserId(
    businessCode: string,
    userId: string,
  ): Promise<Cart[]> {
    const carts = await this.cartModel
      .find({ buissnes_code: businessCode, user_id: userId })
      .exec();
    if (!carts || carts.length === 0) {
      throw new NotFoundException(
        `No carts found for businessCode ${businessCode} and user_id ${userId}`,
      );
    }
    return carts;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartModel
      .findByIdAndUpdate(id, updateCartDto, { new: true })
      .exec();
    if (!updatedCart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return updatedCart;
  }

  async remove(id: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findByIdAndDelete(id).exec(); // שימוש ב-findByIdAndDelete
    if (!deletedCart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return deletedCart;
  }
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }
}
