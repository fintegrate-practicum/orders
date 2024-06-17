import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import Orders from './orders/Orders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleOrder from './orders/singleOrder/SingleOrder';
function App() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div>
      {showWizard && (<BaseWizard />)}

      <Button
          variant='contained'
          size='large'
          onClick={() => setShowWizard(!showWizard)}>
          {showWizard ? 'hide wizard' : 'show wizard'}
        </Button>
      

        <Router>
      <Routes>
        <Route path="/" element={<Orders/>} /> {/* Default route */}
        <Route path="/order/:id" element={<SingleOrder />} /> {/* Dynamic route */}
      </Routes>
    </Router>
        


        </div>
     );
}

export default App;
