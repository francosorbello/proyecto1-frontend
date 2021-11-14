import { Done } from '@mui/icons-material';
import { Fab, FormControl, Grid, InputLabel, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import update from 'immutability-helper';

import React, { useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
// import required react-datepicker styling file
import "react-datepicker/dist/react-datepicker.css";
import { CampaignContext } from '../../contexts/CampaignContext';

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


const style = {
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
 * Formulario para añadir y editar campañas
 * @param {*} campaign campaña que se quiere editar 
 * @param {*} onSubmit evento que se ejecuta al enviar los datos al backend
 */
const CampaignForm = ({campaign, onSubmit}) => {
    /** states del componente */
    const [campaignName, setCampaignName] = useState("");
    const [description,setDescription] = useState("");
    const [initialDate, setInitialDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const {campaigns,setCampaigns} = useContext(CampaignContext);

    /**
     * Formatea una fecha para que sea almacenada correctamente por la base de datos
     * @param {*} date la fecha a formatear
     * @returns la fecha en formato YYYY-mm-dd
     */
    const formatDate = (date) => {
        const year = date.getFullYear();

        var month = date.getUTCMonth() + 1;
        month = month < 10 ? "0"+month : month;

        var day = date.getDate();
        day = day < 10 ? "0"+day : day;

        return year + "-" + month + "-" + day
    }

    /**
     * Añade una campaña a la base de datos y actualiza
     * el context global
     */
    const createCampaign = async () => {
        //TODO: verificar que los campos esten completados
        console.log("creating campaign")
        const nCampaign = {
            "name": campaignName,
            "description": description,
            "initialDate": formatDate(initialDate),
            "endDate": formatDate(endDate)
        }
        const res = await fetch("http://127.0.0.1:8000/api/campaign-api/",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nCampaign)
        })
        if(res.status == "200") {
            const resJ = await res.json();
            const campaignFormat = {
                "id": resJ["id"],
                "name": nCampaign.name,
                "description": nCampaign.description,
                "initialDate": nCampaign.initialDate,
                "endDate": nCampaign.endDate,
            }
            //actualizo el context global
            onSubmit(campaignFormat)
            setCampaigns([...campaigns,campaignFormat])

        } else {
            alert("Hubo un problema al conectarse con la base de datos.")
        }
    }

    /**
     * Actualiza los datos de una campaña y los almacena en el context global
     */
    const editCampaign = async() => {
        const nCampaign = {
            "name": campaignName,
            "description": description,
            "initialDate": formatDate(initialDate),
            "endDate": formatDate(endDate)
        }
        const res = await fetch(`http://127.0.0.1:8000/api/campaign-api/${campaign.id}/`,{
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nCampaign)
        })
        if(res.status=="200") {
            const indx = campaigns.findIndex((elem)=>elem.id == campaign.id);
            nCampaign["id"] = campaign.id;
            const updatedCampaigns = update(campaigns,{$splice: [[indx,1,nCampaign]]})
            setCampaigns(updatedCampaigns)
            onSubmit(nCampaign)
        } else {
            alert("Error en la base de datos")
            console.log(await res.json())
            // onSubmit(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(campaign == null) {
            createCampaign();
        }
        else {
            editCampaign();
        }
    }
    
    /**Si hay una campaña de entrada, setea los valores para que podamos editar */
    useEffect(() => {
        if(campaign !== null){
            console.log("editing campaign",campaign)
            setCampaignName(campaign.name)
            setDescription(campaign.description)
            setInitialDate(new Date(campaign.initialDate))
            setEndDate(new Date(campaign.endDate))
        }
    }, [])

    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={12} md={12} lg={12}>
                        <TextField
                            label="Nombre"
                            fullWidth={true}
                            onChange={(e) =>setCampaignName(e.target.value)}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            value={campaignName}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12}>
                        <TextField
                            label="Descripción"
                            multiline
                            minRows={5}
                            fullWidth={true}
                            onChange={(e)=>setDescription(e.target.value)}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            value={description}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6}>
                        <div>
                            <InputLabel id="intialDate-name-label">Fecha de inicio</InputLabel>
                            <ReactDatePicker selected={initialDate} onChange={(date)=>setInitialDate(date)} />
                        </div>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6}>
                        <div>
                            <InputLabel id="intialDate-name-label">Fecha de fin</InputLabel>
                            <ReactDatePicker selected={endDate} onChange={(date)=>setEndDate(date)} />
                        </div>
                    </Grid>
                </Grid>
                <Fab color="primary" aria-label="add" style={fabStyle} type="submit">
                    <Done></Done>
                </Fab>                    
            </form>
        </div>
    )
}

export default CampaignForm
