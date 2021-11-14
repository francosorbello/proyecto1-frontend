import React from 'react'
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';

/**
 * Muestra los tags disponibles
 * @param {*} tags lista de tags a mostrar
 * @param {*} onDelete evento generado al clickear el boton de borrar un tag
 * @returns 
 */
const TagList = ({ tags,onDelete }) => {
    return (
        <div>
            <Container>
                {tags.map(
                    (tag) => <Chip key={tag.id} label={tag.name} onDelete={() => onDelete(tag)}></Chip>
                )}
            </Container>
        </div>
    )
}

export default TagList
