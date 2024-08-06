import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from 'src/dto/create-cart.dto';
import { UpdateCartDto } from 'src/dto/update-cart.dto';
import { Cart, CartDocument } from 'src/entities/cart.entity';
import { HttpService } from '@nestjs/axios';
import axiosInstance from 'src/axios/inventoryAxios';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly httpService: HttpService,
  ) {}

  async findByBusinessCodeAndUserId(
    businessCode: string,
    userId: string,
  ): Promise<Cart[]> {
    const carts = await this.cartModel
      .find({ buissnes_code: businessCode, user_id: userId })
      .exec();
    const enrichedCarts = await Promise.all(
      carts.map(async (cart) => {
        const product = await this.getProductById(cart.product_id);

        return {
          ...cart.toObject(),
          product,
        };
      }),
    );

    return enrichedCarts;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const product = await this.getProductById(updateCartDto.product_id);
      if (!product || product.stockQuantity < updateCartDto.metadata.quantity)
        throw new NotFoundException('not enough in stock');
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
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
  private async getProductById(productId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `/inventory/product/${productId}`,
      );
      return response.data;
    } catch (error) {
      return await this.getComponentById(productId);
    }
  }
  private async getComponentById(productId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `/inventory/component/${productId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product with ID ${productId}`, error);
      return { error: 'Failed to fetch product' }; // ערך ברירת מחדל במקרה של שגיאה
    }
  }
}
