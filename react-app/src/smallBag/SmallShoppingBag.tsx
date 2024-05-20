// // // import React from 'react'
// // // import "./smallShoppingBag.css"
// // // const SmallShoppingBag = () => {
// // //   const shoppingBag=[{_id:1,product:"milk",amount:2,price:10}]
// // //   return (
// // //     <div className='shopping-bag-container'>
// // //     <h2>סל קניות</h2>
// // //     <div className='shopping-bag'>
// // //     <ul>
// // //       {shoppingBag.map((item) => (
// // //         <li key={item._id}>
// // //           <div className='aa'>
// // //            {item.product} 
// // //           amount: {item.amount} 
// // //           price: {item.price} ₪
// // //           </div>
// // //         </li>
// // //       ))}
// // //     </ul>
// // //     </div>
// // //   </div>

// // //   )
// // // }

// // // export default SmallShoppingBag


// // import React, { useState } from 'react';
// // import "./smallShoppingBag.css";

// // const SmallShoppingBag = () => {
// //   const [showText, setShowText] = useState(false);
// //   const shoppingBag = [{_id:1,product:"milk",amount:2,price:10}];

// //   const handleAddToBag = () => {
// //     setShowText(true);
// //     setTimeout(() => {
// //       setShowText(false);
// //     }, 10000); // Hide text after 10 seconds
// //     // Add your logic to add the product to the shopping bag here
// //   };

// //   return (
// //     <div className='shopping-bag-container'>
// //       <h2>סל קניות</h2>
// //       <div className='shopping-bag'>
// //         <button onClick={handleAddToBag}>Add to Bag</button>
// //         <ul>
// //           {shoppingBag.map((item) => (
// //             <li key={item._id}>
// //               <div className='aa'>
// //                 {item.product} 
// //                 amount: {item.amount} 
// //                 price: {item.price} ₪
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //         {showText && <div>The product has been added to your shopping bag!</div>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default SmallShoppingBag;

// import React from 'react';
// import "./smallShoppingBag.css"
// import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// // const data = [
// //   { name: 'John Doe', age: 30, city: 'New York' },
// //   { name: 'Jane Doe', age: 25, city: 'Los Angeles' },
// //   { name: 'Peter Jones', age: 40, city: 'Chicago' },
// // ];

// const bag = [
//   {
//     id:1,
//         image:'/dress.jpg',

//       name: 'casual dress',
//       model: 'blue flowers',
//       description: 'bla bla...',
//       price: 125.90,
//       size: 4,
//       amount: 1
//   },
//   {
//     id:2,
//     image:'/dress.jpg',

//       name: 'casual dress',
//       model: 'blue flowers',
//       description: 'bla bla...',
//       price: 125.90,
//       size: 6,
//       amount: 1
//   },
//   {
//     id:3,
//     image:'/dress.jpg',
//       name: 'snickers',
//       model: 'red',
//       description: 'bla bla...',
//       price: 89.90,
//       size: 28,
//       amount: 1
//   }
// ]

// const MyTable = () => {
//   return (
//     <div className='shopping-bag-container'>
//       <Typography>סל קניות</Typography>
//     <Table>

//       <TableHead>
//         <TableRow>
//           <TableCell>פריטים</TableCell>
//           <TableCell>דגם</TableCell>
//           <TableCell>כמות</TableCell>
//           <TableCell>מחיר</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {bag.map((item) => (
//           // <TableRow key={item.id}>
//           <TableRow>
//                         <TableCell>{item.name}<img src={item.image} width="50px"/></TableCell>
//             <TableCell>{item.model}</TableCell>

//             <TableCell>{item.amount}</TableCell>
//             <TableCell>{item.price}</TableCell>


//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     </div>

//   );
// };

// export default MyTable;




import React, { useState, useEffect } from 'react';
import "./smallShoppingBag.css";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const bag = [

  {
    id: 1,
    image: '/dress.jpg',

    name: 'casual dress',
    model: 'blue flowers',
    description: 'bla bla...',
    price: 125.90,
    size: 4,
    amount: 1
  },
  {
    id: 2,
    image: '/dress.jpg',

    name: 'casual dress',
    model: 'blue flowers',
    description: 'bla bla...',
    price: 125.90,
    size: 6,
    amount: 1
  },
  {
    id: 3,
    image: '/dress.jpg',
    name: 'snickers',
    model: 'red',
    description: 'bla bla...',
    price: 89.90,
    size: 28,
    amount: 1
  },
  {
    id: 4,
    image: '/dress.jpg',
    name: 'snickers',
    model: 'red',
    description: 'bla bla...',
    price: 89.90,
    size: 28,
    amount: 1
  }


];

const MyTable = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='shopping-bag-container'>
      {isVisible && (
        <>
          <Typography className='shopping-bag-title'>סל קניות</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>פריטים</TableCell>
                <TableCell>דגם</TableCell>
                <TableCell>כמות</TableCell>
                <TableCell>מחיר</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bag.map((item) => (
                <TableRow key={item.id}>

                  <div className='product-name'>
                    <TableCell>
                      <div className="image-text-container">
                        <img src={item.image} width="50px" className="product-image" />
                        <span className="product-text">{item.name}</span>
                      </div>
                    </TableCell>
                  </div>

                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.price} ₪</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default MyTable;

