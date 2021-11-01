import React from 'react'
import CampaignContextProvider from './CampaignContext'
import DonationContextProvider from './DonationContext'
import TagContextProvider from './TagContext'

/**
 * Habilita a un componente a acceder a todos los contexts disponibles
 */
const AppContextProvider = (props) => {
    return (
        <div>
            <DonationContextProvider>
                <CampaignContextProvider>
                    <TagContextProvider>
                        {props.children}
                    </TagContextProvider>
                </CampaignContextProvider>
            </DonationContextProvider>
        </div>
    )
}

export default AppContextProvider
