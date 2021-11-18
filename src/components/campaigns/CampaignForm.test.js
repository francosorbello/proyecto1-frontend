import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import CampaignContext from '../../contexts/CampaignContext';
import CampaignForm from './CampaignForm';

const titleText = "Titulo campaña"
const descText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis beatae, iste consequatur eaque nam fuga nisi blanditiis ipsam reprehenderit quas vitae tenetur deserunt non quae voluptas repellendus! Commodi, pariatur."
const campaigns = [
    {
        "id": 1,
        "name": "campaña de invierno",
        "description": "frio",
        "initialDate": "2021-11-11",
        "endDate": "2021-11-25"
    },
    {
        "id": 2,
        "name": "campaña de verano",
        "description": "calor",
        "initialDate": "2021-11-12",
        "endDate": "2021-11-28"
    }
]

describe("<CampaignForm />",()=>{
    it("renderiza la vista del formulario",()=>{
        const component = render(<CampaignContext><CampaignForm campaign = {campaigns[0]}></CampaignForm></CampaignContext>)
    })
    
    it("renderiza sin datos",()=>{
        const component = render(<CampaignContext><CampaignForm campaign = {null}></CampaignForm></CampaignContext>)
    })

    it("titulo acepta datos",()=>{
        const component = render(<CampaignContext><CampaignForm campaign = {null}></CampaignForm></CampaignContext>)
        // console.log(component.getByLabelText("Nombre"))
        const title = screen.getByTestId("campaign-title")
        userEvent.type(title,titleText)
        expect(title).toHaveValue(titleText)
    })

    it("sobreescribir titulo al editar una campaña",() => {
        const component = render(<CampaignContext><CampaignForm campaign = {campaigns[0]}></CampaignForm></CampaignContext>)
        const title = screen.getByTestId("campaign-title")
        userEvent.type(title," nuevos valores 123#|-@")
        expect(title).toHaveValue(campaigns[0].name+" nuevos valores 123#|-@")
    })

    it("descripcion acepta datos",()=>{
        const component = render(<CampaignContext><CampaignForm campaign = {null}></CampaignForm></CampaignContext>)
        const description = screen.getByTestId("campaign-description")
        userEvent.type(description,descText)
        expect(description).toHaveValue(descText)
    })
    it("sobreescribir descripcion acepta datos",()=>{
        const component = render(<CampaignContext><CampaignForm campaign = {campaigns[0]}></CampaignForm></CampaignContext>)
        const description = screen.getByTestId("campaign-description")
        userEvent.type(description," nuevos valores 123#|-@")
        expect(description).toHaveValue(campaigns[0].description+" nuevos valoress 123#|-@")

    })
})