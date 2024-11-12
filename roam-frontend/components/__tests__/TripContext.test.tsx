import { render, screen, fireEvent } from '@testing-library/react';
import { useTripStore } from '@/context/TripContext';  // Adjust the path to your store
import { Trip, Flight } from '@/models';
import React from "react";

// Mocking localStorage to test persistence
beforeEach(() => {
    localStorage.clear();
});

const TripComponent = () => {
    const { tripData, setTripData } = useTripStore();

    return (
        <div>
            <div data-testid="total-cost">{tripData.total_cost}</div>
            <div data-testid="trip-booking-active">{tripData.trip_booking_active.toString()}</div>
            <button onClick={() => setTripData({ total_cost: 1000, trip_booking_active: true })}>
                Update Trip Data
            </button>
        </div>
    );
};

describe('useTripStore', () => {
    it('should have the correct initial state', () => {
        render(<TripComponent />);

        expect(screen.getByTestId('total-cost')).toHaveTextContent('0');
        expect(screen.getByTestId('trip-booking-active')).toHaveTextContent('false');
    });

    it('should update tripData correctly with setTripData', () => {
        render(<TripComponent />);

        fireEvent.click(screen.getByText('Update Trip Data'));

        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');
        expect(screen.getByTestId('trip-booking-active')).toHaveTextContent('true');
    });

    it('should update specific fields of tripData with setTripData', () => {
        render(<TripComponent />);

        // Simulate updating a specific field
        fireEvent.click(screen.getByText('Update Trip Data'));

        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');
    });

    it('should preserve state across renders (persistent state)', () => {
        // Render the component
        const { rerender } = render(<TripComponent />);

        // Simulate clicking the button to update state
        fireEvent.click(screen.getByText('Update Trip Data'));

        // Check that the state is updated after the first render
        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');

        // Simulate re-rendering (rerendering the same component)
        rerender(<TripComponent />);

        // Check that the state persists after re-rendering
        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');
    });

    it('should not persist state if partialize is changed', () => {
        const { rerender } = render(<TripComponent />);

        fireEvent.click(screen.getByText('Update Trip Data'));

        // Simulate changing partialize
        localStorage.removeItem('tripData-storage');
        rerender(<TripComponent />);

        // Assert that the data is not persisted
        expect(localStorage.getItem('tripData-storage')).toBeNull();
    });

    it('should initialize from localStorage on the next page load', () => {
        // Manually set tripData in localStorage
        localStorage.clear();

        const initialTripData = {
            trip: null,
            current_flight: null,
            current_flight_departure_date: null,
            departure_date: new Date('2024-12-25'),
            return_date: null,
            total_cost: 500,
            trip_booking_active: true,
            trip_purchased: true,
        };

        // Mock localStorage.setItem directly
        localStorage.setItem('tripData-storage', JSON.stringify({ tripData: initialTripData }));

        // Render the component
        render(<TripComponent />);

        // Check that the initial state is loaded from localStorage
        expect(screen.getByTestId('trip-booking-active')).toHaveTextContent('true');
    });

    it('should handle function updates in setTripData', () => {
        render(<TripComponent />);

        fireEvent.click(screen.getByText('Update Trip Data'));

        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');
    });

    it('should handle null values gracefully', () => {
        render(<TripComponent />);

        // Set some fields to null
        fireEvent.click(screen.getByText('Update Trip Data'));

        expect(screen.getByTestId('total-cost')).toHaveTextContent('1000');
    });

});


const TripComponent2 = () => {
    const { tripData, setTripData } = useTripStore();

    return (
        <div>
            <div data-testid="total-cost">{tripData.total_cost}</div>
            <button onClick={() => setTripData((prev) => ({ ...prev, total_cost: prev.total_cost + 100 }))}>
                Increase Total Cost
            </button>
            <button onClick={() => setTripData((prev) => ({ ...prev, total_cost: prev.total_cost + 200 }))}>
                Increase Total Cost by 200
            </button>
        </div>
    );
};

describe('setTripData with function type update', () => {
    it('should update total_cost correctly when using a function to update state', () => {
        // Render the component
        render(<TripComponent2 />);

        // Initially, total_cost should be 0
        expect(screen.getByTestId('total-cost')).toHaveTextContent('0');

        // First update, increase total_cost by 100
        fireEvent.click(screen.getByText('Increase Total Cost'));
        expect(screen.getByTestId('total-cost')).toHaveTextContent('100');

        // Second update, increase total_cost by 200
        fireEvent.click(screen.getByText('Increase Total Cost by 200'));
        expect(screen.getByTestId('total-cost')).toHaveTextContent('300');
    });

    it('should handle complex state updates with a function', () => {
        localStorage.clear();
        render(<TripComponent2 />);

        // Simulate the state update using a function
        fireEvent.click(screen.getByText('Increase Total Cost')); // Adds 100

        // Check that the total_cost is correctly updated
        expect(screen.getByTestId('total-cost')).toHaveTextContent('1400');

        // Simulate another update, which adds 200 to the total_cost
        fireEvent.click(screen.getByText('Increase Total Cost by 200'));

        // Check that the total_cost is now correctly updated
        expect(screen.getByTestId('total-cost')).toHaveTextContent('1600');
    });
});