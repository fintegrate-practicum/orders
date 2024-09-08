import { OrderStatus } from "src/enums/order.enum";

export interface StatusDistribution {
    status: OrderStatus;
    count: number;
  }
  