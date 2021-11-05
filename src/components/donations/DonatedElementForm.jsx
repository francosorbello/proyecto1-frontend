import { Delete, Save } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { TagContext } from '../../contexts/TagContext'
import NumericInput from './NumericInput'

/**
 * Formulario para añadir/editar un elemento donado
 */
const DonatedElementForm = ({data,onSave,onDelete,autoSave = false}) => {
    const [description, setDescription] = useState("")
    const [elementTags, setElementTags] = useState([])
    const [quantity,setQuantity] = useState(0)
    const [quantError, setQuantError] = useState(false)

    const {tags} = useContext(TagContext)
    
    /**
     * Carga un elemento donado de entrada, si este existe.
     */
    useEffect(() => {
        if(data !== null) {
            setDescription(data.description)
            setQuantity(data.count)
            setElementTags(data.tags)
        }
    }, [])

    /**
     * Actualiza el state de la cantidad de un elemento donado
     * @param {*} quant la nueva cantidad
     */
    const handleQuantity = (quant) => {
        setQuantError(quant < 1)
        setQuantity(quant)
        
        if(autoSave) {
            handleSave(null)
        }
    }

    /**
     * Actualiza el state de la descripcion
     * @param {*} desc la nueva descripcion
     */
    const handleDescription = (desc) => {
        setDescription(desc)

        if(autoSave) {
            handleSave(null)
        }
    }

    const handleTags = (tags) => {
        setElementTags(tags)

        if(autoSave) {
            handleSave(null)
        }

    }

    const clearForm = () => {
        setDescription("")
        setElementTags([])
        setQuantity(0)
    }
    /**
     * Añade o actualiza los datos un elemento donado
     */
    const handleSave = (e) => {
        if(quantity < 1) {
            setQuantError(true)
            return
        }
        const nElement = {
            "description":description,
            "tags": elementTags,
            "count":quantity,
        }
        onSave(nElement)
    }

    return (
        <div>
            {/* <form autoComplete="off"> */}
                <Grid container spacing={3}>
                    <Grid item sm={4} md={4} lg={4}>
                        <TextField
                            label="Descripción"
                            value={description}
                            fullWidth
                            onChange={(e)=>{e.preventDefault();handleDescription(e.target.value);}}
                        />
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="tags-donatedElement"
                            options={tags}
                            getOptionLabel={(option)=>option.name}
                            renderInput={(params)=>(<TextField {...params} label="Tags"/>)}
                            onChange={(e,params)=>{e.preventDefault(); handleTags(params);}}
                        />
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Stack direction="row" >
                            <NumericInput
                                label="Cantidad"
                                minValue={0}
                                onChange={(e)=>handleQuantity(e)}
                                error={quantError}
                            />
                            <IconButton onClick={handleSave}>
                                <Save />
                            </IconButton>
                            <IconButton onClick={onDelete}>
                                <Delete />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            {/* </form> */}
        </div>
    )
}

export default DonatedElementForm
