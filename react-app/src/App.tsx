import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Wizard from './Wizard';
import { Button } from '@mui/material';


function App() {
  const [showWizard, setShowWizard] = useState(false)
  return (
    <div className="App">
      {showWizard && <Wizard />}
      <header className="App-header">
        <Button
          variant='contained'
          size='large'
          onClick={() => setShowWizard(!showWizard)}>
          {showWizard ? 'hide wizard' : 'show wizard'}
        </Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
