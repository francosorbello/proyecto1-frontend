import React, { createContext, useState } from 'react'

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
