import { Add, Remove } from '@mui/icons-material'
import { IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

/**
 * Input que solo toma valores numericos como entrada.
 * @param {*} label Nombre que aparece en el componente
 * @param {*} minValue valor minimo aceptado por el input. Por ejemplo, si minValue=0, -1 no es un valor valido
 * @param {*} initialValue valor inicial del input
 * @param {*} onChange evento generado al actualizar el valor del input
 * @param {*} allowEmpty si es true, permite que el input este vacio. Caso contrario, defaultea al valor minimo
 */
const NumericInput = ({label,minValue = 0,initialValue = 0, onChange,allowEmpty = true}) => {
    const [localValue, setLocalValue] = useState(0)
    const [error,setError] = useState(false)
    
    const handleChange = (newValue) => {
        if(newValue==="" && allowEmpty) {
            setLocalValue(newValue)
            setError(true)
            return
        }
        if(isNumber(newValue)) {
            // const finalValue = newValue < minValue ? minValue : newValue
            const finalValue = newValue
            setLocalValue(finalValue)
            // console.log(finalValue <= minValue)
            setError(finalValue < minValue)
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

    /**
     * Indica si un valor de entrada es un numero o no
     * @param {*} x valor a observar
     * @returns si x es un número o no
     */
    function isNumber(x) {
        return !isNaN(Number(x))
    }

    /**
     * Setea el valor inicial, en caso de que haya uno de entrada
     */
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
                    required
                    error={error || localValue === 0}
                    type="numeric"
                    label={label}
                    value={localValue}
                    onChange={(e)=>handleChange(e.target.value)}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                />
                <IconButton onClick={()=>addNumber(localValue)}>
                    <Add/>
                </IconButton>
            </Stack>
        </div>
    )
}

export default NumericInput
