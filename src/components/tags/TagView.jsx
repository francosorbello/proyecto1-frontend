import { Save } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';
import React,{useContext, useState} from 'react'
import { TagContext } from '../../contexts/TagContext'
import TagList from './TagList';

/**
 * Formulario para añadir, borrar y ver tags disponibles
 */
const TagView = () => {
    const {tags, setTags} = useContext(TagContext)
    const [newTag,setNewTag] = useState("");

    /**
     * Elimina un tag de la base de datos y actualiza el context
     * @param {*} tag el tag a eliminar
     */
    const handleTagDelete = async (tag) => {
        const res = await fetch(`http://127.0.0.1:8000/api/tag-api/${tag.id}/`,{
            method: "DELETE",
            headers: {
              'Content-type': 'application/json',
            },
        })

        if(res.status == "200") {
            setTags(tags.filter((item) => item.id !== tag.id))
        } else {
            alert("Error al borrar el tag")
            console.log(await res.json())
        }
    }

    /**
     * Crea un nuevo tag y actualiza el context
     * @param {*} e evento generado al hacer submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newTag !== "") {
            const res = await fetch("http://127.0.0.1:8000/api/tag-api/",{
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({"name":newTag})
            })    
            
            if(res.status == "200") {
                const resJ = await res.json();
                const nTag = {
                    "id": resJ["id"],
                    "name": newTag
                }

                setTags([...tags,nTag])
                setNewTag("")
                return;
            }
            if(res.status== "400"){
                alert("El tag que quieres crear ya existe.")
                console.log(await res.json())
            }
            if(res.status=="500"){
                alert("Hubo un problema al crear el tag.")
                console.log(await res.json())
            }
        }
    }

    return (
        <div style={{marginTop: 20}}>
            <Stack spacing={3}>
                <Stack direction="row" spacing={1}>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            onChange={(e)=>setNewTag(e.target.value)}
                            value={newTag}
                        >
                        </TextField>
                    </form>
                    <IconButton onClick={handleSubmit}>
                        <Save></Save>
                    </IconButton>
                </Stack>
                <TagList tags={tags} onDelete={handleTagDelete}></TagList>
            </Stack>
        </div>
    )
}

export default TagView
 