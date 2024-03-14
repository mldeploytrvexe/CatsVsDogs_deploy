import React from 'react'
import { AppBar, Tabs, Tab, Toolbar} from '@material-ui/core';
import StoreIcon from '@mui/icons-material/Store';


const Header = () => {
    return (
        <React.Fragment>
            <AppBar sx={{background: "#063970"}}>
                <Toolbar>
                    <StoreIcon />
                    <Tabs textColor="inherit">
                        <a href='test'><Tab label="Product"/></a>
                        <Tab label="Services"/>
                        <Tab label="Contact us"/>
                        <a href='aboutme'><Tab label="About us"/></a>
                    </Tabs>
                </Toolbar>
                
            </AppBar>
        </React.Fragment>
    );
};

export default Header