






import apiSlice from "../app/apiSlice";
import { Order } from './types';


export const orderTags = [{ type: 'Orders', id: 'LIST' }] as const;
interface GetByUserParams {

    user: string;
}
const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAllOrders: build.query<Order[], void>({
            query: () => "/orders/11111",
            providesTags: orderTags, // Tag for caching
           
        }),

        getByUser: build.query<Order[], GetByUserParams>({
            query: ({  user }) => ({
                url: `/orders/11111`,
                params: { user },
            }),
            providesTags: (result) => 
                result
                    ? [
                        ...result.map((order) => ({ type: 'Orders', id: order.id } as const)),
                        { type: 'Orders', id: 'LIST' },
                    ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),

        updateOrder: build.mutation<Order, Partial<Order>>({
            query: (order) => ({
                url: `/orders/${order.id}`,
                method: 'PUT',
                body: order,
            }),
            invalidatesTags: orderTags, // Invalidate cache for orders
        }),
     
        deleteOrder: build.mutation<Order, Partial<Order>>({
            query: (order) => ({
                url: `/orders/${order.id}`,
                method: 'Delete',
                body: {   "businessCode": order.businessCode,
                    "id": order.id
                
                    
                  }
            }),
            invalidatesTags: orderTags, // Invalidate cache for orders
        }),
    }),
});

export const { useGetAllOrdersQuery, useUpdateOrderMutation,useDeleteOrderMutation,useGetByUserQuery } = ordersApiSlice;
export default ordersApiSlice;



