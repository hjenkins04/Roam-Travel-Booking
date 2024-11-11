import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBoxButtonSkeleton from "@/components/SearchBoxButtonSkeleton";

/**
 * Test File: SearchBoxButtonSkeleton
 *
 * Purpose:
 * - Verifies rendering behavior of SearchBoxButtonSkeleton component with default and custom sizes.
 * - Ensures all skeleton elements (header, icon, main text, subtext) are rendered with the correct classes.
 *
 * Test Cases:
 * 1. Renders with default size:
 *    - Checks for the default w-[230px] width class and presence of all skeleton elements with appropriate styles.
 *
 * 2. Renders with custom size if provided:
 *    - Verifies custom width class is applied when size prop is specified, replacing the default size.
 */


describe('SearchBoxButtonSkeleton Component', () => {
  test('renders with default size and skeleton elements', () => {
    // Act: Render the component
    render(<SearchBoxButtonSkeleton />);

    // Assert: Verify the default size class is applied
    const container = screen.getByTestId("skeleton-button");
    expect(container).toHaveClass('w-[230px]');

    // Assert: Ensure skeleton is rendered with the correct sub attributes
    const headerSkeleton = screen.getByTestId('skeleton-header-text');
    expect(headerSkeleton).toBeInTheDocument();
    expect(headerSkeleton).toHaveClass('h-4 w-16 bg-gray-200');

    const iconSkeleton = screen.getByTestId('skeleton-icon');
    expect(iconSkeleton).toBeInTheDocument();
    expect(iconSkeleton).toHaveClass('h-4 w-4 bg-gray-300');

    const mainTextSkeleton = screen.getByTestId('skeleton-main-text');
    expect(mainTextSkeleton).toBeInTheDocument();
    expect(mainTextSkeleton).toHaveClass('h-5 w-20 bg-gray-200');

    const subTextSkeleton = screen.getByTestId('skeleton-sub-text');
    expect(subTextSkeleton).toBeInTheDocument();
    expect(subTextSkeleton).toHaveClass('h-4 w-16 bg-gray-200');
  });

  test('renders with custom size if provided', () => {
    // Arrange: Render component with custom size
    const customSize = 'w-[300px]';
    render(<SearchBoxButtonSkeleton size={customSize} />);

    // Assert: Ensure custom size is applied
    const container = screen.getByTestId("skeleton-button");;
    expect(container).toHaveClass(customSize);
    expect(container).not.toHaveClass('w-[230px]');
  });
});
