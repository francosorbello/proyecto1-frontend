import { FormControl, Grid, InputLabel, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
// import DateAdapter from '@mui/';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CampaignForm = () => {
    const [open,setOpen] = useState(true);
    
    const [campaignName, setCampaignName] = useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div>
            {/* <Modal
                open={open}
                onClose={handleClose}
            > */}
                <Box >
                    <Typography>
                        Añadir / Editar campaña
                    </Typography>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    label="Nombre"
                                    fullWidth={true}
                                    onChange={(e)=>setCampaignName(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    label="Descripción"
                                    multiline
                                    minRows={5}
                                    fullWidth={true}
                                    onChange={(e)=>setCampaignName(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                            {/* <Grid item sm={12} md={12} lg={12}>
                                <ReactDatePicker>
                                    
                                </ReactDatePicker>
                            </Grid> */}
                        </Grid>
                    </form>
                    
                </Box>

            {/* </Modal> */}
        </div>
    )
}

export default CampaignForm
