import { fireEvent, render } from "@testing-library/react";
import TagList from "./TagList";

const tags = [{ "id": 1, "name": "invierno" }, { "id": 2, "name": "verano" }, { "id": 3, "name": "ropa" }]

describe("<TagList />", () => {
    it('Renderiza Tag List correctamente', () => {
        render(<TagList></TagList>)
    });
    it('Renderiza tags por props', () => {
        const tagList = render(<TagList tags={tags}></TagList>);
        tags.forEach((tag)=>{
            tagList.getByText(tag.name)
        })
    })
    it('Renderiza lista vacia', ()=>{
        const tagList = render(<TagList tags={[]}></TagList>);
    })
    it('Lanza evento onDelete', ()=>{
        let deleted = false
        const tagList = render(<TagList tags={tags} onDelete={(e)=>deleted = true}></TagList>);
        const deleteButton = tagList.getAllByTestId("delete-icon")[0]
        
        fireEvent.click(deleteButton)
        expect(deleted).toBe(true)
    })
})
