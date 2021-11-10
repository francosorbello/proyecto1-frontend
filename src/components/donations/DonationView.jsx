import { Chip, TextField, Typography } from '@mui/material'
import { DataGrid, GridToolbar, getGridStringOperators, GridFilterItem, GridColDef } from '@mui/x-data-grid'
import React, { useState, useContext } from 'react'
import { DonationElementContext } from '../../contexts/DonationElementContext'

const tagsFilter= [
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


const TagNameFilterInput = ({item,applyValue}) => {
    return (
        <div>
            <TextField label="Name" focused size="normal"  variant="standard" onChange={(e)=>applyValue({...item,value: e.target.value})}></TextField>  
        </div>
    )
}


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

const DonationView = ({donation}) => {
    // const [currentDonationElems, setCurrentDonationElems] = useState([])
    const {donationElements} = useContext(DonationElementContext)
    const currentDonationElements = donationElements.filter((elem) => elem.donation === donation.id)
    return (
        <div>
            {
                donation === null ? 
                <></>
                : 
                <div>
                    <Typography sx={{paddingBottom: 4}} id="modal-wind-title" variant="h6" component="h2">
                        {donation.storageAddress}                                
                    </Typography>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                rows={currentDonationElements}
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
