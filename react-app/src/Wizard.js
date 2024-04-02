import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'

const Wizard = () => {
    return <div className='wizard'>
        <AppBar>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <IconButton onClick={() => alert('menu button')}> <MenuIcon /> </IconButton>
                <Typography> Orders </Typography>
                <Button variant='outlined' style={{ color: 'white', border: 'white 1px solid', textTransform: 'none' }} onClick={() => alert("You clicked at log out")} endIcon={<LogoutIcon />}> Log Out </Button>
            </Toolbar>
        </AppBar>
        <Typography variant='h2' color={'blue '}>
            NEW ORDER
        </Typography>
        <Typography variant='subtitle1'>
            Enter your details
        </Typography>
        <br />
        <TextField type='date' label='date' variant='filled' helperText='enter date' />
        <br />
        <TextField type='email' label='email' variant='filled' helperText='enter email' />
        <br />
        <TextField type='number' label='number' variant='filled' helperText='enter number of boxes' />
        <br />
        <TextField type='text' label='notes' variant='filled' helperText='enter notes for us' />
        <br />
        <Button onClick={() => alert('send button was clicked')} variant='contained' endIcon={<SendIcon />} style={{textTransform:'none'}} > Send </Button>
        <br/>
        <br/>
    </div>



}

export default Wizard