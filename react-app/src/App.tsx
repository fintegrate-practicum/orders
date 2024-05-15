import React from 'react';
import { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import AccountMenu from "./Main_Menu/Menu";
import  Links  from "./Main_Menu/Menu";
import  {Page_1} from "./Main_Menu/Page_1";
function App() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div>
       {/* {Page_1()}  */}
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
