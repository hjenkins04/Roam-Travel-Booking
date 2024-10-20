export interface FlightDetailsProps {
    flight?: {  // Make flight optional
        outgoingAirport: string;
        incomingAirport: string;
        outgoingAirportName: string;
        incomingAirportName: string;
        tripLength: string;
        price: string;
        airline: string;
        flightDate: string;
        time: string;
        baggageAllowance: string;
    } | null;  // Allow null as well
}