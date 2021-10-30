import React,{useContext, useState} from 'react'
import { TagContext } from '../contexts/TagContext'

const TagView = () => {
    const {tags, setTags} = useContext(TagContext)
    const {newTag,setNewTag} = useState("");
    return (
        <div>
            
        </div>
    )
}

export default TagView
 