import { render, screen, waitFor } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

const Probe = () => {
  const { data, error } = useData();
  return (
    <div>
      <div data-testid="data">{data ? JSON.stringify(data) : ""}</div>
      <div data-testid="error">{error ?? ""}</div>
    </div>
  );
};

describe("DataContext / useData", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    window.console.error = jest.fn();
  });

  it("loads data successfully and exposes it through the hook", async () => {
    jest.spyOn(api, "loadData").mockResolvedValue({ result: "ok" });

    render(
      <DataProvider>
        <Probe />
      </DataProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("data").textContent).toContain('"result":"ok"');
    });
    expect(screen.getByTestId("error").textContent).toBe("");
    expect(api.loadData).toHaveBeenCalledTimes(1);
  });

  it("exposes error when loadData fails", async () => {
    jest.spyOn(api, "loadData").mockRejectedValue("error on calling events");

    render(
      <DataProvider>
        <Probe />
      </DataProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe(
        "error on calling events",
      );
    });

    expect(screen.getByTestId("data").textContent).toBe("");
    const calls = api.loadData.mock.calls.length;
    expect(calls).toBeGreaterThanOrEqual(1);
    expect(calls).toBeLessThanOrEqual(2);
  });

  it("api.loadData fetches /events.json and returns parsed json", async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ focus: [{ title: "A" }] }),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await api.loadData();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/events.json");
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ focus: [{ title: "A" }] });
  });
});
