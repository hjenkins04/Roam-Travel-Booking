import React from "react";
import { render, screen, act } from "@testing-library/react";
import TrendingLocationsHomeGrid from "@/components/TrendingLocationsHomeGrid";
import "@testing-library/jest-dom";
import { PopularDestination } from "@/models/popular_destination";

// Setting up mock data for popular destinations
const mockDestinations: PopularDestination[] = [
  { name: "Paris", guid: "1", image_path: "/images/paris.jpg" },
  { name: "New York", guid: "2", image_path: "/images/newyork.jpg" },
  { name: "Tokyo", guid: "3", image_path: "/images/tokyo.jpg" },
  { name: "London", guid: "4", image_path: "/images/london.jpg" },
  { name: "Sydney", guid: "5" }, // Missing image_path
];

/**
 * Test File: TrendingLocationsHomeGrid Component
 *
 * Purpose:
 * - Ensure proper rendering of the `TrendingLocationsHomeGrid` component.
 * - Verify correct display of destinations based on screen sizes:
 *   - Display 4 images on medium (md) screens.
 *   - Display 5 images on large (lg) screens.
 *
 * Test Cases:
 * 1. Renders the component with the correct structure and heading.
 *    - Expectation: The component should display the correct title and description.
 *
 * 2. Shows 4 destinations on medium (md) screens.
 *    - Expectation: Only the first 4 destinations should be visible.
 *
 * 3. Shows 5 destinations on large (lg) screens.
 *    - Expectation: All 5 destinations should be visible, with the fifth hidden on smaller screens.
 */

describe("TrendingLocationsHomeGrid Component", () => {
  const renderComponent = (destinations = mockDestinations) =>
    render(<TrendingLocationsHomeGrid destinations={destinations} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the component with the correct structure and heading", () => {
    // Arrange: Render the component
    renderComponent();

    // Assert: Check if the title, description, and grid are displayed correctly
    const gridSection = screen.getByTestId("trending-locations-grid");
    expect(gridSection).toBeInTheDocument();

    const title = screen.getByText("Popular Destinations");
    expect(title).toBeInTheDocument();

    const description = screen.getByText("Trending destinations today");
    expect(description).toBeInTheDocument();
  });

  test("Shows 4 destinations on medium (md) screens", async () => {
    // Arrange: Rebder the component and set the screen width to small

    render(<TrendingLocationsHomeGrid destinations={mockDestinations} isSmallScreen={true} />);

    // Assert: Check that only the first 4 destinations are visible
    mockDestinations.slice(0, 4).forEach((_, index) => {
      const destinationItem = screen.getByTestId(`destination-item-${index}`);
      expect(destinationItem).toBeVisible();
    });

    // Assert: Ensure the fifth destination is hidden on md and sm screens
    const hiddenDestination = screen.queryByTestId("destination-item-4");
    expect(hiddenDestination).toHaveClass("hidden");
  });

  test("Shows 5 destinations on large (lg) screens", async () => {
    // Arrange: Set the screen width to simulate large (lg) size
    global.innerWidth = 1024; // Typical lg breakpoint
    await act(async () => {
      global.dispatchEvent(new Event("resize"));
    });

    renderComponent();

    // Assert: Check that all 5 destinations are visible
    mockDestinations.forEach((dest, index) => {
      const destinationItem = screen.getByTestId(`destination-item-${index}`);
      expect(destinationItem).toBeVisible();
    });
  });

  test("Displays placeholder image when image_path is missing", () => {
    renderComponent();

    // Assert: Check that the destination with a missing image path shows the placeholder
    const sydneyImage = screen.getByAltText("Sydney");
    expect(sydneyImage).toHaveAttribute("src", expect.stringContaining("placeholder.svg"));
  });
});
