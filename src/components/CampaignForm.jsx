import { Done } from '@mui/icons-material';
import { Fab, FormControl, Grid, InputLabel, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
// import DateAdapter from '@mui/';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
// import required react-datepicker styling file
import "react-datepicker/dist/react-datepicker.css";

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

const CampaignForm = ({campaign}) => {
    const [campaignName, setCampaignName] = useState("");
    const [description,setDescription] = useState("");
    const [initialDate, setInitialDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    useEffect(() => {
        if(campaign != null){
            setCampaignName(campaign.name)
            setDescription(campaign.description)
            setInitialDate(campaign.initialDate)
            setEndDate(campaign.endDate)
        }
    }, [])

    return (
        <div>
            <form autoComplete="off" >
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
