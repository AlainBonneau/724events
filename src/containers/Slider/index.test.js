import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "Nordic design week",
      description: "Conférences sur le design de demain dans le digital",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png",
    },
    {
      title: "Sneakercraze market",
      description: "Rencontres de spécialistes des Sneakers Européens.",
      date: "2022-05-29T20:28:45.744Z",
      cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png",
    },
  ],
};

describe("When slider is created", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays events sorted by date desc and rotates", async () => {
    const { container } = render(
      <DataProvider>
        <Slider />
      </DataProvider>,
    );

    await screen.findByText("Sneakercraze market");
    expect(container.querySelector(".SlideCard--display h3")?.textContent).toBe(
      "Sneakercraze market",
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(container.querySelector(".SlideCard--display h3")?.textContent).toBe(
      "Nordic design week",
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(container.querySelector(".SlideCard--display h3")?.textContent).toBe(
      "World economic forum",
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(container.querySelector(".SlideCard--display h3")?.textContent).toBe(
      "Sneakercraze market",
    );
  });
});
