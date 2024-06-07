import { useState } from 'react';
import BaseWizard from './BaseWizard';
import { Button } from '@mui/material';

const HorizontalStepper = () => {

    const [showWizard, setShowWizard] = useState(false)
    return (
        <>
            {showWizard && (<BaseWizard />)}
            <Button
                variant='contained'
                size='large'
                onClick={() => setShowWizard(!showWizard)}>
                {showWizard ? 'hide wizard' : 'show wizard'}
            </Button>
        </>
    )
}
export default HorizontalStepper