import { Title } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import { CampaignContext } from '../contexts/CampaignContext'
import { DataGrid } from '@mui/x-data-grid';
const columns = [
    // {field: "id",headerName: "ID", width: 130},
    {field: "name",headerName: "Nombre", width: 130},
    {field: "description",headerName: "Descripcion", width: 130},
    {field: "initialDate",headerName: "Fecha Inicio", width: 130},
    {field: "endDate",headerName: "Fecha Fin", width: 130},
]

const Campaigns = () => {
    const {campaigns} = useContext(CampaignContext);
    return (
        <div style={{display: "flex"}}>
            <DataGrid
                autoHeight
                rows={campaigns}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            >
            </DataGrid>
        </div>
        // <div>
        //     <TableContainer component={Paper}>
        //         <Table>
        //             <TableHead>
        //                 <TableRow>
        //                     <TableCell>Nombre</TableCell>
        //                     <TableCell>Descripcion</TableCell>
        //                     <TableCell>Fecha inicio</TableCell>
        //                     <TableCell>Fecha fin</TableCell>
        //                     {/* TODO: añadir botones de borrar/editar */}
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {campaigns.map((campaign)=> (
        //                     <TableRow>
        //                         <TableCell>{campaign.name}</TableCell>
        //                         <TableCell>{campaign.description}</TableCell>
        //                         <TableCell>{campaign.initialDate}</TableCell>
        //                         <TableCell>{campaign.endDate}</TableCell>
        //                     </TableRow>
        //                 ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </div>
    )
}

export default Campaigns
