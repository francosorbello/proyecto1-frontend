import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { CampaignContext } from '../../contexts/CampaignContext'
import { DonationContext } from '../../contexts/DonationContext'
import DonatedElementForm from './DonatedElementForm'

const DonationForm = () => {
    const {donations,setDonations,donationStatus} = useContext(DonationContext)
    const {campaigns} = useContext(CampaignContext)
    const [address,setAddress] = useState("")
    const [status, setStatus] = useState("")
    
    return (
        <div>
            <form autoComplete="off">
                <Grid container spacing={3} sx={{marginTop: 1}}>
                    <Grid item sm={12} md={12} lg={12}>
                        <TextField
                            label="Dirección"
                            fullWidth
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={6} lg={6}>
                        <Autocomplete
                            autoHighlight
                            id="select-campaign"
                            options={campaigns}
                            getOptionLabel={(option)=>option.name}
                            renderInput={(params)=> <TextField {...params} label="Campaña" />}
                            onChange={(e,option)=>console.log(option)}
                        >
                        </Autocomplete>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status-name-label">Status</InputLabel>
                            <Select
                                fullWidth = {true}
                                labelId="status-name-label"
                                label="Status"
                                id="status-name-select"
                                onChange={(e)=>setStatus(e.target.value)}
                                value={status}
                            >
                                {
                                    donationStatus.map(
                                        ({0: id,1: name}) => <MenuItem key={id} value={id}>{name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                    <DonatedElementForm></DonatedElementForm>
                    </Grid>
                </Grid>
            </form>        
        </div>
    )
}
const options = [
  { name: 'The Godfather', id: 1 },
  { name: 'Pulp Fiction', id: 2 },
];
export default DonationForm
