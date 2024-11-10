import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeatBooking from "@/components/SeatBooking";
import SeatBookingForm from "@/components/SeatBookingForm";
import '@testing-library/jest-dom';
import { fetchFlightSeats } from "@/api/FetchFlightSeats"
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";
import { mockUseTripStore, mockUseLoaderStore, mockTripData, mockTripDataOther } from '@/components/__tests__/__mocks__/storeMocks';

const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
  }),
}));

jest.mock('@/context/TripContext', () => ({
  useTripStore: jest.fn(() => mockUseTripStore),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoaderStore: jest.fn(() => mockUseLoaderStore),
}));

jest.mock("@/components/SeatSelection/Airplane", () => {
  const onSeatClickMock = jest.fn();

  const MockAirplane = (props: { onSeatClick: (seatNumber: number) => void }) => (
    <div>
      <div
        data-testid="airplane-seat-1"
        onClick={() => {
          props.onSeatClick(1);
          onSeatClickMock();
        }}
      >
        Mock Airplane Seat 1
      </div>
      <div
        data-testid="airplane-seat-2"
        onClick={() => {
          props.onSeatClick(2);
          onSeatClickMock();
        }}
      >
        Mock Airplane Seat 1
      </div>
    </div>
  );

  MockAirplane.displayName = "Airplane";
  return {
    __esModule: true,
    default: MockAirplane,
    onSeatClickMock
  };
});

jest.mock('@/api/FetchFlightSeats', () => ({
  fetchFlightSeats: jest.fn().mockResolvedValue({
    guid: "mock-guid",
    seats_available: 2,
    flight_id: "mock-flight-id",
    seat_configuration: [
      {
        seat_id: 1,
        type: "Economy",
        position: "Window",
        available: true,
      },
      {
        seat_id: 2,
        type: "Economy",
        position: "Middle",
        available: true,
      },
    ],
  }),
}));

/**
 * Test File: SeatBooking Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the SeatBooking component.
 * - The SeatBooking component includes:
 *      - Properly rendering the header and airplane components.
 *      - Correctly updating the layout and selected seat state.
 *
 * Test Cases:
 * 1. Renders the SeatBooking component.
 *    - Expectation: The SeatBooking component should render the header and airplane components correctly.
 *
 * 2. Selecting a seat should show the seat selection form.
 *    - Expectation: Clicking a seat should show the seat selection form.
 *
 * 3. Deselecting a seat should hide the seat selection from.
 *    - Expectation: Clicking the same seat twice should deselect it and hide the seat selection form.
 */

describe("SeatBooking Component", () => {
  let consoleErrorMock: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTripStore.setState(mockTripData)
    
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
      if (typeof message === 'string' && message.includes("findDOMNode is deprecated")) {
        return; // Ignore this specific warning
      }
      console.error(message, ...args); // Allow other warnings to be logged
    });
  });
  
  const renderComponent = () => render(<SeatBooking />);

  test("Renders the SeatBooking component", async () => {
    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    } );

    // Assert: Check if the header and airplane components are rendered
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toBeInTheDocument();
      expect(screen.getByTestId("airplane-svg")).toBeInTheDocument();
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });
  });

  test("Selecting a seat should show the seat selection form", async () => {
    const { onSeatClickMock } = jest.requireMock("@/components/SeatSelection/Airplane");

    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    });

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Ensure that the seat is selected and the seat selection form is shown, i.e. width changes to 2/4
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");
      expect(screen.getByTestId("booking-form-column")).toHaveClass("w-4/7");
    });
  });

  test("Deselecting a seat should hide the seat selection from", async () => {
    const { onSeatClickMock } = jest.requireMock("@/components/SeatSelection/Airplane");
    
    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    });

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Click a seat to select it
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Check that the seat is selected
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");
    });

    // Act: Click the same seat again to deselect it
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Check that the seat is deselected and the seat selection form is hidden i.e. reverts to full width
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-full");
      expect(screen.queryByTestId("booking-form-column")).not.toBeInTheDocument()
    });
  });

  //new
  test("Initializes groupSize correctly based on tripData", async () => {
    // Arrange: Set mock trip data with 2 passengers
    await act(async () => {
      mockUseTripStore.getState().tripData = {
        ...mockUseTripStore.getState().tripData
      };
    });
  
    // Act: Render the component
    await act(async () => {
      render(<SeatBooking />);
    });
  
    // Assert: Check that groupSize is correctly initialized to 2
    const groupSize = screen.getByTestId("group-size");
    expect(groupSize).toHaveTextContent("2");
  });

  test("Cancel button navigates back", async () => {
    const router = require("next/navigation").useRouter();

    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Assert: Ensure that the cancel button is visible
    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);

    // Assert: Ensure that router.back was called
    expect(mockBack).toHaveBeenCalled();
  });

  test("Error in fetchFlightSeats logs an error message", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (fetchFlightSeats as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch seats"));

    render(<SeatBooking />);
    
    await act(async () => {
      await fetchFlightSeats("mock-flight-id"); 
    });

    expect(console.error).toHaveBeenCalledWith("Error fetching seat data:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  test("Updates formData correctly with updateFormData function", async () => {
    await act(async () => {
      renderComponent();
    });

    // Initial form data for the first passenger
    const initialName = screen.getByTestId("passenger-index").textContent;
    expect(initialName).toContain("Passenger Index: 0");

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Update formData using the internal updateFormData function
    const updatedName = "Jane Doe";
    act(() => {
      fireEvent.change(screen.getByTestId("form-field-first-name"), { target: { value: updatedName } });
    });

    const formName = (screen.getByTestId("form-field-first-name") as HTMLInputElement).value;
    expect(formName).toBe(updatedName);
  });

  test("Returns early in handleFormSubmit if tripData.trip is undefined", async () => {
    mockUseTripStore.tripData.trip = null;
    renderComponent();

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("next-passenger-button"));
    });

    expect(mockUseLoaderStore.showLoader).not.toHaveBeenCalled();
  });

  test("Executes full handleFormSubmit flow and reserves seat", async () => {
    await act(async () => {
      mockUseTripStore.getState().tripData = {
        ...mockUseTripStore.getState().tripData
      };
    });

    render(<SeatBooking />)

    // Departing Flight
    // First Passenger
    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });


    // Act: Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("next-passenger-button"));
    });

    // Assert: Ensure seat is updated
    expect(mockUseTripStore.tripData.trip?.passengers[0].departing_seat_id).toBe(1);

    // Second Passenger
    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-2")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-2"));
    });

    // Select the Same as Passenger 1 checkbox
    await act(async () => {
      fireEvent.click(screen.getByTestId("form-field-checkbox-same-as-first"));
    });

    // Act: Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("book-return-flight-button"));
    });

    // Assert: Ensure seat is updated
    expect(mockUseTripStore.tripData.trip?.passengers[1].departing_seat_id).toBe(2);

    // Returning Flight
    // First Passenger
    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });


    // Act: Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("next-passenger-button"));
    });

    // Assert: Ensure seat is updated
    expect(mockUseTripStore.tripData.trip?.passengers[0].returning_seat_id).toBe(1);

    // Second Passenger
    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-2")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-2"));
    });

    // Select the Same as Passenger 1 checkbox
    await act(async () => {
      fireEvent.click(screen.getByTestId("form-field-checkbox-same-as-first"));
    });
    // Deselect the Same as Passenger 1 checkbox
    await act(async () => {
      fireEvent.click(screen.getByTestId("form-field-checkbox-same-as-first"));
    });

    // Act: Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("checkout-button"));
    });

    // Assert: Ensure seat is updated
    expect(mockUseTripStore.tripData.trip?.passengers[1].returning_seat_id).toBe(2);
  });

  test("Executes full handleFormSubmit flow and reserves seat", async () => {
    await act(async () => {
      mockUseTripStore.getState().tripData = {
        ...mockUseTripStore.getState().tripData
      };
    });

    const user = userEvent.setup();

    render(<SeatBooking />)

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Open the popover to display the calendar
    const popoverTrigger = screen.getByTestId("form-field-calender-button");
    await user.click(popoverTrigger);

    // Verify that the calendar is visible
    await waitFor(() => {
      expect(screen.getByTestId("form-field-dob")).toBeInTheDocument();
    });

    // Select a date on the calendar
    const dateButton = screen.getByText("5");
    await user.click(dateButton);
  });

  test("Updates formData with numeric value for apartment number", async () => {
    // Arrange: Render the SeatBooking component
    render(<SeatBooking />);

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });
  
    // Act: Find the apartment number input field
    const aptNumberInput = screen.getByTestId("form-field-apt-number");
    
    // Act: Simulate entering a value in the apartment number field
    fireEvent.change(aptNumberInput, { target: { value: "123", name: "aptNumber" } });
  });

  test("Inital formData with undefined values", async () => {
    await act(async () => {
      mockUseTripStore.setState(mockTripDataOther)
    });

    // Arrange: Render the SeatBooking component
    render(<SeatBooking />);

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat-1")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat-1"));
    });

    // Act: get the zip code input field
    const zipCodeInput = screen.getByTestId("form-field-zip") as HTMLInputElement;
    
    // Check the initial value
    expect(zipCodeInput.value).toBe("");
  });

});
