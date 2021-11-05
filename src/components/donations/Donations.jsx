import { Add, Delete, Edit, Title } from '@mui/icons-material'
import {IconButton, Fab, Modal, Typography } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import { DonationContext } from '../../contexts/DonationContext';
import { CampaignContext } from '../../contexts/CampaignContext';
import DonationForm from './DonationForm';

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



/** 
 * Muestra una tabla con las donaciones activas.
 * * @param {*} data donacion a editar
*/
const Donations = ({data}) => {
    const {donations, setDonations, donationStatus} = useContext(DonationContext);
    const {campaigns} = useContext(CampaignContext)
    
    const [open,setOpen] = useState(false);

    useEffect(() => {
        
    }, [])

    /**
     * Responde al click del boton de editar en una fila
     * @e Evento generado al clickear
     * @cellVal Valores de la columna y de la fila
     */
    const handleEdit = (e,cellVal) => {
        e.stopPropagation();
        setOpen(true)
    }

    /**
     * Elimina una donacion de la base de datos y actualiza el state global
     * @param {*} e evento generado al clickear
     * @param {*} cellVal fila a borrar
     * @returns 
     */
    const handleDelete = async (e,cellVal) => {
        e.stopPropagation();
        if(!window.confirm("Deseas borrar la donacion?")) {
            return;
        }
        const id = cellVal.row.id;
        const res = await fetch(`http://127.0.0.1:8000/api/donation-api/${id}/`,{
            method: "DELETE",
            headers: {
              'Content-type': 'application/json',
            },
        })
        
        if(res.status == "200") {
            setDonations(donations.filter((item) => item.id !== id))     
        } else {
            alert("Hubo un error al conectarse con la base de datos.")
            console.log(await res.json())
        }
    }
    /** Campos de las columnas */
    const columns = [
        //el field de las columnas tiene que matchear con los nombres de los valores del server
        //ej: en el server, la fecha de fin se almacena en "endDate". 
        //El field de la columna que tenga las fechas de fin tambien debe ser "endDate"
        {field: "storageAddress",headerName: "Dirección", width: 300},
        {
            field: "status",
            headerName: "Estado",
            width: 130,
            valueGetter: (params) => {
                //obtengo el id del status
                const statusId = params.row.status
                //obtengo el objeto status con ese id de los extraidos de la base de datos
                const fullStatus = donationStatus.filter((item)=>item[0] == statusId)
                //retorno el nombre de ese status
                return fullStatus.length > 0 ? fullStatus[0][1] : statusId;
            },
            sortComparator: (v1,v2) => v1.toString().localeCompare(v2.toString()),
        },
        {
            field: "campaignName",
            headerName: "Campaña", 
            width: 230,
            valueGetter: (params) => {
                const campaignId = params.row.campaignId_id
                const fullCampaign = campaigns.filter((item)=>item.id == campaignId)
                return fullCampaign.length > 0 ? fullCampaign[0].name : campaignId;
            },
            sortComparator: (v1,v2) => v1.toString().localeCompare(v2.toString()),
        },
        {
            field: "edit", 
            headerName: "Editar",
            width: 80,
            renderCell: (cellValues) => {
                return(
                    <IconButton aria-label="Editar" onClick={(e)=>handleEdit(e,cellValues)}>
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
                    <IconButton aria-label="Borrar" onClick={(e)=>handleDelete(e,cellValues)}>
                        <Delete></Delete>
                    </IconButton>
                )
            }
        }
    ]

    return (
        <div>
            {!open ? 
            <div>
                <DataGrid
                    autoHeight
                    rows={donations}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                >
                </DataGrid>
                <Fab color="primary" aria-label="add" style={style} onClick={()=>setOpen(true)}>
                    <Add />
                </Fab>
            </div>
            :
                <DonationForm onSubmit={()=>setOpen(false)}></DonationForm>
            }
        </div>
    )
}

export default Donations
