import { Delete, Save } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { TagContext } from '../../contexts/TagContext'
import NumericInput from './NumericInput'

/**
 * Formulario para añadir/editar un elemento donado
 */
const DonatedElementForm = ({data,onSave,onDelete}) => {
    const [description, setDescription] = useState("")
    const [elementTags, setElementTags] = useState([])
    const [quantity,setQuantity] = useState(0)

    const {tags} = useContext(TagContext)
    useEffect(() => {
        if(data !== null) {
            setDescription(data.description)
            setQuantity(data.count)
            setElementTags(data.tags)
        }
    }, [])

    const handleSave = (e) => {
        const nElement = {
            "description":description,
            "tags": elementTags,
            "quantity":quantity
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
                            onChange={(e)=>setDescription(e.target.value)}
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
                            onChange={(e,params)=>setElementTags(params)}
                        />
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Stack direction="row" >
                            <NumericInput
                                label="Cantidad"
                                minValue={0}
                                onChange={(e)=>setQuantity(e)}
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
