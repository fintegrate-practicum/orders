import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../service/cart.service';
import { CreateCartDto } from 'src/dto/create-cart.dto';
import { UpdateCartDto } from 'src/dto/update-cart.dto';
import { Cart } from '../entities/cart.entity';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  const mockCartService = {
    create: jest.fn((dto: CreateCartDto) => {
      return {
        id: '1',
        ...dto,
      };
    }),
    findByBusinessCodeAndUserId: jest.fn(
      (businessCode: string, userId: string) => {
        return [
          {
            id: '1',
            businessCode,
            userId,
            product_id: 'testProduct',
            metadata: {},
          },
        ];
      },
    ),
    update: jest.fn((id: string, dto: UpdateCartDto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id: string) => {
      return {
        id,
        businessCode: 'someBusinessCode',
        userId: 'someUserId',
        product_id: 'someProduct',
        metadata: {},
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cart', async () => {
    const dto: CreateCartDto = {
      user_id: 'testUser',
      product_id: 'testProduct',
      buissnes_code: 'test',
      metadata: {},
    };
    expect(await controller.create(dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find carts by business code and user id', async () => {
    const businessCode = 'test';
    const userId = 'testUser';
    expect(
      await controller.findByBusinessCodeAndUserId(businessCode, userId),
    ).toEqual([
      {
        id: expect.any(String),
        businessCode,
        userId,
        product_id: 'testProduct',
        metadata: {},
      },
    ]);
    expect(service.findByBusinessCodeAndUserId).toHaveBeenCalledWith(
      businessCode,
      userId,
    );
  });

  it('should update a cart', async () => {
    const id = '1';
    const dto: UpdateCartDto = {
      user_id: 'updatedUser',
      product_id: 'updatedProduct',
      buissnes_code: 'updated',
      metadata: {},
    };
    expect(await controller.update(id, dto)).toEqual({
      id,
      ...dto,
    });
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a cart', async () => {
    const id = '1';
    expect(await controller.remove(id)).toEqual({
      id,
      businessCode: expect.any(String),
      userId: expect.any(String),
      product_id: expect.any(String),
      metadata: expect.any(Object),
    });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
