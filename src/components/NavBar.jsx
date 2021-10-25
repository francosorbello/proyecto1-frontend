import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { Component } from 'react'
import {Menu} from '@mui/icons-material'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


export class NavBar extends Component {
    render() {
        return (
            <div style={{flexGrow:1}}>
                <AppBar position="static" open={true}>
                    <Toolbar>
                        <IconButton edge="start" style={{marginRight: '16px'}}>
                            <Menu style={{color:"white"}} ></Menu>
                        </IconButton>
                        <Typography sx={{flexGrow: 1}} variant="h6">
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar
