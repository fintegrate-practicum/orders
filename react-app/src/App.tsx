import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';


function App() {

  return (
    <div>
      <BaseWizard />
    </div>
  );
}

export default App;
