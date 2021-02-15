import React from "react"
import { render } from "@testing-library/react"
import { Keyword } from "../../components/video/Keyword"

const keywordsProps = {
    items: [
        {
            pos: "0",
            data: [
                {
                    title: "Route 66",
                    url: "https://en.wikipedia.org/wiki/U.S._Route_66"
                },

                {
                    title: "Mathias Einmann",
                    url: "http://www.imdb.com/name/nm1667578/"
                }
            ]
        },
        {
            pos: "155",
            data: [
                {
                    title: "Stefan Kluge",
                    url: "http://www.imdb.com/name/nm1667631/"
                }
            ]
        }
    ],
    currentTime: 150
}

test("renders without crashing", async () => {
    const div = document.createElement("div");
    await render(<Keyword {...keywordsProps} />, div)
})

test("contains ul", () => {
    const { container } = render(<Keyword {...keywordsProps} />);
    const ul = container.querySelector(`ul`);
    expect(ul).toBeInTheDocument();
})

test("contains keywords url if currentTime > pos", () => {
    const { container } = render(<Keyword {...keywordsProps} />);
    const href = container.querySelector(`a`).getAttribute('href');
    console.log(href)
    expect(href).toBe("https://en.wikipedia.org/wiki/U.S._Route_66");
})

test("doesn't contains keywords url if currentTime < pos", () => {
    const { container } = render(<Keyword {...keywordsProps} />);
    const name = container.querySelector('Stefan Kluge');
    expect(name).toBeNull();
})