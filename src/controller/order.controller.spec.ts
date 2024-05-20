// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderController } from './order.controller';
// import { OrderService } from '../service/order.service';

// describe('OrderController', () => {
//   let controller: OrderController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [OrderController],
//       providers: [OrderService],
//     }).compile();

//     controller = module.get<OrderController>(OrderController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../entities/order.entity'; // Assuming OrderModel is defined in order.model.ts

describe('OrderController', () => {
  let controller: OrderController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService,
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a new newOrder', () => {
    const newOrder = {
      user: 'chaya',
      products: ['p1', 'p2', 'p3'],
      destinationAddress: {
        city: "New York",
        street: 'Fifth Avenue',
        numBuild: 12
      },
      businessCode: "AS12"
    }

    return request(app.getHttpServer())
      .post('/orders')
      .send(newOrder)
      .expect(201)
      .expect(({ body }) => {
        console.log(body); // ההדפסה כאן
        expect(body.order.user).toEqual(newOrder.user);
        expect(body.order.products).toBeDefined();
        expect(body.order.destinationAddress).toBeDefined();
        expect(body.order.destinationAddress.city).toBeDefined();
        expect(body.order.destinationAddress.city).toContain('New York');
        expect(body.order.destinationAddress.street).toBeDefined();
        expect(body.order.destinationAddress.street).toContain('Fifth Avenue');
        expect(body.order.destinationAddress.numBuild).toBeDefined();
        expect(body.order.destinationAddress.numBuild).toContain('12');
        expect(body.order.businessCode).toBeDefined();
        expect(body.order.date).toBeDefined();
      });

      
  }
  
);

});
