import React, { createContext, useState,useEffect } from 'react'
import { fetchCampaigns, fetchDonations } from '../utils/database';

/**
 * Context que contiene las campañas
 */
export const CampaignContext = createContext();

/**
 * Extrae las campañas de la base de datos y las almacena en un Context
 */
const CampaignContextProvider = (props) => {
    const [campaigns, setCampaigns] = useState([])
    const value = {
        campaigns: campaigns,
        setCampaigns: setCampaigns,
    }

    useEffect(() => {
        const getCampaigns = async () => {
            const data = await fetchCampaigns()
            setCampaigns(data)
        }
        getCampaigns();
    }, [])


    return (
        <CampaignContext.Provider value={value}>
            {props.children}
        </CampaignContext.Provider>
    )
}

export default CampaignContextProvider
