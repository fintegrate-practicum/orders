import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

const mockOrder: CreateOrderDto = {
  user: "lea",
  products: ["p1", "p2"],
  destinationAddress: {
    city: "Jerusalem",
    street: "Hazon Aish",
    numBuild: 12
  },
  businessCode: "1@34",
  date: undefined
};

const mockOrderService = {
  create: jest.fn().mockReturnValue(mockOrder),
  findAllByBusinessCode: jest.fn().mockReturnValue([mockOrder]),
  findAllByBusinessCodeAndCustomerId: jest.fn().mockReturnValue([mockOrder]),
  update: jest.fn().mockReturnValue(mockOrder),
  remove: jest.fn().mockReturnValue(mockOrder),
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order data', async () => {
    const response = mockResponse();
    await controller.AddAnOrder(mockOrder, response);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockOrder);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(response.send).toHaveBeenCalledWith({ order: mockOrder, status: HttpStatus.CREATED });
  });

  it('should return 422 when products array is empty', async () => {
    const response = mockResponse();
    const mockOrderWithEmptyProducts = { ...mockOrder, products: [] };

    await controller.AddAnOrder(mockOrderWithEmptyProducts, response);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(response.send).toHaveBeenCalledWith('your are not have products');
  });
  it('should update order data by id and payload', async () => {
    const response = mockResponse();
    const validId = '60b6c0b4f1f2c50015b9b7d1';  // Example of a valid MongoDB ObjectId

    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);

    await controller.UpdateOrder(validId, mockOrder, response);

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(validId, mockOrder);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(mockOrder);
  });

  it('should return 404 when invalid id is provided for update', async () => {
    const response = mockResponse();
    const invalidId = 'invalidId';
    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
    await controller.UpdateOrder(invalidId, mockOrder, response);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.send).toHaveBeenCalledWith('Invalid code');
  });

  it('should delete order data by id', async () => {
    const response = mockResponse();
    const validId = '60b6c0b4f1f2c50015b9b7d1';  // Example of a valid MongoDB ObjectId
    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
    await controller.DeleteOrder(validId, response);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(validId);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(`order:${validId}deleted`);
  });

  it('should return 404 when invalid id is provided for delete', async () => {
    const response = mockResponse();
    const invalidId = 'invalidId';
    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
    await controller.DeleteOrder(invalidId, response);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.send).toHaveBeenCalledWith('Invalid code');
  });

  it('should get all orders by business code', async () => {
    const response = mockResponse();
    const businessCode = 'ABC123';

    await controller.GetAllOrdersByBusinessCode(businessCode, response);

    expect(service.findAllByBusinessCode).toHaveBeenCalledTimes(1);
    expect(service.findAllByBusinessCode).toHaveBeenCalledWith(businessCode);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith([mockOrder]);
  });

  it('should get orders by business code and user', async () => {
    const response = mockResponse();
    const businessCode = 'ABC123';
    const user = 'user1';

    await controller.GetOrdersByBusinessCodeByUser(user, businessCode, response);

    expect(service.findAllByBusinessCodeAndCustomerId).toHaveBeenCalledTimes(1);
    expect(service.findAllByBusinessCodeAndCustomerId).toHaveBeenCalledWith(user, businessCode);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith([mockOrder]);
  });
});
