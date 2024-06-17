import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import PaymentPage from '../wizard/PaymentPage';
import ProductsPage from '../wizard/ProductsPage';
import CartPage from '../wizard/CartPage';

const steps = ['Step 1 - Products', 'Step 2 - Cart', 'Step 3 - Payment'];
const stepDescription = ['Select products', 'Review your cart', 'Complete the payment'];

const BaseWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProductsPage />;
      case 1:
        return <CartPage />;
      case 2:
        return <PaymentPage />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create New Order
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create a New Order</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} style={{ margin: '15px' }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography style={{ margin: '15px' }}>{stepDescription[activeStep]}</Typography>
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="contained"
            style={{ textTransform: 'none', margin: '10px' }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            style={{ textTransform: 'none' }}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BaseWizard;