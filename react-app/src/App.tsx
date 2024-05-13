import React from 'react';
import { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import AccountMenu from "./Menu";
function App() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div>
     {AccountMenu()} 
      {showWizard && (<BaseWizard />)}

      <Button
          variant='contained'
          size='large'
          onClick={() => setShowWizard(!showWizard)}>
          {showWizard ? 'hide wizard' : 'show wizard'}
        </Button>
    </div>
  );
}

export default App;
