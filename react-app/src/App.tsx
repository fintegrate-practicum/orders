
import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
// import ProductDeatails from './ProductDeatails';
import Product from './Product';
import RecipeReviewCard from './Card'
import { StringDecoder } from 'string_decoder';



function App() {
  const [showWizard, setShowWizard] = useState(false)
  interface productProps{
    prod:{
        name: string,
        price: number,
        img: string,
        describe: string,
        imgArr:string[]
}}



  return (
    <div>
      {showWizard && (<BaseWizard />)}

      <Button
          variant='contained'
          size='large'
          onClick={() => setShowWizard(!showWizard)}>
          {showWizard ? 'hide wizard' : 'show wizard'}
        </Button>
        <Product/>
    </div>
  );
}

export default App;

