import React, { createContext, useState,useEffect } from 'react'
import { fetchCampaigns, fetchDonations } from '../utils/database';

export const CampaignContext = createContext();


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
