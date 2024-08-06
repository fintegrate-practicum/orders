import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from 'src/controller/cart.controller';
import { Cart, CartSchema } from 'src/entities/cart.entity';
import { CartService } from 'src/service/cart.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    HttpModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
