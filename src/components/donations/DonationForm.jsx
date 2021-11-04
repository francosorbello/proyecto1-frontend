import { Autocomplete, Divider, Fab, FormControl, Grid, IconButton, InputLabel, List, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { CampaignContext } from '../../contexts/CampaignContext'
import { DonationContext } from '../../contexts/DonationContext'
import DonatedElementForm from './DonatedElementForm'
import { Add, Done } from '@mui/icons-material'
import update from 'immutability-helper';

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

/**
 * Formulario para añadir/editar una donacion
 */
const DonationForm = () => {
    const {donations,setDonations,donationStatus} = useContext(DonationContext)
    const {campaigns} = useContext(CampaignContext)
    const [address,setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [donationElements,setDonationElements] = useState([])
    const [campaign,setCampaign] = useState()
    
    /**
     * crea un elemento donado para añadir / editar
     */
    const addDonationElement = () => {
        const nElement = {
            "description":"",
            "tags":[],
            "count": 0,
        }
        setDonationElements([...donationElements,nElement])
    }

    /**
     * Recibe los datos de un nuevo elemento donado (o de uno editado) y los añade al state
     * @param {*} elem el nuevo elemento donado
     */
    const handleSave = (elem,index) => {
        const updatedDonatedElements = update(donationElements,{$splice: [[index,1,elem]]})
        setDonationElements(updatedDonatedElements)
    }

    /**
     * Borra un elemento donado del state
     * @param {*} id index del elemento a borrar
     */
    const handleDelete = (id) => {
        setDonationElements(donationElements.filter((elem,index)=>index !== id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //POST DE LA DONACION
        const nDonation = {
            "storageAddress":address,
            "campaignId": campaign.id,
            "status": status
        }
        const res = await fetch("http://127.0.0.1:8000/api/donation-api/",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nDonation)
        })
        const donationResp = await res.json()
        const test = donationElements.forEach((elem) => elem["donation"] = donationResp["id"])
        console.log("test",test)
        //POST DE LOS ELEMENTOS DONADOS
        console.log("donated elems",donationElements)
        const res2 = await fetch("http://127.0.0.1:8000/api/donatedElement-api/",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',  
            },
            body: JSON.stringify(donationElements)
        })
        console.log(await res2.json())
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
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
                            onChange={(e,option)=>setCampaign(option)}
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
                </Grid>
                {/* Seccion de elementos donados */}
                <Divider sx={{padding: 1}}/>
                <Typography sx={{color:"#1976D2", fontSize: 20, paddingTop: 1}}>Elementos donados</Typography>
                <Stack spacing = {3}>
                    {
                        donationElements.map((elem,index)=><DonatedElementForm 
                                                                data={elem} 
                                                                onSave={(e)=>handleSave(e,index)} 
                                                                onDelete={()=>handleDelete(index)} 
                                                                autoSave={true}
                                                            />)
                    }
                    <IconButton onClick={()=>addDonationElement()}>
                        <Add />
                    </IconButton>
                </Stack>
                <Fab color="primary" aria-label="add" style={fabStyle} type="submit">
                    <Done></Done>
                </Fab> 

            </form>        
        </div>
    )
}

export default DonationForm
