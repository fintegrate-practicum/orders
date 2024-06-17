import { Test, TestingModule } from '@nestjs/testing';
import { GeneralService } from './general.service';
import { OrderService } from '../service/order.service'; // וכאן היא

describe('GeneralService', () => {
  let service: GeneralService;
  let orderServiceMock: Partial<OrderService>;

  beforeEach(async () => {
    orderServiceMock = {
      findAllByBusinessCode: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneralService,
        { provide: OrderService, useValue: orderServiceMock },
      ],
    }).compile();

    service = module.get<GeneralService>(GeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
