
import React from 'react'
import "./orders.css"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Orders = () => {
    const allOrders = [
        {
        numOrder: 123, user: { name: "moshe", id: 123 }, prod: ["pen", "pencial"], status: false, address: { city: "beney brak", street: "akive", numBulding: 10 },
        date: new Date()
    },
    {
        numOrder: 123, user: { name: "moshe", id: 123 }, prod: ["pen", "pencial"], status: false, address: { city: "beney brak", street: "akive", numBulding: 10 },
        date: new Date()
    },
    {
        numOrder: 123, user: { name: "moshe", id: 123 }, prod: ["pen", "pencial"], status: false, address: { city: "beney brak", street: "akive", numBulding: 10 },
        date: new Date()
    }
];




    
  return (
    <div>Order list




{/* const OrdersTable = ({ orders }) => {
    return ( */}
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>מס' הזמנה</TableCell>
                        <TableCell>שם</TableCell>
                        <TableCell>מספר זהות</TableCell>
                        <TableCell>מןצרים</TableCell>
                        <TableCell>סטטוס</TableCell>
                        <TableCell>כתובת</TableCell>
                        {/* <TableCell>כתובת</TableCell>
                        <TableCell>מס' בניין</TableCell> */}
                        <TableCell>תאריך</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders.map((order) => (
                        <TableRow key={order.numOrder}>
                            <TableCell>{order.numOrder}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.user.id}</TableCell>
                            <TableCell>
                            <ol>
                                    {order.prod.map((product, index) => (
                                        <li key={index}>{product}</li>
                                    ))}
                                </ol>
                            </TableCell>
                            <TableCell>{order.status ? "Completed" : "Pending"}</TableCell>
                            {/* <TableCell>{order.address.city}</TableCell>
                            <TableCell>{order.address.street}</TableCell>
                            <TableCell>{order.address.numBulding}</TableCell> */}
                             <TableCell>
                                {order.address.city}, {order.address.street}, Building {order.address.numBulding}
                            </TableCell>
                            <TableCell>{order.date.toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>




    </div>
  )
}

export default Orders











// eact, { useState, useEffect } from 'react';
// import "./smallShoppingBag.css";
// import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// const bag = [

//   {
//     id: 1,
//     image: '/dress.jpg',

//     name: 'casual dress',
//     model: 'blue flowers',
//     description: 'bla bla...',
//     price: 125.90,
//     size: 4,
//     amount: 1
//   },
//   {
//     id: 2,
//     image: '/dress.jpg',

//     name: 'casual dress',
//     model: 'blue flowers',
//     description: 'bla bla...',
//     price: 125.90,
//     size: 6,
//     amount: 1
//   },
//   {
//     id: 3,
//     image: '/dress.jpg',
//     name: 'snickers',
//     model: 'red',
//     description: 'bla bla...',
//     price: 89.90,
//     size: 28,
//     amount: 1
//   },
//   {
//     id: 4,
//     image: '/dress.jpg',
//     name: 'snickers',
//     model: 'red',
//     description: 'bla bla...',
//     price: 89.90,
//     size: 28,
//     amount: 1
//   }


// ];

// const MyTable = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setIsVisible(false);
//     }, 3000);

//     return () => clearTimeout(timeoutId);
//   }, []);

//   return (
//     <div className='shopping-bag-container'>
//       {isVisible && (
//         <>
//           <Typography className='shopping-bag-title'>סל קניות</Typography>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>פריטים</TableCell>
//                 <TableCell>דגם</TableCell>
//                 <TableCell>כמות</TableCell>
//                 <TableCell>מחיר</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {bag.map((item) => (
//                 <TableRow key={item.id}>

//                   <div className='product-name'>
//                     <TableCell>
//                       <div className="image-text-container">
//          import R               <img src={item.image} width="50px" className="product-image" />
//                         <span className="product-text">{item.name}</span>
//                       </div>
//                     </TableCell>
//                   </div>

//                   <TableCell>{item.model}</TableCell>
//                   <TableCell>{item.amount}</TableCell>
//                   <TableCell>{item.price} ₪</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyTable;

