import React, { createContext, useState,useEffect } from 'react'
import {fetchDonations, fetchDonationStatus } from '../utils/database';

/**
 * Context que contiene las donaciones
 */
export const DonationContext = createContext();

/**
 * Extrae las donaciones y sus status posibles de la base de datos y las almacena en un Context
 */
const DonationContextProvider = (props) => {
    const [donations, setDonations] = useState([])
    const [donationStatus,setDonationStatus] = useState([])
    const value = {
        donations: donations,
        setDonations: setDonations,
        donationStatus: donationStatus,
        setDonationStatus: setDonationStatus
    }

    useEffect(() => {
        const getDonations = async () => {
            const data = await fetchDonations()
            const data2 = await fetchDonationStatus();
            setDonations(data)
            setDonationStatus(data2)
        }
        getDonations();
    }, [])


    return (
        <DonationContext.Provider value={value}>
            {props.children}
        </DonationContext.Provider>
    )
}

export default DonationContextProvider
