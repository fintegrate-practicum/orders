import React from 'react';
import { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import ConfirmeOrder from './ConfirmeOrder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentComponent from './Main_Menu/Menu';
import Women_Page from './Main_Menu/Women_Page';
import Men_Page from './Main_Menu/Men_Page';
import Boys_Page from './Main_Menu/Boys_Page';
import Girls_Page from './Main_Menu/Girls_Page';
import Others_Page from './Main_Menu/Others_Page';

function App() {
  const [showWizard, setShowWizard] = useState(false)
  const newOrder = { _id: '123456' }; //מתוך קומפוננטת תשלום   מקבלים את הזמנה 
  //                                ןשם  שולחים את את פרטי ההזמנה הנחוצים בלבד


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/Women_Page" element={<Women_Page />} />
          <Route path="/Men_Page" element={<Men_Page />} />
          <Route path="/Boys_Page" element={<Boys_Page />} />
          <Route path="/Girls_Page" element={<Girls_Page />} />
          <Route path="/Others_Page" element={<Others_Page />} />
        </Routes>
      </Router>
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



  )
}
export default App

