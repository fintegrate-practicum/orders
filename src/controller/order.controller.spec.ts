import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { GeneralService } from '../service/general.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OrderStatus } from '../enums/order.enum';

const mockOrder: CreateOrderDto = {
  user: "lea",
  products: ["p1", "p2"],
  destinationAddress: {
    city: "Jerusalem",
    street: "Hazon Aish",
    numBuild: 12
  },
  businessCode: "1@34",
  date: new Date(),
  settingManeger: 2,
  status: OrderStatus.ACCEPTED,
  id: new mongoose.Types.ObjectId("6654db11f0eff51e8033bf5a")
};

const mockOrderService = {
  create: jest.fn().mockReturnValue(mockOrder),
  findAllByBusinessCode: jest.fn().mockReturnValue([mockOrder]),
  findAllByBusinessCodeAndCustomerId: jest.fn().mockReturnValue([mockOrder]),
  update: jest.fn().mockReturnValue(mockOrder),
  remove: jest.fn().mockReturnValue(mockOrder),
};

const mockGeneralService = {
  checkingPermissions: jest.fn().mockReturnValue(true), // Mocking the checkingPermissions function
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;
  let generalService: GeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
        {
          provide: GeneralService,
          useValue: mockGeneralService,
        }
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
    generalService = module.get<GeneralService>(GeneralService);
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
    expect(orderService.create).toHaveBeenCalledTimes(1);
    expect(orderService.create).toHaveBeenCalledWith(mockOrder);
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
    const validId = new mongoose.Types.ObjectId("6654db11f0eff51e8033bf5a");

    await controller.UpdateOrder(validId, mockOrder, response);

    expect(orderService.update).toHaveBeenCalledTimes(1);
    expect(orderService.update).toHaveBeenCalledWith(validId, mockOrder);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(mockOrder);
  });

  it('should delete order data by id', async () => {
    const response = mockResponse();
    const businessCode = 'ABC123';
    const validId = new mongoose.Types.ObjectId("6654db11f0eff51e8033bf5a");

    jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
    await controller.DeleteOrder(validId, businessCode, response);

    expect(orderService.remove).toHaveBeenCalledTimes(1);
    expect(orderService.remove).toHaveBeenCalledWith(validId);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(`order:${validId}deleted`);
  });

  it('should get all orders by business code', async () => {
    const response = mockResponse();
    const businessCode = 'ABC123';

    await controller.GetAllOrdersByBusinessCode(businessCode, response);

    expect(orderService.findAllByBusinessCode).toHaveBeenCalledTimes(1);
    expect(orderService.findAllByBusinessCode).toHaveBeenCalledWith(businessCode);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith([mockOrder]);
  });

  it('should get orders by business code and user', async () => {
    const response = mockResponse();
    const businessCode = 'ABC123';
    const user = 'user1';

    await controller.GetOrdersByBusinessCodeByUser(user, businessCode, response);

    expect(orderService.findAllByBusinessCodeAndCustomerId).toHaveBeenCalledTimes(1);
    expect(orderService.findAllByBusinessCodeAndCustomerId).toHaveBeenCalledWith(user, businessCode);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith([mockOrder]);
  });
});
