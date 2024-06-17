import React from 'react';
import './App.css';
import SmallShoppingBag from './smallBag/SmallShoppingBag';
import PaymentPage from './wizard/PaymentPage';
import ProductsPage from './wizard/ProductsPage';
import CartPage from './wizard/CartPage';

function App() {
  return (
    <><SmallShoppingBag />
    <PaymentPage />
    <ProductsPage />
    <CartPage /></>
  );
}

export default App;
