import TagContextProvider, { TagContext } from "./TagContext";
import { useContext } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

require('jest-fetch-mock').enableMocks()


beforeEach(()=>{
    fetch.resetMocks();
})

describe("Tag Context",()=>{
    it("Setea lista de tags correctamente",async ()=>{
        fetch.mockResponseOnce(JSON.stringify([{"id":1,"name":"invierno"},{"id":2,"name":"verano"}]))
        // componente dummy que renderiza la lista de tags
        const TestComponent = () => {
            const {tags} = useContext(TagContext)
            console.log("tags",tags)
            return(
                <div>
                    <div data-testid="tag">{tags.count > 0}</div>
                </div>
            )
        }
        const wrapper = render(
            <TagContextProvider>
                <TestComponent />
            </TagContextProvider>
        )
        
        expect(wrapper.getByTestId("tag")).toHaveValue("true")
    })
})