import { Add, Delete, Edit, Title } from '@mui/icons-material'
import {IconButton, Fab } from '@mui/material'
import React, { useContext } from 'react'
import { CampaignContext } from '../contexts/CampaignContext'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

/** Estilo para que el FAB se vea abajo a la derecha */
const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

/** Campos de las columnas */
const columns = [
    // {field: "id",headerName: "ID", width: 130},
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
            <Fab color="primary" aria-label="add" style={style}>
                <Add />
            </Fab>
        </div>
    )
}

export default Campaigns
