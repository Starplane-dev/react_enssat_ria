import React from "react"
import { render, waitFor, fireEvent, screen } from "@testing-library/react"
import { Chapter, ItemChapter } from "../../components/video/Chapter"

const chapterProps = {
    items: [{
        pos: "0",
        title: "Start"
    },
    {
        pos: "1",
        title: "End"
    }
    ],
    currentTime: 150
}
const chapterItemProps = {
    elt: {
        pos: "0",
        title: "Start"
    },
    currentTime: 150
}

test("renders without crashing", async () => {
    const div = document.createElement("div");
    await render(<Chapter {...chapterProps} />, div)
})

test("contains ul", () => {
    const { container } = render(<Chapter {...chapterProps} />);
    const ul = container.querySelector(`ul`);
    expect(ul).toBeInTheDocument();
})

test("renders chapter items without crashing", async () => {
    const div = document.createElement("div");
    await render(<ItemChapter {...chapterItemProps} />, div)
})

test("contains chapter items", () => {
    const { container } = render(<ItemChapter {...chapterItemProps} />);
    const button = container.querySelector(`button`);
    expect(button).toBeInTheDocument();
})

test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn()
    render(<ItemChapter onClick={handleClick}{...chapterItemProps} />)
    fireEvent.click(screen.getByText(/Start/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
})