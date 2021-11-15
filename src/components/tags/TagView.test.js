import { render } from "@testing-library/react";
import TagContextProvider from "../../contexts/TagContext";
import TagView from "./TagView";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

const tagName = "zapatos"
const tags = [{ "id": 1, "name": "invierno" }, { "id": 2, "name": "verano" }, { "id": 3, "name": "ropa" }]

describe("<TagView />",()=>{
    it("renderiza la vista de tags",()=>{
        const component = render(<TagContextProvider><TagView></TagView></TagContextProvider>)
    })
    it("acepta texto en el formulario",()=>{
        const tagView = render(<TagContextProvider><TagView></TagView></TagContextProvider>)
        const input = tagView.getByRole('textbox')
        userEvent.type(input,tagName)
        expect(input).toHaveValue(tagName)

    })
})

