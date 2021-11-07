import { Add, Remove } from '@mui/icons-material'
import { IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const NumericInput = ({label,minValue = 0,initialValue = 0, onChange}) => {
    const [localValue, setLocalValue] = useState(0)
    const [error,setError] = useState(false)
    
    const handleChange = (newValue) => {
        if(isNumber(newValue)) {
            const finalValue = newValue < minValue ? minValue : newValue
            setLocalValue(finalValue)
            // console.log(finalValue <= minValue)
            setError(finalValue <= minValue)
            onChange(finalValue)
        }
    }

    /**
     * Reduce el valor en 1 y actualiza el state
     * @param {*} value el valor a reducir
     */
    const reduceNumber = (value) => {
        if(isNumber(value)) {
            handleChange(Number(value)-1)
        }
    }

    /**
     * Suma 1 al valor y actualiza state
     */
    const addNumber = (value) => {
            if(isNumber(value)) {
                handleChange(Number(value)+1)
            }
    }

    function isNumber(x) {
        return !isNaN(Number(x))
    }

    useEffect(() => { 
        if(initialValue !== null && initialValue >= minValue) {
            setLocalValue(initialValue)
        }
    }, [initialValue])
    return (
        <div>
            <Stack direction="row">
                <IconButton onClick={()=>reduceNumber(localValue)}>
                    <Remove/>
                </IconButton>
                <TextField
                    error={error}
                    type="numeric"
                    label={label}
                    value={localValue}
                    onChange={(e)=>handleChange(e.target.value)}
                />
                <IconButton onClick={()=>addNumber(localValue)}>
                    <Add/>
                </IconButton>
            </Stack>
        </div>
    )
}

export default NumericInput
