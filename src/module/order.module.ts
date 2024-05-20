
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { Order, OrderSchema } from '../entities/order.entity'; // Assuming OrderModel is defined in order.model.ts

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],

})
export class OrderModule {}
