import { Add, Remove } from '@mui/icons-material'
import { IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const NumericInput = ({label,minValue = 0,initialValue = 0, onChange}) => {
    const [localValue, setLocalValue] = useState(0)
    const handleChange = (newValue) => {
        if(isNumber(newValue)) {
            setLocalValue(newValue < minValue ? minValue : newValue)
            onChange(newValue < minValue ? minValue : newValue)
        }
    }

    function isNumber(x) {
        return !isNaN(Number(x))
    }

    useEffect(() => {
        if(initialValue !== null && initialValue >= minValue) {
            setLocalValue(initialValue)
        }
    }, [])
    return (
        <div>
            <Stack direction="row">
                <IconButton onClick={()=>handleChange(localValue-1)}>
                    <Remove/>
                </IconButton>
                <TextField 
                    type="numeric"
                    label={label}
                    value={localValue}
                    onChange={(e)=>handleChange(e.target.value)}
                />
                <IconButton onClick={()=>handleChange(localValue+1)}>
                    <Add/>
                </IconButton>
            </Stack>
        </div>
    )
}

export default NumericInput
