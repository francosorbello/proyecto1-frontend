import React from 'react'
import Chip from '@mui/material/Chip';
import Stack  from '@mui/material/Stack';
import { Container } from '@mui/material';

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
