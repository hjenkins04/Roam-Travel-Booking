
export interface FlightInfo {
    date: string;
    departure: string;
    airline: string;
    flightNumber: string;
    seat: string;
    duration: string;
    departureTime: string;
    arrivalTime: string;
    layover?: string;
  }

export interface TripInfo {
  title: string;
  outboundFlight: FlightInfo;
  returnFlight: FlightInfo;
  ban?: boolean;
  onCancelClick: () => void;
}