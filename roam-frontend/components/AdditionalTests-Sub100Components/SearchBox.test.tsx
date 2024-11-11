import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchStore } from '@/context/SearchContext';
import SearchBox from '@/components/SearchBox';
import { mockArrivalAirport, mockArrivalAirportOther, mockDepartureAirport } from '../__tests__/__mocks__/storeMocks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Calendar } from '@/components/ui/calendar'; // Adjust the import path as needed
import { PopoverContent } from '@radix-ui/react-popover'; // Adjust the import as needed

// Mock function for setSearchData
const setSearchDataMock = jest.fn();

// Mocking Zustand store
jest.mock('@/context/SearchContext', () => ({
    useSearchStore: jest.fn(),
}));

// Mocking the useRouter hook from next/router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('SearchBox', () => {
    const setSearchDataMock = jest.fn();
    const showRequiredFieldPopupMock = jest.fn();
    const pushMock = jest.fn();

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        const showRequiredFieldPopupMock = jest.fn()
        // Mock the useSearchStore and useRouter hooks
        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as jest.MockedFunction<typeof useSearchStore>;
        useSearchStoreMock.mockImplementation(() => ({
            searchData: {
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureDate: '2024-12-01',
                returnDate: '2024-12-15',
                isRoundTrip: true,
                passengers: 1,
                seatTypeMapping: { 0: 'Business' },
            },
            setSearchData: setSearchDataMock,
        }));

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });
    });

    it('should update departure airport when DEPARTURE CITY button is clicked', () => {
        // Mocking the Zustand store behavior

        const useSearchStoreMock = useSearchStore as jest.MockedFunction<typeof useSearchStore>;
        useSearchStoreMock.mockImplementation(() => ({
            searchData: {
                departureAirport: null,  // Initially, no departure airport selected
                arrivalAirport: null,
                departureDate: null,
                returnDate: null,
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        }));

        // Mock the useRouter hook to return a mock object
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        // Render the SearchBox with mock airports
        render(<SearchBox airports={[mockDepartureAirport, mockArrivalAirport]} showRequiredFieldPopup={jest.fn()} />);

        // Find all elements with the text 'Select City' and click the first one
        const selectCityButtons = screen.getAllByText(/Select City/i);
        fireEvent.click(selectCityButtons[0]);  // Click the first match


        // Find the toggle option for selecting a departure airport (based on its IATA code or short name)
        const selectDepartureAirport = screen.getByText(/JFK/i);

        // Simulate selecting the airport
        fireEvent.click(selectDepartureAirport);

        // Verify that setSearchData was called with the correct departure airport
        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            departureAirport: expect.objectContaining({
                iata_code: mockDepartureAirport.iata_code,
                municipality_name: mockDepartureAirport.municipality_name,
                short_name: mockDepartureAirport.short_name,
            }),
        }));
    });

    it('should call showRequiredFieldPopup for missing departure airport', async () => {
        // Mock the search data with missing departure airport
        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: null,  // Initially, no departure airport selected
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: { 0: 'Economy' },
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Departure City");
        });
    });
    it('should call showRequiredFieldPopup for missing arrival airport', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: null,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Arrival City");
        });
    });

    it('should call showRequiredFieldPopup for missing departure Data', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: null,
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Departure Date");
        });
    });
    it('should call showRequiredFieldPopup for missing Arrival Date', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-05',
                returnDate: null,
                seatTypeMapping: { 0: "Economy", 1: "Business" },
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Return Date");
        });
    });

    it('should call showRequiredFieldPopup for null Passengers', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-05',
                returnDate: '2024-12-06',
                seatTypeMapping: { 0: "Economy", 1: "Business" },
                passengers: null,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Passengers");
        });
    });

    it('should call showRequiredFieldPopup for 0 Passengers', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-05',
                returnDate: '2024-12-06',
                seatTypeMapping: { 0: "Economy", 1: "Business" },
                passengers: 0,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(showRequiredFieldPopupMock).toHaveBeenCalledWith("Passengers");
        });
    });

    it('should not call showRequiredPopup with all valid search data', async () => {

        const setSearchDataMock = jest.fn();
        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-05',
                returnDate: '2024-12-06',
                seatTypeMapping: { 0: "Economy", 1: "Business" },
                passengers: 2,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Render the SearchBox component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}  // Ensure it's passed here
            />
        );

        // Simulate clicking the "Search Flights" button
        fireEvent.click(screen.getByText('Search Flights'));  // Assuming 'Search' is the button text

        // Wait for the mock function to be called
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/search-results');
        });
    });

    it('should update arrival airport and leave departure airport unchanged if arrival is different from departure', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: null,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });


        // Render the component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        // Simulate selecting a new arrival airport
        const arrivalAirportButton = screen.getByText('Select City'); // Assuming "LAX" is one of the airports
        fireEvent.click(arrivalAirportButton);

        const newArrivalAirport = await screen.getByText(/LAX/i);
        fireEvent.click(newArrivalAirport);

        const expectedArrivalAirport = mockArrivalAirport; // The object corresponding to the selected airport

        // Verify that setSearchData was called with the updated arrival airport and unchanged departure airport
        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            arrivalAirport: expectedArrivalAirport,      // Ensure arrival airport is updated with the correct object
            departureAirport: mockDepartureAirport,     // Ensure departure airport remains unchanged
        }));
    });


    it('Swap Airports', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const swapButton = screen.getByTestId('swap-button');
        fireEvent.click(swapButton);


        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            arrivalAirport: mockDepartureAirport,
            departureAirport: mockArrivalAirport,
        }));
    });

    it('Update Passenger Count', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const passengerButton = screen.getByText('Business');
        fireEvent.click(passengerButton);

        const addPassengerButton = screen.getByTestId('add-passenger')
        fireEvent.click(addPassengerButton)

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            passengers: 2,
        }));

    });

    it('Remove Passengers', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: '2024-12-01',
                returnDate: null,
                seatTypeMapping: {},
                passengers: 2,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const passengerButton = screen.getByText('Business');
        fireEvent.click(passengerButton);

        const removePassengerButton = screen.getByTestId('remove-passenger')
        fireEvent.click(removePassengerButton)

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            passengers: 1,
            returnDate: null,
        }));
    });

    it('Update Passenger Class', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: mockArrivalAirport,
                departureDate: null,
                returnDate: '2024-12-05',
                seatTypeMapping: { 0: "Business" },
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });

        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const passengerClassButton = screen.getByText('Business');
        fireEvent.click(passengerClassButton);

        // Open current class and select a new class
        const currentClassButton = screen.getByTestId('passenger-class-0');
        fireEvent.click(currentClassButton);

        const newClassButton = screen.getByTestId('economy-class-choice-0');
        fireEvent.click(newClassButton);

        const newSeatMapping = { 0: "Economy" };

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            seatTypeMapping: newSeatMapping,
            departureDate: null,
        }));
    });

    it('Select one way hump button', async () => {
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: mockDepartureAirport,
                arrivalAirport: null,
                departureDate: '2024-12-01',
                returnDate: '2024-12-05',
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });


        // Render the component
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const oneWayButton = screen.getByText('One Way');
        fireEvent.click(oneWayButton);

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            isRoundTrip: false,
        }));

        const oneWayDepart = screen.getByText('DEPARTURE DATE');
        fireEvent.click(oneWayDepart)

        const selectedDate = screen.getByText('3')
        fireEvent.click(selectedDate)

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            departureDate: new Date('2024-11-03T04:00:00.000Z'),
        }));

        // Deselect the date (click on the same date again)

        const roundTripButton = screen.getByText('Round Trip');
        fireEvent.click(roundTripButton);

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            isRoundTrip: true,
        }));

        const roundTripDepart = screen.getByText('DEPARTURE DATE');
        fireEvent.click(oneWayDepart)

        const roundTripSelectedDepartDate = screen.getByText('1')
        fireEvent.click(roundTripSelectedDepartDate)

        expect(setSearchDataMock).toHaveBeenCalledWith(expect.objectContaining({
            departureDate: '2024-12-01',
        }));


    });

    describe('Calendar Component', () => {
        test('calls setSearchData with selected departuredate', () => {
            // Initial state for searchData
            const searchData = { departureDate: null };
            const setSearchDataMock = jest.fn();

            const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
            (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
                searchData: {
                    departureAirport: null,
                    arrivalAirport: null,
                    departureDate: null,
                    returnDate: null,
                    seatTypeMapping: {},
                    passengers: 1,
                    isRoundTrip: false,
                    selectedAirlines: [],
                },
                setSearchData: setSearchDataMock,
            });
            // Render your component with mocked setSearchData
            render(
                <SearchBox
                    airports={[mockDepartureAirport, mockArrivalAirport]}
                    showRequiredFieldPopup={showRequiredFieldPopupMock}
                />
            );

            const oneWayDepart = screen.getByText('DEPARTURE DATE');
            fireEvent.click(oneWayDepart)

            // Simulate clicking on a date, e.g., 5th November 2024
            const selectedDate = screen.getByText('5'); // Adjust this depending on your calendar rendering

            // Simulate the click
            fireEvent.click(selectedDate);

            // Optionally, check if the departureDate is set correctly
            expect(setSearchDataMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    departureDate: new Date('2024-11-05T05:00:00.000Z'), // Adjust the date format to match your logic
                })
            );


        });

    });
    test('calls setSearchData with selected return date', () => {
        // Initial state for searchData
        const searchData = { departureDate: null };
        const setSearchDataMock = jest.fn();

        const useSearchStoreMock = useSearchStore as unknown as jest.Mock<typeof useSearchStore>;
        (useSearchStoreMock as jest.Mock).mockReturnValueOnce({
            searchData: {
                departureAirport: null,
                arrivalAirport: null,
                departureDate: null,
                returnDate: null,
                seatTypeMapping: {},
                passengers: 1,
                isRoundTrip: true,
                selectedAirlines: [],
            },
            setSearchData: setSearchDataMock,
        });
        // Render your component with mocked setSearchData
        render(
            <SearchBox
                airports={[mockDepartureAirport, mockArrivalAirport]}
                showRequiredFieldPopup={showRequiredFieldPopupMock}
            />
        );

        const roundTripReturn = screen.getByText('RETURN DATE');
        fireEvent.click(roundTripReturn)

        // Simulate clicking on a date, e.g., 5th November 2024
        const selectedDate = screen.getByText('5'); // Adjust this depending on your calendar rendering

        // Simulate the click
        fireEvent.click(selectedDate);

        // Optionally, check if the departureDate is set correctly
        expect(setSearchDataMock).toHaveBeenCalledWith(
            expect.objectContaining({
                returnDate: new Date('2024-11-05T05:00:00.000Z'), // Adjust the date format to match your logic
            })
        );


    });

});
