import React, { createContext, useState,useEffect } from 'react'
import { fetchTags } from '../utils/database';


export const TagContext = createContext();

const TagContextProvider = (props) => {
    const [tags,setTags] = useState([]);
    const value = {
        tags: tags,
        setTags: setTags
    }

    useEffect(() => {
        const getTags = async () => {
            const data = await fetchTags().catch(()=>[])
            setTags(data)
        }
        getTags();
    }, [])

    return (
        <div>
            <TagContext.Provider value={value}>
                {props.children}
            </TagContext.Provider>
        </div>
    )
}

export default TagContextProvider
