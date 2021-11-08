import { Delete, Save } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TagContext } from '../../contexts/TagContext'
import NumericInput from './NumericInput'

/**
 * Formulario para añadir/editar un elemento donado
 */
const DonatedElementForm = ({key,data,onSave,onDelete,autoSave = false}) => {
    const [description, setDescription] = useState("")
    const [elementTags, setElementTags] = useState([])
    const [quantity,setQuantity] = useState(0)
    const [quantError, setQuantError] = useState(false)
    const isFirstRender = useRef(true)

    const {tags} = useContext(TagContext)
    
    /**
     * Carga un elemento donado de entrada, si este existe.
     */
    useEffect(() => {
        if(isFirstRender.current) {
            if(data !== null) {
                setDescription(data.description)
                setQuantity(data.count)
                setElementTags(data.tags)
            }
            isFirstRender.current = false;
        } else {
            handleSave()
        }
    }, [description,elementTags,quantity])

    /**
     * Actualiza el state de la cantidad de un elemento donado
     * @param {*} quant la nueva cantidad
     */
    const handleQuantity = (quant) => {
        // setQuantError(quant < 1)
        setQuantity(quant)
    }

    /**
     * Actualiza el state de la descripcion
     * @param {*} desc la nueva descripcion
     */
    const handleDescription = (desc) => {
        setDescription(desc)
    }

    /**
     * actualiza el state de las tags
     * @param {*} newTags el nuevo array de tags
     */
    const handleTags = (newTags) => {
        setElementTags(newTags)
    }

    const clearForm = () => {
        setDescription("")
        setElementTags([])
        setQuantity(0)
    }
    /**
     * Añade o actualiza los datos un elemento donado
     */
    const handleSave = () => {
        if(quantity < 1) {
            setQuantError(true)
            return
        }
        const nElement = {
            "description":description,
            "tags": elementTags,
            "count":quantity,
            "id":data !== null ? data.id : null
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
                            value = {elementTags || null}
                            getOptionLabel={(option)=>option.name}
                            renderInput={(params)=>(<TextField {...params} label="Tags"/>)}
                            onChange={(e,params)=>{e.preventDefault(); handleTags(params);}}
                        />
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Stack direction="row" >
                            <NumericInput
                                label="Cantidad"
                                minValue={1}
                                initialValue={quantity}
                                onChange={(e)=>handleQuantity(e)}
                            />
                            {/* <IconButton onClick={handleSave}>
                                <Save />
                            </IconButton> */}
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
