import React from 'react';
import { render, screen, fireEvent, act, waitFor, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import FilterButton from '@/components/FilterButton';
import FilterBox from '@/components/FilterBox';

/**
 * Test File: Filter Box 
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Filter Box Component. 
 * - The Filter Box Component includes:
 *      - 5 Filter Option Buttons with Dropdown Selections to apply filters to the search results. 
 *           - Max Price 
 *           - Stops
 *           - Departure Time
 *           - Arrival Time
 *           - Airline
 *      - Search Button that implements different search filters that impact the results that are displayed in Search Scroll. 
 *
 * Test Cases:
 * 1. Render the Max Price Button and when clicked display dropdown options. 
 *    - Expectation: The Max Price button should be visible, and clicking it should open a dropdown selection, 
 *      selecting a dropdown will update the MaxPrice Button, clicking reset will nullify a previous dropdown selection.
 *
 * 2. Render the Stops Button and when clicked display dropdown options. 
 *    - Expectation: The Max Price button should be visible, and clicking it should open a dropdown selection, 
 *      selecting a dropdown will update the MaxPrice Button, clicking reset will nullify a previous dropdown selection.
 *
 * 3. Render the Departure Time Button and when clicked display dropdown options. 
 *    - Expectation: The Max Price button should be visible, and clicking it should open a dropdown selection, 
 *      selecting a dropdown will update the MaxPrice Button, clicking reset will nullify a previous dropdown selection.
 *
 * 4. Render the Arrival Time Button and when clicked display dropdown options. 
 *    - Expectation: The Max Price button should be visible, and clicking it should open a dropdown selection, 
 *      selecting a dropdown will update the MaxPrice Button, clicking reset will nullify a previous dropdown selection.
 *
 * 5. Render the Airline Button and when clicked display dropdown options. 
 *    - Expectation: The Max Price button should be visible, and clicking it should open a dropdown selection, 
 *      selecting a dropdown will update the MaxPrice Button, clicking reset will nullify a previous dropdown selection.
 *
 * 6. Render the Search Button and when clicked the dropdown selections of the filter buttons should be applied to update the search results in Search Scroll. 
 *    - Expectation: Upon clicking, applyFilters should be called. 
 */

describe('FilterButton Component', () => {
    const mockOnOptionSelect = jest.fn();
    const mockApplyFilters = jest.fn();

    const renderComponent = () => render(<FilterBox onFilterChange={mockApplyFilters} airlines={["Airline A", "Airline B"]} />);

    beforeEach(() => {
        cleanup();
        renderComponent();
    });

    test('Max Price Button and Toggle Menu Functions as expected', async () => {
        const user = userEvent.setup();

        const maxPriceButton = screen.getByTestId('filter-button-1');

        expect(maxPriceButton).toBeVisible();

        // Simulate opening the dropdown
        await user.click(maxPriceButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        expect(dropdownList).toBeInTheDocument();

        const option = screen.getByTestId('dropdown-selection-0');
        
        // Select the first option
        await user.click(option);
        expect(maxPriceButton).toHaveTextContent('$200');

        // Click the button again to close the dropdown
        fireEvent.click(maxPriceButton);
        expect(dropdownList).not.toBeInTheDocument();

    });
    test('Stops Button and Toggle Menu Functions as expected', async () => {
        const user = userEvent.setup();

        const maxPriceButton = screen.getByTestId('filter-button-2');

        expect(maxPriceButton).toBeVisible();

        // Simulate opening the dropdown
        await user.click(maxPriceButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        expect(dropdownList).toBeInTheDocument();

        const option = screen.getByTestId('dropdown-selection-0');

        // Select the first option
        await user.click(option);
        expect(maxPriceButton).toHaveTextContent('0');

        // Click the button again to close the dropdown
        fireEvent.click(maxPriceButton);
        expect(dropdownList).not.toBeInTheDocument();

    });
    test('Departure Time Button and Toggle Menu Functions as expected', async () => {
        const user = userEvent.setup();

        const maxPriceButton = screen.getByTestId('filter-button-3');

        expect(maxPriceButton).toBeVisible();

        // Simulate opening the dropdown
        await user.click(maxPriceButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        expect(dropdownList).toBeInTheDocument();

        const option = screen.getByTestId('dropdown-selection-0');

        // Select the first option
        await user.click(option);
        expect(maxPriceButton).toHaveTextContent('Morning');

        // Click the button again to close the dropdown
        await user.click(maxPriceButton);
        expect(dropdownList).not.toBeInTheDocument();

    });
    test('Arrival Button and Toggle Menu Functions as expected', async () => {
        const user = userEvent.setup();
        
        const maxPriceButton = screen.getByTestId('filter-button-4');

        expect(maxPriceButton).toBeVisible();

        // Simulate opening the dropdown
        await user.click(maxPriceButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        expect(dropdownList).toBeInTheDocument();

        const option = screen.getByTestId('dropdown-selection-0');

        // Select the first option
        await user.click(option);
        expect(maxPriceButton).toHaveTextContent('Morning');

        // Click the button again to close the dropdown
        await user.click(maxPriceButton);
        expect(dropdownList).not.toBeInTheDocument();

    });
    test('Airline Button and Toggle Menu Functions as expected', async () => {
        const maxPriceButton = screen.getByTestId('filter-button-5');

        const user = userEvent.setup();
        
        await waitFor(() => {
            expect(maxPriceButton).toBeVisible();
        });

        // Simulate opening the dropdown
        await user.click(maxPriceButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        await waitFor(() => {
            expect(dropdownList).toBeInTheDocument();
          });

        const option = screen.getByTestId('dropdown-selection-0');

        // Select the first option
        await user.click(option)

        await waitFor(() => {
            expect(maxPriceButton).toHaveTextContent('Airline A');
          });


        // Click the button again to close the dropdown
        await act(async () => {
            fireEvent.click(maxPriceButton);
        });
        await waitFor(() => {
            expect(dropdownList).not.toBeInTheDocument();
          });

    });
    test('calls onOptionSelect for a filter button component with null when reset is clicked', async () => {
        render(
            <FilterButton
                mainTextRight="Max Price"
                options={['Option 1', 'Option 2', 'Option 3']}
                dataTestId="filter-button-6"
                onOptionSelect={mockOnOptionSelect}
                selectedOption={null}
            />
        );

        const user = userEvent.setup();

        // Open the dropdown
        await user.click(screen.getByTestId('filter-button-6'));

        // Click on reset option
        await user.click(screen.getByTestId('reset-button'));

        await waitFor(() => {
            expect(mockOnOptionSelect).toHaveBeenCalledWith(null);
          });
    });
    test('Search Button Adjusts Filter Functions as expected', async () => {
        const searchButton = screen.getByTestId('search-button');
        expect(searchButton).toBeVisible();

        fireEvent.click(searchButton);
        expect(mockApplyFilters).toHaveBeenCalled();

    });
}); 