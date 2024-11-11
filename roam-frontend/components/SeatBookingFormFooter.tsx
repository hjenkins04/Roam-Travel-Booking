import React from 'react';
import { Button } from '@/components/ui/button';

interface SeatBookingFormFooterProps {
    passengerName: string;
    seatNumber: number;
    groupSize: number;
    passengerIndex: number;
    isRoundTrip: boolean;
    isFirstFlight: boolean;
    onCancel: () => void;
    onNextPassenger: () => void;
    onNextFlight: () => void;
    onContinue: () => void;
}

const SeatBookingFormFooter: React.FC<SeatBookingFormFooterProps> = ({
    passengerName,
    seatNumber,
    groupSize,
    passengerIndex,
    isRoundTrip,
    isFirstFlight,
    onCancel,
    onNextPassenger,
    onNextFlight,
    onContinue
}) => {
    // Button visibility logic
    const showNextFlightButton =
        isRoundTrip && isFirstFlight && passengerIndex === groupSize - 1; // If round trip, first flight, and last passenger
    const showNextPassengerButton =
        groupSize > 1 && passengerIndex < groupSize - 1; // If more than one passenger and not on the last one
    const showContinueButton =
        !isFirstFlight && passengerIndex === groupSize - 1; // If on the last flight and last passenger
    const showSaveAndCloseButton = true; // Save and Close should always be shown

    return (
        <div className="flex justify-between items-center p-4">
            {/* Passenger Details */}
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Passenger</span>
                    <span className="text-lg font-semibold">{passengerName}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Seat number</span>
                    <span className="text-lg font-semibold">{seatNumber}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                {/* Cancel - always visible */}
                {showSaveAndCloseButton && (
                    <Button variant="outline" className="border-orange-400 text-orange-400" onClick={onCancel} data-testid="cancel-button">
                        Cancel
                    </Button>
                )}

                {/* Next Passenger button */}
                {showNextPassengerButton && (
                    <Button className="bg-[#ff6b35] hover:bg-[#ff8c5a]" onClick={onNextPassenger} data-testid="next-passenger-button">
                        Next Passenger
                    </Button>
                )}

                {/* Next Flight button */}
                {showNextFlightButton && (
                    <Button className="bg-[#ff6b35] hover:bg-[#ff8c5a]" onClick={onNextFlight} data-testid="book-return-flight-button">
                        Book Return Flight
                    </Button>
                )}

                {/* Checkout button */}
                {showContinueButton && (
                    <Button className="bg-[#ff6b35] hover:bg-[#ff8c5a]" onClick={onContinue} data-testid="checkout-button">
                        Checkout
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SeatBookingFormFooter;
