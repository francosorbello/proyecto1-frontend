import React, { createContext, useEffect, useState } from 'react'
import { fetchDonationElements } from '../utils/database';

/**
 * Context de los elementos donados
 */
export const DonationElementContext = createContext();

/**
 * Provee de un state para el context de los elementos donados
 * @param {*} props hijos a renderizar
 * @returns 
 */
const DonationElementContextProvider = (props) => {
    const [donationElements,setDonationElements] = useState([])

    useEffect(() => {
        const getDonationElements = async() => {
            const data = await fetchDonationElements()
            setDonationElements(data)
        }
        
        getDonationElements()
    }, [])
    const value = {
        donationElements: donationElements,
        setDonationElements: setDonationElements
    }
    return (
       <DonationElementContext.Provider value={value}>
           {props.children}
        </DonationElementContext.Provider>
    )
}

export default DonationElementContextProvider
