import React from 'react'
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';

/**
 * Muestra los tags disponibles
 * @param {*} tags lista de tags a mostrar
 * @param {*} onDelete evento generado al clickear el boton de borrar un tag
 * @returns 
 */
const TagList = ({ tags,onDelete }) => {
    return (
        <div>
            {
                tags===undefined ? 
                <div></div>
                :
                <Container>
                    {tags.map(
                        (tag) => <Chip 
                                    key={tag.id} 
                                    label={tag.name} 
                                    onDelete={() => onDelete(tag)}
                                    deleteIcon={<Cancel data-testid="delete-icon" />}
                                >
                                </Chip>
                    )}
                </Container>
            }
        </div>
    )
}

export default TagList
