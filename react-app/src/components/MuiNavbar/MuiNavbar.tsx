import {AppBar,Toolbar,IconButton,Typography,Stack,Button} from "@mui/material";

export default function MuiNavbar() {
    return(
       <AppBar position='static'>
         <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                {/* זה הלוגו של האתר,צריך לשנות ללוגו של הלקוח */}
                <img src="/my-logo.jpg" width={100}/>
            </IconButton>
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                orders

            </Typography>
            <Stack direction='row' spacing={2}>
                 <Button color='inherit'>קטגוריות</Button>
                 <Button color='inherit'>לתשלום</Button>
                 <Button color='inherit'>הצגת סל קניות</Button>
                 <Button color='inherit'>התחברות/הרשמה</Button>
            </Stack>
         </Toolbar>
       </AppBar>
    )
}