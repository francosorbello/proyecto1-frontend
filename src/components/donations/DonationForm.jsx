import { Autocomplete, Grid, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { CampaignContext } from '../../contexts/CampaignContext'
import { DonationContext } from '../../contexts/DonationContext'

const DonationForm = () => {
    const {donations,setDonations} = useContext(DonationContext)
    const {campaigns} = useContext(CampaignContext)
    
    return (
        <div>
            <form autoComplete="off">
                <Grid container spacing={3} sx={{marginTop: 1}}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Autocomplete
                            id="select-campaign"
                            options={campaigns}
                            getOptionLabel={(option)=>option.name}
                            renderInput={(params)=> <TextField {...params} label="Campaña" />}
                            onChange={(e,option)=>console.log(option)}
                        >
                        </Autocomplete>
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
