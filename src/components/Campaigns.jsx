import { Add, Delete, Edit, Title } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Fab } from '@mui/material'
import React, { useContext } from 'react'
import { CampaignContext } from '../contexts/CampaignContext'
import { DataGrid } from '@mui/x-data-grid';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const columns = [
    // {field: "id",headerName: "ID", width: 130},
    {field: "name",headerName: "Nombre", width: 130},
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
            >
            </DataGrid>
            <Fab color="primary" aria-label="add" style={style}>
                <Add />
            </Fab>
        </div>
    )
}

export default Campaigns
