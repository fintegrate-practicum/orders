



import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '../ordersApiSlice';
import { Order, OrderStatus } from '../types';
import {
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
} from '@mui/material';
import './singleOrder.css';

const SingleOrder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: orders, isLoading, isError, error, refetch } = useGetAllOrdersQuery();
    const [updateOrder, { isSuccess: isUpdateSuccess }] = useUpdateOrderMutation();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (orders) {
            const selectedOrder = orders.find(order => order.id === id);
            if (selectedOrder) {
                setOrder(selectedOrder);
            }
        }
    }, [orders, id]);

    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/");
        }
    }, [isUpdateSuccess, navigate]);

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const orderData = Object.fromEntries(data.entries());

        const updatedOrder = {
            id: orderData.id as string,
            user: orderData.user as string,
            products: (orderData.products as string).split(',').map(item => item.trim()),
            status: orderData.status as unknown as OrderStatus,
            destinationAddress: {
                city: orderData.city as string,
                street: orderData.street as string,
                numBuild: parseInt(orderData.numBuild as string),
            },
        };

        await updateOrder(updatedOrder);
        refetch(); // רענון רשימת ההזמנות אחרי העדכון
    };

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;
    if (!order) return <h1>Order not found</h1>;

    return (
        <div className='singleOrder-container'>
            <div className='order-container'>
                <Typography variant="h4">Update Order</Typography>
                <form onSubmit={formSubmit} className='form-container'>
                    <input name="id" defaultValue={order.id} type="hidden" />
                    <Box>
                        <TextField
                            name="user"
                            label="User"
                            defaultValue={order.user}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="products"
                            label="Products"
                            defaultValue={order.products.join(', ')}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box>
                        <FormControl fullWidth required>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                defaultValue={order.status}
                            >
                                {Object.values(OrderStatus).map(status => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <TextField
                            name="city"
                            label="City"
                            defaultValue={order.destinationAddress.city}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="street"
                            label="Street"
                            defaultValue={order.destinationAddress.street}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="numBuild"
                            label="Building Number"
                            defaultValue={order.destinationAddress.numBuild}
                            fullWidth
                            required
                            type="number"
                        />
                    </Box>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: "rgb(0,128,128)",
                                border: "2px solid transparent",
                                "&:hover": {
                                    backgroundColor: "rgb(0,128,128)",
                                },
                            }}
                        >
                            Update Order
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default SingleOrder;
