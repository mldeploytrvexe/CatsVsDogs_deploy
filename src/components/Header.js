import React from 'react'
import { AppBar, Tabs, Tab, Toolbar} from '@material-ui/core';
import StoreIcon from '@mui/icons-material/Store';


const Header = () => {
    return (
        <React.Fragment>
            <AppBar sx={{background: "#386646"}}>
                <Toolbar>
                    <StoreIcon />
                    <Tabs textColor="inherit">
                        <a href='test'><Tab label="Загрузить"/></a>
                        <Tab label="Сервис"/>
                        <a href='loadfeedback'><Tab label="Посмотреть отзывы"/></a>
                        <a href='feedback'><Tab label="оставить отзыв"/></a>
                    </Tabs>
                </Toolbar>
                
            </AppBar>
        </React.Fragment>
    );
};
export default Header