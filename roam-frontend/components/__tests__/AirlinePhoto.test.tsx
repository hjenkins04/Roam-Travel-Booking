import React from "react";
import { render, screen } from "@testing-library/react";
import AirlinePhoto from "../Images/AirlinePhoto";

jest.mock(
  "next/image",
  () => (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
);

/**
 * Test File: AirlinePhoto
 *
 * Purpose:
 * - Verifies the AirlinePhoto component's rendering behavior with different imagePath values.
 * - The AirlinePhoto component displays:
 *      - An airline photo using the provided imagePath or, if not provided, a default image.
 *      - The photo in a fixed 40x40 pixel container with a cover-fit style to ensure it fills the container properly.
 *
 * Test Cases:
 * 1. Render the component with a custom image path.
 *    - Expectation: The component should render an image element with the src attribute matching the provided imagePath and an alt attribute of "Airline photo".
 *
 * 2. Render the component without an imagePath (default behavior).
 *    - Expectation: When no imagePath is provided, the component should render an image element with the src attribute set to the default path ("/images/default.png").
 */

describe("AirlinePhoto Component", () => {
  test("renders with a custom image path", () => {
    const customPath = "/images/custom.png";
    render(<AirlinePhoto imagePath={customPath} />);

    const imageElement = screen.getByAltText("Airline photo");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", customPath);
  });

  test("renders with the default image when no imagePath is provided", () => {
    render(<AirlinePhoto />);

    const imageElement = screen.getByAltText("Airline photo");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/images/default.png");
  });
});
