import { Add, Delete, Edit, Title } from '@mui/icons-material'
import {IconButton, Fab, Modal, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { CampaignContext } from '../contexts/CampaignContext'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import CampaignForm from './CampaignForm';

/** Estilo para que el FAB se vea abajo a la derecha */
const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/** Campos de las columnas */
const columns = [
    //el field de las columnas tiene que matchear con los nombres de los valores del server
    //ej: en el server, la fecha de fin se almacena en "endDate". 
    //El field de la columna que tenga las fechas de fin tambien debe ser "endDate"
    {field: "name",headerName: "Nombre", width: 300},
    {field: "description",headerName: "Descripcion", width: 130},
    {field: "initialDate",headerName: "Fecha Inicio", width: 130},
    {field: "endDate",headerName: "Fecha Fin", width: 130},
    {
        field: "edit", 
        headerName: "Editar",
        width:80,
        renderCell: (cellValues) => {
            return(
                <IconButton aria-label="Editar">
                    <Edit></Edit>
                </IconButton>
            )
        }
    },
    {
        field: "delete", 
        headerName: "Borrar",
        width:80,
        renderCell: (cellValues) => {
            return(
                <IconButton aria-label="Editar">
                    <Delete></Delete>
                </IconButton>
            )
        }
    }
]

/** 
 * Muestra una tabla con las campañas activas.
 * 
 * Permite editar,borrar y crear nuevas campañas.
*/
const Campaigns = () => {
    const {campaigns} = useContext(CampaignContext);
    
    const [open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <DataGrid
                autoHeight
                rows={campaigns}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                    Toolbar: GridToolbar,
                  }}
            >
            </DataGrid>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-wind-title"
            >
                <Box sx={modalBoxStyle}>
                    <Typography sx={{paddingBottom: 4}} id="modal-wind-title" variant="h6" component="h2">
                            Añadir / Editar campaña
                    </Typography>
                    <CampaignForm></CampaignForm>
                </Box>
            </Modal>
            <Fab color="primary" aria-label="add" style={style} onClick={()=>setOpen(true)}>
                <Add />
            </Fab>
        </div>
    )
}

export default Campaigns
