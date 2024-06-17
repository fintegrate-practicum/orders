





import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./orders.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import {AppBar,Toolbar,IconButton,Typography,Stack,Button} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update"
import SettingsIcon from "@mui/icons-material/Settings"
//import Link from "@mui/material"
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup'
// import Button from '@mui/material/Button
const Orders = () => {
    const allOrders = [
        {
            numOrder: 123, 
            user: { name: "moshe", id: 123 }, 
            prod: ["עט", "pencil"], 
            status: false, 
            address: { city: "beney brak", street: "akive", numBulding: 10 },
            date: new Date()
        },
        {
            numOrder: 124, 
            user: { name: "moshe", id: 124 }, 
            prod: ["pen", "pencil"], 
            status: false, 
            address: { city: "beney brak", street: "akive", numBulding: 10 },
            date: new Date()
        },
        {
            numOrder: 125, 
            user: { name: "moshe", id: 125 }, 
            prod: ["pen", "pencil"], 
            status: false, 
            address: { city: "beney brak", street: "akive", numBulding: 10 },
            date: new Date()
        }
    ];

    return (
        <div className='order-list'>
            <TableContainer component={Paper} className='orders-container'>
                <Table>
                    <TableHead>
                        <TableRow className='order-details'>
                            <TableCell>מס' הזמנה</TableCell>
                            <TableCell>שם</TableCell>
                            <TableCell>מספר זהות</TableCell>
                            <TableCell>מוצרים</TableCell>
                            <TableCell>סטטוס</TableCell>
                            <TableCell className="address-header">כתובת</TableCell>

                            <TableCell>תאריך</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders.map((order) => (
                            <TableRow key={order.numOrder}>
                                <TableCell>{order.numOrder}</TableCell>
                                <TableCell>{order.user.name}</TableCell>
                                <TableCell>{order.user.id}</TableCell>
                                <TableCell className='product-name'>
                                    <ul>
                                        {order.prod.map((product, index) => (
                                            <li key={index}>{product}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>{order.status ? "Completed" : "Pending"}</TableCell>
                         
                                <TableCell className="address-cell">
    {order.address.city}, {order.address.street}, Building {order.address.numBulding}
</TableCell>

                                <TableCell>{order.date.toLocaleDateString()}</TableCell>
                                <TableCell>
                             
                                <ButtonGroup className='button'>
       

                                <Link to="/order/${order.numOrder}">

          <Button
  type="submit"
  variant="contained"
  sx={{
    width: "100%",
    mt: 2,

    
backgroundColor:"rgb(0,128,128)",
    border: "2px solid transparent", // Add transparent border by default
    "&:hover": {
      backgroundColor: "white",
      color: "rgb(0,128,128)",
    //   border: "2px solid #CB1021", // Change border color on hover
      border: "2px solid rgb(0,128,128)"
    },
    height: "40px",
    
  }}
  
>
  צפיה
</Button>
</Link>

<Button
  type="submit"
  variant="contained"
  sx={{
    width: "100%",
    mt: 2,
    backgroundColor: "#CB1021",
     border: "2px solid transparent", // Add transparent border by default
    "&:hover": {
      backgroundColor: "white",
      color: "#CB1021",
      border: "2px solid #CB1021", // Change border color on hover
    },
    height: "40px",
   // padding: "5px 10px",
    minWidth:"60px",
  }}



  
>
  מחיקה    
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




