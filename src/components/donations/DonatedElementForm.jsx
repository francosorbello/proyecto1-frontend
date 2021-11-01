import { Delete, Save } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TagContext } from '../../contexts/TagContext'
import NumericInput from './NumericInput'

const DonatedElementForm = () => {
    const [description, setDescription] = useState("")
    const {tags} = useContext(TagContext)
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
                            onChange={(e,params)=>console.log(params)}
                        />
                    </Grid>
                    <Grid item sm={4} md={4} lg={4}>
                        <Stack direction="vertical">
                            <NumericInput 
                                label="Cantidad"
                                minValue={0}
                                onChange={(e)=>console.log(e)}
                            />
                            <IconButton>
                                <Save />
                            </IconButton>
                            <IconButton>
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
