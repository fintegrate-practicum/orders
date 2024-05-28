import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import Orders from './orders/Orders';

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
        <Orders/>
    </div>
  );
}

export default App;
