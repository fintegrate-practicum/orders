// src/orders/singleOrder/SingleOrder.tsx
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './singleOrder.css';






interface User {
    name: string;
    id: number;
}

interface Address {
    city: string;
    street: string;
    numBulding: number;
}

interface Order {
    numOrder: number;
    user: User;
    prod: string[];
    status: boolean;
    address: Address;
    date: Date;
}

// Dummy data for demonstration
const ordersData: Order[] = [
    {
        numOrder: 1,
        user: { name: 'John Doe', id: 123 },
        prod: ['Product1', 'Product2'],
        status: true,
        address: { city: 'New York', street: '5th Avenue', numBulding: 10 },
        date: new Date(),
    },
    // Add more orders as needed
];

const SingleOrder: React.FC = () => {



    
    const { id } = useParams<{ id: string }>();
    const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const orderData = ordersData.find(order => order.numOrder === parseInt(id || '', 10));
        if (orderData) {
            setUpdatedOrder(orderData);
        }
    }, [id]);

    const handleInputChange = (field: keyof Order, value: any) => {
        setUpdatedOrder(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                [field]: value
            };
        });

    };

    const [value, setValue] = useState<string>(''); // Specify the type for value

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => { // Specify the type for event
      setValue(event.target.value as string); // Type assertion to string
    };
    return (
        <div>
            <TextField
                label="User ID"
                value={updatedOrder?.user.id ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('user', { ...updatedOrder?.user, id: parseInt(e.target.value, 10) })}
                fullWidth
                margin="normal"
            />
            <TextField label="ffff"
            />
            <TextField
                label="Products"
                value={updatedOrder?.prod.join(', ') ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('prod', e.target.value.split(', '))}
                fullWidth
                margin="normal"
            />
            <TextField
                label="City"
                value={updatedOrder?.address.city ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', { ...updatedOrder?.address, city: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Street"
                value={updatedOrder?.address.street ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', { ...updatedOrder?.address, street: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Building Number"
                value={updatedOrder?.address.numBulding ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', { ...updatedOrder?.address, numBulding: parseInt(e.target.value, 10) })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date"
                value={updatedOrder?.date.toLocaleDateString() ?? ''}
                fullWidth
                margin="normal"
                disabled
            />

{/* <InputLabel id="simple-select-label">Choose an option</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
       // onChange={handleChange}
       onChange={handleChange}
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select> */}


            
        </div>
    );
};

export default SingleOrder;

