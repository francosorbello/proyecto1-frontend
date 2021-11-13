import { Autocomplete, Divider, Fab, FormControl, Grid, IconButton, InputLabel, List, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CampaignContext } from '../../contexts/CampaignContext'
import { DonationContext } from '../../contexts/DonationContext'
import DonatedElementForm from './DonatedElementForm'
import { Add, Close, Done } from '@mui/icons-material'
import update from 'immutability-helper';
import { DonationElementContext } from '../../contexts/DonationElementContext'

const doneFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const cancelFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 90,
    left: 'auto',
    position: 'fixed',
    backgroundColor: "#f44336"
};
/**
 * Formulario para añadir/editar una donacion
 * @param {*} onSubmit evento que se ejecuta cuando se completa el formulario 
 * @param {*} data donacion a editar
 * @returns 
 */
const DonationForm = ({ data: donation, onSubmit }) => {
    const { donations, setDonations, donationStatus } = useContext(DonationContext)
    const { donationElements: donationElementsCtx, setDonationElements: setDonationElementsCtx } = useContext(DonationElementContext)
    const { campaigns } = useContext(CampaignContext)
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [donationElements, setDonationElements] = useState([])
    const [initialDonationElements, setInitialDonationElements] = useState([])
    const [campaign, setCampaign] = useState()

    useEffect(() => {
        if (donation !== null) {
            setAddress(donation.storageAddress)
            setStatus(donation.status)
            const camp = campaigns.find((elem) => elem.id === donation.campaignId_id)
            setCampaign(camp)
            setDonationElements(donation["donatedElements"])
        }
    }, [])

    /**
     * crea un elemento donado para añadir / editar
     */
    const addDonationElement = () => {
        const nElement = {
            "description": "",
            "tags": [],
            "count": 0,
        }
        setDonationElements([...donationElements, nElement])
    }

    /**
     * Recibe los datos de un nuevo elemento donado (o de uno editado) y los añade al state
     * @param {*} elem el nuevo elemento donado
     */
    const handleSave = (elem, index) => {
        const updatedDonatedElements = update(donationElements, { $splice: [[index, 1, elem]] })
        setDonationElements(updatedDonatedElements)
    }

    /**
     * Borra un elemento donado del state
     * @param {*} id index del elemento a borrar
     */
    const handleDelete = (id) => {
        setDonationElements(donationElements.filter((elem, index) => index !== id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (donation === null) {
            addDonation()
        } else {
            editDonation();
        }
    }
    const editDonation = async () => {
        //PUT DE LA DONACION
        const nDonation = {
            "storageAddress": address,
            "campaignId": campaign.id,
            "status": status
        }
        const res = await fetch(`http://127.0.0.1:8000/api/donation-api/${donation.id}/`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nDonation)
        })
        if (res.status === 200) {
            //actualizo la donacion en el context
            const donationIndex = donations.findIndex((elem)=>elem.id === donation.id)
            nDonation["id"] = donation.id
            const updatedDonations = update(donations,{$splice: [[donationIndex,1,nDonation]]})
            setDonations(updatedDonations)

            // PATCH ELEMENTOS DONADOS
            await patchDonatedElements(donationElements,nDonation["id"])
            onSubmit()
        }
    }

    const addDonation = async () => {
        console.log("adding donaion")
        //POST DE LA DONACION
        const nDonation = {
            "storageAddress": address,
            "campaignId": campaign.id,
            "status": status,
            "donatedElements": donationElements
        }
        const res = await fetch("http://127.0.0.1:8000/api/donation-api/", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nDonation)
        })
        if (res.status === 200) {
            //actualizo status global donaciones
            const donationResp = await res.json()
            nDonation["id"] = donationResp["id"]
            setDonations([...donations, nDonation])
            onSubmit()
        } else {
            alert("error al añadir una donacion")
            console.log(await res.json())
        }
    }

    const patchDonatedElements = async(elemList,donationId) => {
        console.log("before",initialDonationElements)
        const selectedElements = elemList.filter((elem) => elem.count > 0 && elem.description !== "")
        //comparar entre context y elemList y
        // 1. actualizar(+ hacer update de) los elementos que esten en ambas listas
        // 2. eliminar(+ hacer delete de) los que esten en el context y no en elemList
        // 3. añadir(+ hacer post de) los que esten en elemList y no en el context
        // contiene los elementos donados iniciales
        
        // initialDonationElements = [10,11]
        // // cambia a medida que añadimos o sacamos elementos donados
        // currentDonationElements = [10,12]

        // elemsToAdd = [12] //solo estan en currentDonationElements
        // elemsToEdit = [10] //estan en ambos arrays
        // elemsToDelete = [11] //solo estan en initialDonationElements

        // finalDonationElements = [10,12]

        if(selectedElements.length > 0) {
            //post nuevos elementos
            const elemsToUpdate = initialDonationElements.filter((iniDE)=>donationElements.findIndex((de)=>iniDE.id===de.id) > -1)
            const elemsToAdd = initialDonationElements.filter((iniDE)=>donationElements.findIndex((de)=>iniDE.id===de.id) === -1)
        }

        if(selectedElements.length > 0) {
            // elemsToUpdate = selectedElements.filter((elem)=>)
            var finalElements = donationElementsCtx
            selectedElements.forEach((donationElem)=>{
                //busco el donated element en el context global
                const ind = donationElementsCtx.findIndex((elem)=>elem.id === donationElem.id)
                if(ind > -1) {
                    // actualizar los elementos que esten en ambas listas
                    finalElements = update(finalElements,{$splice: [[ind,1,donationElem]]})
                } else {
                    // añadir los que esten en elemList y no en el context
                    // finalElements 
                }
            })
            console.log("after",finalElements)
        }

    }

    const addDonatedElements = async(elemList,donationId) => {
        //POST DE LOS ELEMENTOS DONADOS
        const selectedElements = elemList.filter((elem) => elem.count > 0 && elem.description !== "")
        if (selectedElements.length > 0) {
            selectedElements.forEach((elem) => elem["donation"] = donationId)
            const res2 = await fetch("http://127.0.0.1:8000/api/donatedElement-api/", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(selectedElements)
            })
            if (res2.status === 200) {
                const resJ = await res2.json();
                const ids = resJ["ids"]
                selectedElements.forEach((elem,index)=>elem["id"] = ids[index])
                console.log("selected elems",selectedElements)
                setDonationElementsCtx([...donationElementsCtx, selectedElements])
            }
        }
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ marginTop: 1 }}>
                    <Grid item sm={12} md={12} lg={12}>
                        <TextField
                            label="Dirección"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={6} lg={6}>
                        <Autocomplete
                            autoHighlight
                            id="select-campaign"
                            options={campaigns}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Campaña" />}
                            onChange={(e, option) => setCampaign(option)}
                            value={campaign || null}
                        >
                        </Autocomplete>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status-name-label">Status</InputLabel>
                            <Select
                                fullWidth={true}
                                labelId="status-name-label"
                                label="Status"
                                id="status-name-select"
                                onChange={(e) => { e.preventDefault(); setStatus(e.target.value); }}
                                value={status}
                            >
                                {
                                    donationStatus.map(
                                        ({ 0: id, 1: name }) => <MenuItem key={id} value={id}>{name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* Seccion de elementos donados */}
                <Divider sx={{ padding: 1 }} />
                <Typography sx={{ color: "#1976D2", fontSize: 20, paddingTop: 1 }}>Elementos donados</Typography>
                <Stack spacing={3}>
                    {
                        donationElements.map((elem, index) => <DonatedElementForm
                            key={elem.id}
                            data={elem}
                            onSave={(nElem) => handleSave(nElem, index)}
                            onDelete={() => handleDelete(index)}
                            autoSave={true}
                        />)
                    }
                    <IconButton onClick={() => addDonationElement()}>
                        <Add />
                    </IconButton>
                </Stack>
                <Fab color="primary" aria-label="add" style={doneFabStyle} type="submit">
                    <Done></Done>
                </Fab>

            </form>
            <Fab aria-label="add" style={cancelFabStyle} onClick={()=>onSubmit()}>
                    <Close></Close>
            </Fab>
        </div>
    )
}

export default DonationForm
