import React from "react"
import { render, waitForElement } from "@testing-library/react"
import { Chapter } from "../../components/video/Chapter"

/* afterAll(() => {
    fetch.mockClear();
}); */

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Chapter />, div)
})

test("contains menu after async fetch", async () => {
    const { container } = render(<Chapter />);
    const menu = await waitFor(() => container.querySelector(`ul`));
    expect(menu).toBeInTheDocument();
})