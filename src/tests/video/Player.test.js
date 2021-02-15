import React from "react"
import { render, waitForElement } from "@testing-library/react"
import { MyPlayer } from "../../components/video/Player"

jest.mock('leaflet')

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve({
                    Film: {
                        file_url: "http://file_url",
                        title: "Name 1",
                        synopsis_url: "https://synopsis_url"
                    },
                    Chapters: [{
                        pos: "0",
                        title: "Start"
                    }],
                    Waypoints: [{
                        lat: "32.42",
                        lng: "-90.13",
                        label: "Place 1",
                        timestamp: "45"
                    }],
                    Keywords: [{
                        pos: "0",
                        data: [{
                            title: "Mot clef 1",
                            url: "url de la page"
                        }]
                    }]

                });
            }
        });
    });
});


afterEach(() => {
    fetch.mockClear();
});

test("backend is called", () => {
    render(<MyPlayer />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://imr3-react.herokuapp.com/backend");
})

test("renders without crashing", async () => {
    const div = document.createElement("div");
    render(<MyPlayer />, div)
})

test("does not contains menu after initial render", () => {
    const { container } = render(<MyPlayer />);
    const aside = container.querySelector("aside");
    expect(aside).toBeNull();
});

test("contains aside after async fetch", async () => {
    const { container } = render(<MyPlayer />);
    const aside = await waitForElement(() => container.querySelector(`aside`));
    expect(aside).toBeInTheDocument();
});
