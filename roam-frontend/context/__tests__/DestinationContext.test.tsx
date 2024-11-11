import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useDestinationsStore } from "@/context/DestinationContext";
import { fetchPopDestinations } from "@/api/FetchPopDestinations";
import { PopularDestination } from "@/models/popular_destination";
import TrendingLocationsHomeGrid from "@/components/TrendingLocationsHomeGrid";

jest.mock("@/api/FetchPopDestinations");

const mockDestinations: PopularDestination[] = [
  { guid: "1", name: "Paris", image_path: "/images/paris.jpg" },
  { guid: "2", name: "New York", image_path: "/images/newyork.jpg" },
];

describe("useDestinationsStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset state before each test
    act(() => {
      useDestinationsStore.setState({ popularDestinations: [] });
    });
  });

  test("renders the grid with popular destinations", () => {
    render(<TrendingLocationsHomeGrid destinations={mockDestinations} />);

    // Assert grid section exists
    expect(screen.getByTestId("trending-locations-grid")).toBeInTheDocument();

    // Assert destination item and name
    mockDestinations.forEach((destination, index) => {
      const item = screen.getByTestId(`destination-item-${index}`);
      expect(item).toBeInTheDocument();
      expect(screen.getAllByTestId("destination-name")[index]).toHaveTextContent(destination.name);
    });
  });

  test("renders placeholder image when image_path is missing", () => {
    const destinationsWithMissingImages: PopularDestination[] = [
      { guid: "3", name: "London", image_path: undefined },
    ];
    render(<TrendingLocationsHomeGrid destinations={destinationsWithMissingImages} />);

    // Assert placeholder image is displayed
    const image = screen.getByTestId("destination-image");
    expect(image).toHaveAttribute("src", "/assets/placeholder.svg");
  });

  test("refreshDestinations handles error when fetchPopDestinations throws", async () => {
    // Arrange: Mock fetchPopDestinations to throw an error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (fetchPopDestinations as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    // Act: Render component and call refreshDestinations
    render(
      <TrendingLocationsHomeGrid destinations={useDestinationsStore.getState().popularDestinations} />
    );

    await act(async () => {
      await useDestinationsStore.getState().refreshDestinations();
    });

    // Assert: Check that an error occured, and destinations is an empty array
    expect(useDestinationsStore.getState().popularDestinations).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching popular destinations:",
      expect.any(Error)
    );

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
