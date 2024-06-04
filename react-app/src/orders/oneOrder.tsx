import React from "react";
interface OrderProps {
    order: {
        numOrder: number;
        user: { name: string; id: number };
        prod: string[];
        status: boolean;
        address: { city: string; street: string; numOfBulding: number };
        date: Date;
    };
}

const OneOrder: React.FC<OrderProps> = ({ order }) => {
    console.log(order.numOrder);
    return (
        <div>
            <h1>{order.numOrder}</h1>
            <h2>name: </h2><br/>
            <h2>{order.user.name}</h2>
            <h2>{order.user.id}</h2>
            
            <h2>{order.prod}</h2>
            <h2>{order.status}</h2>
            <h2>address:</h2><br/>
            <h2>{order.address.city}</h2>
            <h2>{order.address.street}</h2>
            <h2>{order.address.numOfBulding}</h2>
            <h2>{order.date.getDate()}</h2>
           
        </div>
    );
}
export default OneOrder;