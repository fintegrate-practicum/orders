







import React from 'react';
import './App.css';

import { Button } from '@mui/material';
// import BaseWizard from './Stepper/BaseWizard';
import Orders from './orders/Orders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleOrder from './orders/singleOrder/SingleOrder';

import SmallShoppingBag from './smallBag/SmallShoppingBag';
import ShoppingDetails from './ShoppingDetails';
function App() {
  return (
    <>
      <div>
     

        <Router>
          <Routes>
            <Route path="/" element={<Orders kind={'admin'} />} /> {/* Default route */}
            <Route path="/order/:id" element={<SingleOrder />} /> {/* Dynamic route */}
          </Routes>
        </Router>
      </div>
 
      <SmallShoppingBag />
      <ShoppingDetails/>

      
    </>
  );
}

export default App;
