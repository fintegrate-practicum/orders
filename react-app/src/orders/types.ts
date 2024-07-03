
export enum OrderStatus {
    ACCEPTED,
    HANDLING,
    READY,
    SENT
}

export interface Order {
  user: string;                    // User ID or reference
  products: string[];              // Array of product IDs or references
  status: OrderStatus;             // Enum type for order status
  destinationAddress: {
    city: string;                  // City name
    street: string;                // Street name
    numBuild: number;              // Building number
  };
  businessCode: string;            // Code for the business associated with the order
  settingManeger: number;          // Manager setting identifier
  date: Date;                      // Date of the order
  id: string;                      // Use string for ObjectId representation
}
export interface GetByUserParams {
  businessCode: string;
  user: string;
}

