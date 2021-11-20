import { Chip, TextField, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useContext } from 'react'
import { CampaignContext } from '../../contexts/CampaignContext'
import { DonationContext } from '../../contexts/DonationContext'
/**
 * Filtra los tags de una columna segun su nombre
 */
const tagsFilter = [
    {
        label: 'Tag Name',
        value: 'tag name',
        getApplyFilterFn: (filterItem, column) => {
            return (params) => {
                const matchingTags = params.row.tags.filter((tag)=>tag.name.includes(filterItem.value))
                return matchingTags.length > 0
            }
        },
        InputComponent: ({item, applyValue}) => <TagNameFilterInput item={item} applyValue={applyValue}/>
    }
]

/**
 * Textfield que toma el nombre de una tag como input y la pasa al filtro
 */
const TagNameFilterInput = ({item,applyValue}) => {
    return (
        <div>
            <TextField label="Name" focused size="normal"  variant="standard" onChange={(e)=>applyValue({...item,value: e.target.value})}></TextField>  
        </div>
    )
}

/**
 * Columnas de la tabla de elementos donados
 */
const columns = [
    {field: "description",headerName: "description", width: 150},
    {field: "count",headerName: "Cantidad", width: 150},
    {
        field: "tags",
        headerName: "Tags",
        // width: 500,
        minWidth: 500,
        flex: 1,
        renderCell: (cellValues) => {
            return(
                cellValues.row.tags.map((tag)=><Chip key={tag.id} label={tag.name}></Chip>)
            )
        },
        sortComparator: (v1,v2) => {return (v2)},
        filterOperators: tagsFilter
    }
]

/**
 * Muestra una tabla con elementos donados, junto con la direccion de la donacion
 */
const DonationView = ({donation}) => {
    const {donationStatus} = useContext(DonationContext)
    const {campaigns} = useContext(CampaignContext)
    
    return (
        <div>
            {
                donation === null ? 
                <></>
                : 
                <div>
                    <Typography sx={{paddingBottom: 4}} id="modal-wind-title" variant="h4" component="h2">
                        {donation.storageAddress}
                    </Typography>

                    <Typography sx={{paddingBottom: 4}} id="modal-wind-status" variant="h6" component="h3">
                        Campaña: {campaigns.filter((elem)=>elem.id === donation.campaignId)[0].name}
                    </Typography>

                    <Typography sx={{paddingBottom: 4}} id="modal-wind-status" variant="h6" component="h3">
                        Status: {donationStatus.filter((elem)=>elem[0]===donation.status)[0][1]}
                    </Typography>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                rows={donation["donatedElements"]}
                                columns={columns}
                                autoHeight
                                components={{
                                    Toolbar: GridToolbar
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DonationView
