import { fetchTags } from "./database";
import "@testing-library/jest-dom/extend-expect";
require('jest-fetch-mock').enableMocks()

beforeEach(()=>{
    fetch.resetMocks();
})

describe("tag api",()=>{
    it("recibe tags en GET",async ()=>{
        fetch.mockResponseOnce(JSON.stringify([{"id":1,"name":"invierno"},{"id":2,"name":"verano"}]))
        const res = await fetchTags();
        expect(res).toEqual([{"id":1,"name":"invierno"},{"id":2,"name":"verano"}])
    })
})