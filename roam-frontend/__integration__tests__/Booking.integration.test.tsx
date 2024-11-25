import React from "react";
import { render, screen, fireEvent, act, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeatBookingPage from "@/app/seat-booking/page";
import '@testing-library/jest-dom';
import { fetchFlightSeats } from "@/api/FetchFlightSeats";
import { mockTripData } from "@/components/__tests__/__mocks__/storeMocks";

import { useTripStore } from "@/context/TripContext";

const mockBack = jest.fn();
const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
  }),
}));

jest.mock('@/api/FetchFlightSeats', () => ({
  fetchFlightSeats: jest.fn().mockResolvedValue({
    guid: "mock-guid",
    seats_available: 1,
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
        position: "Aisle",
        available: true,
      },
    ],
  }),
}));


/**
 * Test File: SeatBooking Component
 *
 */
describe("SeatBookingPage Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("redirects to home when trip booking is inactive", async () => {
    // Supress finDOMNode console warning for this specfic test by mocking console.error
    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('findDOMNode is deprecated')) {
        return; // Ignore this specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });

    act(() => {
      const { setTripData } = useTripStore.getState();
      setTripData((prev) => ({
        ...prev,
        trip_booking_active: false,
      }));
    });

    render(<SeatBookingPage />);

    // Assert: Ensure that router.replace was called with "/"
    await waitFor(() => {
      const { tripData } = useTripStore.getState();
      expect(tripData.trip_booking_active).toBe(false);
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  test("allows selecting seats and submitting form for passengers", async () => {
    // === SETUP & MOCKING ===
    // Suppress finDOMNode console warning
    const originalConsoleError = console.error;
    jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
      if (msg.includes("findDOMNode is deprecated")) return; // Ignore specific warning
      originalConsoleError.call(console, msg, ...args);
    });

    // Mock next/navigation useRouter
    const router = require("next/navigation").useRouter();

    // Arrange: Set initial trip data in the store
    act(() => {
      const { setTripData } = useTripStore.getState();
      setTripData(mockTripData);
    });

    await waitFor(() => {
      const { tripData } = useTripStore.getState();
      expect(tripData.trip).not.toBeNull();
      expect(tripData.trip?.guid).toEqual("trip-guid");
    });

    // Use fake timers for controlled async operations
    jest.useFakeTimers();
    // === RENDER COMPONENT ===
    // Arrange: Render SeatBookingPage and verify initial state
    const user = userEvent.setup();
    const { container } = render(<SeatBookingPage delay={0} />);
    const { tripData: initialTripData } = useTripStore.getState();

    // Assert: Ensure initial trip states are set correctly
    expect(initialTripData.trip_booking_active).toBe(true);
    expect(initialTripData.trip_purchased).toBe(false);

    // Act: Advance timers for rendering effects
    await act(async () => {
      jest.advanceTimersByTime(800);
    });

    // Assert: Ensure seat booking page and initial elements are present
    await waitFor(() => {
      expect(screen.getByTestId("seat-booking")).toBeInTheDocument();
      expect(fetchFlightSeats).toHaveBeenCalledWith("flight-guid");
      expect(screen.getByTestId("seat-1-available")).toBeInTheDocument();
    });

    // === DEPARTURE FLIGHT ===
    // === FIRST PASSENGER SEAT SELECTION & FORM FILLING ===
    // Act: Select the first seat
    const seatDeparture1 = screen.getByTestId("seat-1-available");
    await act(async () => {
      fireEvent.click(seatDeparture1);
    });

    // Assert: Ensure booking form is displayed
    expect(screen.getByTestId("booking-form-column")).toBeInTheDocument();

    // Assert Form Header Details Match
    await waitFor(() => {
      // Check departure city button text
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("JFK");
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("New York");
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("JFK Airport");
      // Check arrival city button text
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("LAX");
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("Los Angeles");
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("LAX Airport");
      // Check departure date button text
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("Mon");
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("December");
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("25");
      // Check travelers and class button text
      expect(screen.getByTestId("traveller-class-button")).toHaveTextContent("2");
    });

    // Fill in form details
    const firstPassengerDetails = {
      firstName: "John",
      middleName: "James",
      lastName: "Doe",
      prefix: "Mr",
      passportNumber: "20344883",
      knownTravellerNumber: "88664754",
      email: "johnjamesdoe@email.com",
      phone: "0000000000",
      address: "1 Main Street",
      aptNumber: "",
      province: "Ontario",
      zipCode: "K7L 1A1",
      emergFirstName: "Janette",
      emergLastName: "Doe",
      emergEmail: "janettedoe@email.com",
      emergPhone: "0000000000",
    };

    // Act: Fill in passenger form
    fireEvent.change(screen.getByTestId("form-field-first-name"), { target: { value: firstPassengerDetails.firstName } });
    fireEvent.change(screen.getByTestId("form-field-middle-name"), { target: { value: firstPassengerDetails.middleName } });
    fireEvent.change(screen.getByTestId("form-field-last-name"), { target: { value: firstPassengerDetails.lastName } });
    fireEvent.change(screen.getByTestId("form-field-prefix"), { target: { value: firstPassengerDetails.prefix } });
    fireEvent.change(screen.getByTestId("form-field-passport-number"), { target: { value: firstPassengerDetails.passportNumber } });
    fireEvent.change(screen.getByTestId("form-field-known-traveller-number"), { target: { value: firstPassengerDetails.knownTravellerNumber } });
    fireEvent.change(screen.getByTestId("form-field-email"), { target: { value: firstPassengerDetails.email } });
    fireEvent.change(screen.getByTestId("form-field-phone"), { target: { value: firstPassengerDetails.phone } });
    fireEvent.change(screen.getByTestId("form-field-address"), { target: { value: firstPassengerDetails.address } });
    fireEvent.change(screen.getByTestId("form-field-apt-number"), { target: { value: firstPassengerDetails.aptNumber } });
    fireEvent.change(screen.getByTestId("form-field-province"), { target: { value: firstPassengerDetails.province } });
    fireEvent.change(screen.getByTestId("form-field-zip"), { target: { value: firstPassengerDetails.zipCode } });
    fireEvent.change(screen.getByTestId("form-field-emerg-first-name"), { target: { value: firstPassengerDetails.emergFirstName } });
    fireEvent.change(screen.getByTestId("form-field-emerg-last-name"), { target: { value: firstPassengerDetails.emergLastName } });
    fireEvent.change(screen.getByTestId("form-field-emerg-email"), { target: { value: firstPassengerDetails.emergEmail } });
    fireEvent.change(screen.getByTestId("form-field-emerg-phone"), { target: { value: firstPassengerDetails.emergPhone } });

    // Assert: Verify footer details match input
    await waitFor(() => {
      expect(screen.getByTestId("footer-seat-number")).toHaveTextContent("1");
      expect(screen.getByTestId("footer-passenger-name")).toHaveTextContent(`${firstPassengerDetails.firstName} ${firstPassengerDetails.lastName}`);
    });

    // Act: Submit the form for the first passenger
    const nextPassengerButton = screen.getByTestId("next-passenger-button");
    await act(async () => {
      fireEvent.click(nextPassengerButton);
    });

    // Assert: Verify the first passenger's data is stored correctly
    const { tripData: firstPassengerFirstFlightData } = useTripStore.getState();
    let firstPassenger = firstPassengerFirstFlightData.trip?.passengers[0];
    expect(firstPassenger?.name).toBe(firstPassengerDetails.firstName);
    expect(firstPassenger?.middle).toBe(firstPassengerDetails.middleName);
    expect(firstPassenger?.last).toBe(firstPassengerDetails.lastName);
    expect(firstPassenger?.prefix).toBe(firstPassengerDetails.prefix);
    expect(firstPassenger?.passport_number).toBe(firstPassengerDetails.passportNumber);
    expect(firstPassenger?.known_traveller_number).toBe(firstPassengerDetails.knownTravellerNumber);
    expect(firstPassenger?.email).toBe(firstPassengerDetails.email);
    expect(firstPassenger?.phone).toBe(firstPassengerDetails.phone);
    expect(firstPassenger?.street_address).toBe(firstPassengerDetails.address);
    expect(firstPassenger?.apt_number).toBe(firstPassengerDetails.aptNumber);
    expect(firstPassenger?.province).toBe(firstPassengerDetails.province);
    expect(firstPassenger?.zip_code).toBe(firstPassengerDetails.zipCode);
    expect(firstPassenger?.emerg_name).toBe(firstPassengerDetails.emergFirstName);
    expect(firstPassenger?.emerg_last).toBe(firstPassengerDetails.emergLastName);
    expect(firstPassenger?.emerg_email).toBe(firstPassengerDetails.emergEmail);
    expect(firstPassenger?.emerg_phone).toBe(firstPassengerDetails.emergPhone);

    await waitFor(() => {
      expect(screen.getByTestId("seat-1-reserved")).toBeInTheDocument();
      expect(screen.getByTestId("seat-2-available")).toBeInTheDocument();
    });

    // === SECOND PASSENGER SEAT SELECTION & FORM FILLING ===
    // Act: Select the second seat
    const seatDeparture2 = screen.getByTestId("seat-2-available");
    await act(async () => {
      fireEvent.click(seatDeparture2);
    });

    // Fill in form details for the second passenger
    const secondPassengerDetails = {
      firstName: "Chris",
      middleName: "John",
      lastName: "Doe",
      prefix: "Dr",
      passportNumber: "20344884",
      knownTravellerNumber: "88745652",
      email: "chrisjohndoe@email.com",
      phone: "0000000000",
      address: "3 Main Street",
      aptNumber: "",
      province: "Ontario",
      zipCode: "K7L 2A2",
      emergFirstName: "Janette",
      emergLastName: "Doe",
      emergEmail: "janettedoe@email.com",
      emergPhone: "0000000000",
    };

    fireEvent.change(screen.getByTestId("form-field-first-name"), { target: { value: secondPassengerDetails.firstName } });
    fireEvent.change(screen.getByTestId("form-field-middle-name"), { target: { value: secondPassengerDetails.middleName } });
    fireEvent.change(screen.getByTestId("form-field-last-name"), { target: { value: secondPassengerDetails.lastName } });
    fireEvent.change(screen.getByTestId("form-field-prefix"), { target: { value: secondPassengerDetails.prefix } });
    fireEvent.change(screen.getByTestId("form-field-passport-number"), { target: { value: secondPassengerDetails.passportNumber } });
    fireEvent.change(screen.getByTestId("form-field-known-traveller-number"), { target: { value: secondPassengerDetails.knownTravellerNumber } });
    fireEvent.change(screen.getByTestId("form-field-email"), { target: { value: secondPassengerDetails.email } });
    fireEvent.change(screen.getByTestId("form-field-phone"), { target: { value: secondPassengerDetails.phone } });
    fireEvent.change(screen.getByTestId("form-field-address"), { target: { value: secondPassengerDetails.address } });
    fireEvent.change(screen.getByTestId("form-field-apt-number"), { target: { value: secondPassengerDetails.aptNumber } });
    fireEvent.change(screen.getByTestId("form-field-province"), { target: { value: secondPassengerDetails.province } });
    fireEvent.change(screen.getByTestId("form-field-zip"), { target: { value: secondPassengerDetails.zipCode } });
    fireEvent.click(screen.getByTestId("form-field-checkbox-same-as-first"));

    await waitFor(() => {
      expect(screen.getByTestId("form-field-emerg-first-name")).toHaveValue(secondPassengerDetails.emergFirstName);
      expect(screen.getByTestId("form-field-emerg-last-name")).toHaveValue(secondPassengerDetails.emergLastName);
      expect(screen.getByTestId("form-field-emerg-email")).toHaveValue(secondPassengerDetails.emergEmail);
      expect(screen.getByTestId("form-field-emerg-phone")).toHaveValue(secondPassengerDetails.emergPhone);
    });

    // Assert: Footer updates correctly
    await waitFor(() => {
      expect(screen.getByTestId("footer-seat-number")).toHaveTextContent("2");
      expect(screen.getByTestId("footer-passenger-name")).toHaveTextContent(`${secondPassengerDetails.firstName} ${secondPassengerDetails.lastName}`);
    });


    // Submit the form for the second passenger
    const returnFlightButton = screen.getByTestId("book-return-flight-button");
    await act(async () => {
      fireEvent.click(returnFlightButton);
    });

    /// Assert: Verify the first passenger's data is stored correctly
    const { tripData: secondPassengerFirstFlightData } = useTripStore.getState();
    let secondPassenger = secondPassengerFirstFlightData.trip?.passengers[1];
    expect(secondPassenger?.name).toBe(secondPassengerDetails.firstName);
    expect(secondPassenger?.middle).toBe(secondPassengerDetails.middleName);
    expect(secondPassenger?.last).toBe(secondPassengerDetails.lastName);
    expect(secondPassenger?.prefix).toBe(secondPassengerDetails.prefix);
    expect(secondPassenger?.passport_number).toBe(secondPassengerDetails.passportNumber);
    expect(secondPassenger?.known_traveller_number).toBe(secondPassengerDetails.knownTravellerNumber);
    expect(secondPassenger?.email).toBe(secondPassengerDetails.email);
    expect(secondPassenger?.phone).toBe(secondPassengerDetails.phone);
    expect(secondPassenger?.street_address).toBe(secondPassengerDetails.address);
    expect(secondPassenger?.apt_number).toBe(secondPassengerDetails.aptNumber);
    expect(secondPassenger?.province).toBe(secondPassengerDetails.province);
    expect(secondPassenger?.zip_code).toBe(secondPassengerDetails.zipCode);
    expect(secondPassenger?.emerg_name).toBe(secondPassengerDetails.emergFirstName);
    expect(secondPassenger?.emerg_last).toBe(secondPassengerDetails.emergLastName);
    expect(secondPassenger?.emerg_email).toBe(secondPassengerDetails.emergEmail);
    expect(secondPassenger?.emerg_phone).toBe(secondPassengerDetails.emergPhone);
    expect(secondPassenger?.departing_seat_id).toBe(2);

    // === RETURN FLIGHT ===
    // === FIRST PASSENGER SEAT SELECTION & FORM FILLING ===
    
    expect(screen.getByTestId("passenger-index")).toHaveTextContent("Passenger Index: 0")

    await waitFor(() => {
      expect(screen.queryByTestId("seat-1-reserved")).not.toBeInTheDocument();
      expect(screen.queryByTestId("seat-2-reserved")).not.toBeInTheDocument();
      expect(screen.getByTestId("seat-1-available")).toBeInTheDocument();
      expect(screen.getByTestId("seat-2-available")).toBeInTheDocument();
    });

    // Act: Select the first seat
    const seatReturn1 = screen.getByTestId("seat-1-available");
    await act(async () => {
      fireEvent.click(seatReturn1);
    });


    // Assert Form Header Details Match
    await waitFor(() => {
      // Check departure city button text
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("LAX");
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("Los Angeles");
      expect(screen.getByTestId("departure-city-button")).toHaveTextContent("LAX Airport");
      // Check arrival city button text
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("JFK");
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("New York");
      expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("JFK Airport");
      // Check departure date button text
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("Sun");
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("December");
      expect(screen.getByTestId("departure-date-button")).toHaveTextContent("31");
      // Check travelers and class button text
      expect(screen.getByTestId("traveller-class-button")).toHaveTextContent("2");
    });

    await waitFor(() => {
      expect(screen.getByTestId("form-field-first-name")).toHaveValue(firstPassengerDetails.firstName);
      expect(screen.getByTestId("form-field-middle-name")).toHaveValue(firstPassengerDetails.middleName);
      expect(screen.getByTestId("form-field-last-name")).toHaveValue(firstPassengerDetails.lastName);
      expect(screen.getByTestId("form-field-prefix")).toHaveValue(firstPassengerDetails.prefix);
      expect(screen.getByTestId("form-field-passport-number")).toHaveValue(firstPassengerDetails.passportNumber);
      expect(screen.getByTestId("form-field-known-traveller-number")).toHaveValue(firstPassengerDetails.knownTravellerNumber);
      expect(screen.getByTestId("form-field-email")).toHaveValue(firstPassengerDetails.email);
      expect(screen.getByTestId("form-field-phone")).toHaveValue(firstPassengerDetails.phone);
      expect(screen.getByTestId("form-field-address")).toHaveValue(firstPassengerDetails.address);
      expect(screen.getByTestId("form-field-apt-number")).toHaveValue(firstPassengerDetails.aptNumber);
      expect(screen.getByTestId("form-field-province")).toHaveValue(firstPassengerDetails.province);
      expect(screen.getByTestId("form-field-zip")).toHaveValue(firstPassengerDetails.zipCode);
      expect(screen.getByTestId("form-field-emerg-first-name")).toHaveValue(firstPassengerDetails.emergFirstName);
      expect(screen.getByTestId("form-field-emerg-last-name")).toHaveValue(firstPassengerDetails.emergLastName);
      expect(screen.getByTestId("form-field-emerg-email")).toHaveValue(firstPassengerDetails.emergEmail);
      expect(screen.getByTestId("form-field-emerg-phone")).toHaveValue(firstPassengerDetails.emergPhone);
    });
    

   // Assert: Verify footer details match input
   await waitFor(() => {
    expect(screen.getByTestId("footer-seat-number")).toHaveTextContent("1");
    expect(screen.getByTestId("footer-passenger-name")).toHaveTextContent(`${firstPassengerDetails.firstName} ${firstPassengerDetails.lastName}`);
  });

    // Submit the form for the first passenger
    const nextPassengerReturnFlightButton = screen.getByTestId("next-passenger-button");
    await act(async () => {
      fireEvent.click(nextPassengerReturnFlightButton);
    });


    const { tripData: secondFlightFirstPassengerTipData } = useTripStore.getState();
    firstPassenger = secondFlightFirstPassengerTipData.trip?.passengers[0];
    expect(firstPassenger?.name).toBe(firstPassengerDetails.firstName);
    expect(firstPassenger?.returning_seat_id).toBe(1);
    expect(firstPassenger?.middle).toBe(firstPassengerDetails.middleName);
    expect(firstPassenger?.last).toBe(firstPassengerDetails.lastName);
    expect(firstPassenger?.prefix).toBe(firstPassengerDetails.prefix);
    expect(firstPassenger?.passport_number).toBe(firstPassengerDetails.passportNumber);
    expect(firstPassenger?.known_traveller_number).toBe(firstPassengerDetails.knownTravellerNumber);
    expect(firstPassenger?.email).toBe(firstPassengerDetails.email);
    expect(firstPassenger?.phone).toBe(firstPassengerDetails.phone);
    expect(firstPassenger?.street_address).toBe(firstPassengerDetails.address);
    expect(firstPassenger?.apt_number).toBe(firstPassengerDetails.aptNumber);
    expect(firstPassenger?.province).toBe(firstPassengerDetails.province);
    expect(firstPassenger?.zip_code).toBe(firstPassengerDetails.zipCode);
    expect(firstPassenger?.emerg_name).toBe(firstPassengerDetails.emergFirstName);
    expect(firstPassenger?.emerg_last).toBe(firstPassengerDetails.emergLastName);
    expect(firstPassenger?.emerg_email).toBe(firstPassengerDetails.emergEmail);
    expect(firstPassenger?.emerg_phone).toBe(firstPassengerDetails.emergPhone);

    await waitFor(() => {
      expect(screen.getByTestId("seat-1-reserved")).toBeInTheDocument();
      expect(screen.getByTestId("seat-2-available")).toBeInTheDocument();
    });


    // === SECOND PASSENGER SEAT SELECTION & FORM FILLING ===
    // Act: Select the second seat
    const seatReturn2 = screen.getByTestId("seat-2-available");
    await act(async () => {
      fireEvent.click(seatReturn2);
    });

    await waitFor(() => {
      expect(screen.getByTestId("form-field-first-name")).toHaveValue(secondPassengerDetails.firstName);
      expect(screen.getByTestId("form-field-middle-name")).toHaveValue(secondPassengerDetails.middleName);
      expect(screen.getByTestId("form-field-last-name")).toHaveValue(secondPassengerDetails.lastName);
      expect(screen.getByTestId("form-field-prefix")).toHaveValue(secondPassengerDetails.prefix);
      expect(screen.getByTestId("form-field-passport-number")).toHaveValue(secondPassengerDetails.passportNumber);
      expect(screen.getByTestId("form-field-known-traveller-number")).toHaveValue(secondPassengerDetails.knownTravellerNumber);
      expect(screen.getByTestId("form-field-email")).toHaveValue(secondPassengerDetails.email);
      expect(screen.getByTestId("form-field-phone")).toHaveValue(secondPassengerDetails.phone);
      expect(screen.getByTestId("form-field-address")).toHaveValue(secondPassengerDetails.address);
      expect(screen.getByTestId("form-field-apt-number")).toHaveValue(secondPassengerDetails.aptNumber);
      expect(screen.getByTestId("form-field-province")).toHaveValue(secondPassengerDetails.province);
      expect(screen.getByTestId("form-field-zip")).toHaveValue(secondPassengerDetails.zipCode);
      expect(screen.getByTestId("form-field-emerg-first-name")).toHaveValue(secondPassengerDetails.emergFirstName);
      expect(screen.getByTestId("form-field-emerg-last-name")).toHaveValue(secondPassengerDetails.emergLastName);
      expect(screen.getByTestId("form-field-emerg-email")).toHaveValue(secondPassengerDetails.emergEmail);
      expect(screen.getByTestId("form-field-emerg-phone")).toHaveValue(secondPassengerDetails.emergPhone);
    });

    await waitFor(() => {
      expect(screen.getByTestId("footer-seat-number")).toHaveTextContent("2");
      expect(screen.getByTestId("footer-passenger-name")).toHaveTextContent(`${secondPassengerDetails.firstName} ${secondPassengerDetails.lastName}`);
    });

    // Act: Submit form
    const CheckoutButton = screen.getByTestId("checkout-button");
    await act(async () => {
      fireEvent.click(CheckoutButton);
    });

    const { tripData: secondFlightSecondPassengerTipData } = useTripStore.getState();
    firstPassenger = secondFlightSecondPassengerTipData.trip?.passengers[0];

    // Assert that the seat is reserved for the second passenger
    expect(firstPassenger?.name).toBe(firstPassengerDetails.firstName);
    expect(firstPassenger?.departing_seat_id).toBe(1);
    expect(firstPassenger?.returning_seat_id).toBe(1);
    expect(firstPassenger?.middle).toBe(firstPassengerDetails.middleName);
    expect(firstPassenger?.last).toBe(firstPassengerDetails.lastName);
    expect(firstPassenger?.prefix).toBe(firstPassengerDetails.prefix);
    expect(firstPassenger?.passport_number).toBe(firstPassengerDetails.passportNumber);
    expect(firstPassenger?.known_traveller_number).toBe(firstPassengerDetails.knownTravellerNumber);
    expect(firstPassenger?.email).toBe(firstPassengerDetails.email);
    expect(firstPassenger?.phone).toBe(firstPassengerDetails.phone);
    expect(firstPassenger?.street_address).toBe(firstPassengerDetails.address);
    expect(firstPassenger?.apt_number).toBe(firstPassengerDetails.aptNumber);
    expect(firstPassenger?.province).toBe(firstPassengerDetails.province);
    expect(firstPassenger?.zip_code).toBe(firstPassengerDetails.zipCode);
    expect(firstPassenger?.emerg_name).toBe(firstPassengerDetails.emergFirstName);
    expect(firstPassenger?.emerg_last).toBe(firstPassengerDetails.emergLastName);
    expect(firstPassenger?.emerg_email).toBe(firstPassengerDetails.emergEmail);
    expect(firstPassenger?.emerg_phone).toBe(firstPassengerDetails.emergPhone);

    // Assert that the seat is reserved for the first passenger
    secondPassenger = secondFlightSecondPassengerTipData.trip?.passengers[1];
    expect(secondPassenger?.name).toBe(secondPassengerDetails.firstName);
    expect(secondPassenger?.departing_seat_id).toBe(2);
    expect(secondPassenger?.returning_seat_id).toBe(2);
    expect(secondPassenger?.middle).toBe(secondPassengerDetails.middleName);
    expect(secondPassenger?.last).toBe(secondPassengerDetails.lastName);
    expect(secondPassenger?.prefix).toBe(secondPassengerDetails.prefix);
    expect(secondPassenger?.passport_number).toBe(secondPassengerDetails.passportNumber);
    expect(secondPassenger?.known_traveller_number).toBe(secondPassengerDetails.knownTravellerNumber);
    expect(secondPassenger?.email).toBe(secondPassengerDetails.email);
    expect(secondPassenger?.phone).toBe(secondPassengerDetails.phone);
    expect(secondPassenger?.street_address).toBe(secondPassengerDetails.address);
    expect(secondPassenger?.apt_number).toBe(secondPassengerDetails.aptNumber);
    expect(secondPassenger?.province).toBe(secondPassengerDetails.province);
    expect(secondPassenger?.zip_code).toBe(secondPassengerDetails.zipCode);
    expect(secondPassenger?.emerg_name).toBe(secondPassengerDetails.emergFirstName);
    expect(secondPassenger?.emerg_last).toBe(secondPassengerDetails.emergLastName);
    expect(secondPassenger?.emerg_email).toBe(secondPassengerDetails.emergEmail);
    expect(secondPassenger?.emerg_phone).toBe(secondPassengerDetails.emergPhone);


    //Assert: Ensure that router.push was called
    expect(mockPush).toHaveBeenCalledWith("/checkout");

    jest.useRealTimers();
  }, 20000);


});