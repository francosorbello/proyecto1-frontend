import { render } from "@testing-library/react";
import TagContextProvider from "../../contexts/TagContext";
import TagView from "./TagView";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

require('jest-fetch-mock').enableMocks()

const tagName = "zapatos"
const tags = [{ "id": 1, "name": "invierno" }, { "id": 2, "name": "verano" }, { "id": 3, "name": "ropa" }]

describe("<TagView />",()=>{
    it.skip("renderiza la vista de tags",async ()=>{
        fetch.mockResponseOnce(JSON.stringify(tags))
        act(()=>{
            const component = render(<TagContextProvider><TagView></TagView></TagContextProvider>) 
        })
        expect(fetch.mock.calls.length).toEqual(1)

    })
    it.skip("acepta texto en el formulario",()=>{
        const tagView = render(<TagContextProvider><TagView></TagView></TagContextProvider>)
        const input = tagView.getByRole('textbox')
        userEvent.type(input,tagName)
        expect(input).toHaveValue(tagName)
    })
})

