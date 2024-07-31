import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { Cart } from '../entities/cart.entity';
import { CreateCartDto } from 'src/dto/create-cart.dto';
import { UpdateCartDto } from 'src/dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    //מהטוקן והוספה לאוביקט user_id כאן אמור להיות חילוץ של
    return this.cartService.create(createCartDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':business_code/:user_id')
  async findByBusinessCodeAndUserId(
    @Param('business_code') businessCode: string,
    @Param('user_id') userId: string,
  ): Promise<Cart[]> {
    //מהטוקן ולא דרך הפרמס user_id כאן אמור להיות חילוץ של
    return this.cartService.findByBusinessCodeAndUserId(businessCode, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.update(id, updateCartDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cart> {
    return this.cartService.remove(id);
  }
}
