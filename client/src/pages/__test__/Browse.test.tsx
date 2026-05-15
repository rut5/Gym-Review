import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Browse from "../Browse/Browse";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock PacmanLoader
vi.mock("react-spinners", () => ({
  PacmanLoader: () => <div data-testid="pacman-loader" />,
}));

// Mock global fetch
vi.stubGlobal("fetch", vi.fn());

// Mock API_BASE_URL
vi.stubEnv("VITE_API_URL", "http://localhost:4000");

describe("Browse Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Helper to render with MemoryRouter (for Link components)
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("shows loading state initially", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));
    renderWithRouter(<Browse />);
    expect(screen.getByTestId("pacman-loader")).toBeInTheDocument();
  });

  it("shows error message if fetch fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Failed to fetch places"));
    renderWithRouter(<Browse />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch places/i),
      ).toBeInTheDocument();
    });
  });

  it("shows 'No places found' if API returns empty array", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response);

    renderWithRouter(<Browse />);

    await waitFor(() => {
      expect(screen.getByText(/No places found\./i)).toBeInTheDocument();
    });
  });

  it("renders a list of places with details", async () => {
    const mockPlaces = [
      {
        id: 1,
        name: "Queer Community Center",
        location: "Stockholm",
        averageSafetyRating: 4.5,
      },
      {
        id: 2,
        name: "Safe Space Café",
        location: "Gothenburg",
        averageSafetyRating: 5,
      },
    ];
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPlaces),
    } as Response);

    renderWithRouter(<Browse />);

    await waitFor(() => {
      expect(screen.getByText("Browse Spaces")).toBeInTheDocument();
      expect(screen.getByText("Queer Community Center")).toBeInTheDocument();
      expect(screen.getByText("Stockholm")).toBeInTheDocument();
      expect(screen.getByText("Safety: 4.5/5")).toBeInTheDocument();
      expect(screen.getByText("Safe Space Café")).toBeInTheDocument();
      expect(screen.getByText("Gothenburg")).toBeInTheDocument();
      expect(screen.getByText("Safety: 5/5")).toBeInTheDocument();
      // Check for View Details links
      expect(screen.getAllByText("View Details").length).toBe(2);
    });
  });
});
