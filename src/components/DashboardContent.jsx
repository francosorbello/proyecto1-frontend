import { Container, CssBaseline, Paper, Typography } from '@mui/material'
import React from 'react'

/** Renderiza los children del componente dentro de un container con un titulo. 
 * @title Titulo del container
*/
function DashboardContent(props) {
    return (
        <div>
            <CssBaseline />
            <Container >
                <Paper elevation={0} sx={{padding: 2,width:"100%"}}>
                <Typography sx={{color:"#1976D2", fontSize: 20}}>{props.title}</Typography>
                <div>
                    {props.children}
                </div>
                </Paper>
            </Container>
        </div>
    )
}

export default DashboardContent
