import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { ChatPost } from "../../components/chatroom/ChatPost"

const mockState = {
    name: "test",
    message: "message test",
    when: 150
}

test("renders without crashing", async () => {
    const form = document.createElement("form");
    render(<ChatPost />, form)
})

/* test('calls onSubmit when clicked', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<ChatPost onSubmit={onSubmit} />)
    fireEvent.click(getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1)
}) */