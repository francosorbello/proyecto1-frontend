import React from 'react'
import Chip from '@mui/material/Chip';
import Stack  from '@mui/material/Stack';

const TagList = ({ tags,onDelete }) => {
    return (
        <div>
            <Stack direction="row" spacing={1}>
            {tags.map(
                (tag) => <Chip label={tag.name} onDelete={() => onDelete(tag)}></Chip>
            )}
            </Stack>
        </div>
    )
}

export default TagList
