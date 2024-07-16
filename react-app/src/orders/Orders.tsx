




import React from 'react';
import {useGetAllOrdersQuery, useGetByUserQuery ,useUpdateOrderMutation,useDeleteOrderMutation} from './ordersApiSlice'; // Assuming you have a query hook for getByUser

import { Link } from 'react-router-dom';
import { Order } from "./types"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    ButtonGroup,
    Typography
} from '@mui/material';
import './orders.css';

const OrderStatusMap = {
    0: 'ACCEPTED',
    1: 'HANDLING',
    2: 'READY',
    3: 'SENT',
};
type OrdersProps = {
    kind: 'admin' | 'user';
};
const Orders: React.FC<OrdersProps> = ({ kind }) => {
    const { data: allOrders, error: allOrdersError, isLoading: allOrdersLoading, refetch: refetchAllOrders } = useGetAllOrdersQuery();
    
    // Assuming useGetByUserQuery requires parameters like businessCode and user
    const { data: userOrders, error: userOrdersError, isLoading: userOrdersLoading, refetch: refetchUserOrders } = useGetByUserQuery({  user: 'defaultUser' });
    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder, { isSuccess: isDeleteSuccess }] = useDeleteOrderMutation()
    const orders = kind === 'admin' ? allOrders : userOrders;
    const refetch = kind === 'admin' ? refetchAllOrders : refetchUserOrders;

   
    const handleUpdateStatus = async (id: string) => {
        const orderToUpdate = orders?.find(order => order.id === id);
        if (orderToUpdate) {
            const newStatus = (orderToUpdate.status + 1) % 4; // Cycle through statuses
            await updateOrder({
                id,
                status: newStatus,
            });
            await refetch(); // Ensure refetch completes
        }
    };


    const deleteClick = (order: Order) => {
     
         if (window.confirm("are you sure you want to delete this order?")) {
            deleteOrder({
                "businessCode": order.businessCode,
                "id": order.id
            })
            refetch()
        }
    
        console.log(isDeleteSuccess);
        
    }

    




    if (allOrdersLoading || userOrdersLoading) return <div>Loading...</div>;
    if (allOrdersError || userOrdersError) return <div>Error: {(allOrdersError || userOrdersError)?.toString()}</div>;
    return (
        <div className='order-list'>
          
            <Typography variant='h2' className='orders'>All Orders</Typography>
            <TableContainer component={Paper} className='orders-container'>
                <Table>
                    <TableHead>
                        <TableRow className='order-details'>
                            <TableCell>מס' הזמנה</TableCell>
                            <TableCell>סטטוס</TableCell>
                            <TableCell>תאריך</TableCell>
                            <TableCell>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{OrderStatusMap[order.status]}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <ButtonGroup className='button'>
                                        <Link to={`/order/${order.id}`}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: "100%",
                                                    mt: 2,
                                                    backgroundColor: "rgb(0,128,128)",
                                                    border: "2px solid transparent",
                                                    "&:hover": {
                                                        backgroundColor: "rgb(0,128,128)",
                                                    },
                                                    height: "40px",
                                                    minWidth: "60px"
                                                }}
                                            >
                                                צפיה
                                            </Button>
                                        </Link>
                                        {kind === 'admin' && (
                                        <Button
                                            onClick={() => handleUpdateStatus(order.id)}
                                            variant="contained"
                                            sx={{
                                                width: "100%",
                                                mt: 2,
                                                backgroundColor: "rgb(0,128,128)",
                                                border: "2px solid transparent",
                                                "&:hover": {
                                                    backgroundColor: "rgb(0,132,130)",
                                                    border: "2px solid rgb(0,128,128)"
                                                },
                                                height: "40px",
                                                minWidth: "60px",
                                            }}
                                        >
                                            עדכון סטטוס
                                        </Button>)}
                                        <Button
                                            onClick={() => { deleteClick(order) }

                                            }
                                            variant="contained"
                                            sx={{
                                                width: "100%",
                                                mt: 2,
                                                backgroundColor: "#CB1021",
                                                border: "2px solid transparent",
                                                "&:hover": {
                                                    backgroundColor: "#CB1021",
                                                },
                                                height: "40px",
                                                minWidth: "60px",
                                            }}
                                        >
                                            ביטול הזמנה
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default Orders;


