import React from "react"
import { render, waitForElement } from "@testing-library/react"
import { Map } from "../../components/map/Map"

jest.mock('leaflet')


const MapProps = {
    items: [
        {
            lat: "32.42",
            lng: "-90.13",
            label: "Ridgeland",
            timestamp: "45"
        },
        {
            lat: "38.90",
            lng: "-77.04",
            label: "Washington DC",
            timestamp: "300"
        },
    ],
    currentTime: 150
}

test("renders without crashing", async () => {
    const div = document.createElement("div");
    render(<Map {...MapProps} />, div)
})
