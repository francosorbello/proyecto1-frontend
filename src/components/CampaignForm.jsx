import { Done } from '@mui/icons-material';
import { Fab, FormControl, Grid, InputLabel, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
// import DateAdapter from '@mui/';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import React, { useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
// import required react-datepicker styling file
import "react-datepicker/dist/react-datepicker.css";
import { CampaignContext } from '../contexts/CampaignContext';

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

const CampaignForm = ({campaign, onSubmit}) => {
    /** states del componente */
    const [campaignName, setCampaignName] = useState("");
    const [description,setDescription] = useState("");
    const [initialDate, setInitialDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const {campaigns,setCampaigns} = useContext(CampaignContext);

    const formatDate = (date) => {
        const year = date.getFullYear();

        var month = date.getUTCMonth() + 1;
        month = month < 10 ? "0"+month : month;

        var day = date.getDate();
        day = day < 10 ? "0"+day : day;

        return year + "-" + month + "-" + day
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(campaign == null) {
            //TODO: verificar que los campos esten completados
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
                    "initialDate": nCampaign.initalDate,
                    "endDate": nCampaign.endDate,
                }
                //actualizo el context global
                onSubmit(campaignFormat)
                setCampaigns([...campaigns,campaignFormat])

            } else {
                alert("Hubo un problema al conectarse con la base de datos.")
            }
        }
    }
    
    /**Si hay una campaña de entrada, setea los valores para que podamos editar */
    useEffect(() => {
        if(campaign != null){
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
                            onChange={(e)=>setCampaignName(e.target.value)}
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
