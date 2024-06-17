import React from 'react';
import { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import ConfirmeOrder from './ConfirmeOrder';
function App() {
  const [showWizard, setShowWizard] = useState(false)
  const newOrder = { _id: '123456' }; //מתוך קומפוננטת תשלום   מקבלים את הזמנה 
  //                                ןשם  שולחים את את פרטי ההזמנה הנחוצים בלבד


  return (
    <div>
      {/* זה אמור להיות כתוב מתוך קומפננטת תשלום-לא כאן */}
      <ConfirmeOrder newOrder={newOrder} />

      {showWizard && (<BaseWizard />)}

      <Button
        variant='contained'
        size='large'
        onClick={() => setShowWizard(!showWizard)}>
        {showWizard ? 'hide wizard' : 'show wizard'}
      </Button>
    </div>

import './App.css';
import SmallShoppingBag from './smallBag/SmallShoppingBag';

function App() {
  return (
    <SmallShoppingBag />

  );
}

export default App;
