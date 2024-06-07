import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react';
const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
const stepDescription = ['step 1 description', 'step 2 description', 'step 3 description', 'step 4 description']

const BaseWizard = () => {

    const [activeStep, setActiveStep] = useState(0)
    const handleNext = () => {
        setActiveStep(activeStep + 1);

    }
    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    return <div id="wizard">
        <Stepper activeStep={activeStep} style={{margin : '15px'}}>
            {steps.map((step) =>
            (<Step key={step}>
                <StepLabel> {step} </StepLabel>
            </Step>))}
        </Stepper>
        <Typography style={{margin:'15px'}}> {stepDescription[activeStep]} </Typography>
        <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant='contained'
            style={{ textTransform: 'none', margin: '10px'}} > Back
        </Button>
        <Button
            onClick={handleNext}
            variant='contained'
            style={{ textTransform: 'none' }}> {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
    </div >
}

export default BaseWizard