import React from 'react';
import './App.css';
import SmallShoppingBag from './smallBag/SmallShoppingBag';
import ConfirmeOrder from './ConfirmeOrder';

function App() {
  const newOrder = { _id: '123456' }; //מתוך קומפוננטת תשלום   מקבלים את הזמנה 
  //                                ןשם  שולחים את את פרטי ההזמנה הנחוצים בלבד

  return (
    <>
    {/* זה אמור להיות כתוב מתוך קומפננטת תשלום-לא כאן */}
    <ConfirmeOrder newOrder={newOrder} />
    <SmallShoppingBag />
    </>
  );
}

export default App;
