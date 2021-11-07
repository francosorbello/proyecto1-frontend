import React from 'react'
import CampaignContextProvider from './CampaignContext'
import DonationContextProvider from './DonationContext'
import DonationElementContextProvider from './DonationElementContext'
import TagContextProvider from './TagContext'

/**
 * Habilita a un componente a acceder a todos los contexts disponibles
 */
const AppContextProvider = (props) => {
    return (
        <div>
            <DonationContextProvider>
                <DonationElementContextProvider>
                    <CampaignContextProvider>
                        <TagContextProvider>
                            {props.children}
                        </TagContextProvider>
                    </CampaignContextProvider>
                </DonationElementContextProvider>
            </DonationContextProvider>
        </div>
    )
}

export default AppContextProvider
