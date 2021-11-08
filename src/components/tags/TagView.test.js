import { render } from "@testing-library/react";
import TagContextProvider from "../../contexts/TagContext";
import TagView from "./TagView";

test("renderiza la vista de tags",()=>{
    const component = render(<TagContextProvider><TagView></TagView></TagContextProvider>)
})
