import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/Footer';

/**
 * Test File: Footer
 *
 * Purpose:
 * - Verifies rendering of the Footer component to ensure it displays the correct year and GitHub link.
 * - Confirms the onClick functionality by simulating a click on the GitHub icon.
 *
 * Test Cases:
 * 1. Renders with correct year and GitHub link:
 *    - Checks if the current year and the GitHub link are rendered correctly.
 *
 * 2. GitHub icon onClick execution:
 *    - Mocks window.open and verifies it is called with the correct URL when the GitHub link is clicked.
 */


describe('Footer Component', () => {
  it('renders the footer with the correct year and GitHub link, and executes onClick correctly', () => {
    // Arrange: Mock window.open function
    const windowOpenMock = jest.spyOn(window, 'open').mockImplementation();

    // Act: Render Footer
    render(<Footer />);

    // Assert: Ensure current year is rendered
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Roam. All rights reserved.`)).toBeInTheDocument();

    // Assert: Ensure GitHub icon and link is rendered
    const githubLink = screen.getByRole('link', { name: /GitHub Repository/i });
    expect(githubLink).toBeInTheDocument();

    // Act: Simulate a click on the GitHub icon
    fireEvent.click(githubLink);

    // Assert: Verify that window.open was called
    expect(windowOpenMock).toHaveBeenCalledWith('https://github.com/ryanvandrunen/327-Group34-CH', '_blank');

    // Clean up
    windowOpenMock.mockRestore();
  });
});
