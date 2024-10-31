import { Airline, Airport, Layover, FlightSeatConfiguration } from "@/models";

export interface Flight {
    guid: string;
    airline: Airline;
    departure_airport: Airport;
    arrival_airport: Airport;
    flight_time_minutes: number;
    departure_time: string;
    arrival_time: string;
    num_stops: number;
    price_economy: number;
    price_business: number;
    baggage_allowance: string;
    seat_configuration_id?: string;
    seat_configuration: FlightSeatConfiguration | undefined;
    layover?: Layover;
}

type SeatTypeMapping = { [index: number]: "Economy" | "Business" };

export function formatTimeMinutes(minutes: number): string {
  if (minutes < 60) {
      return `${minutes}min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0){
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}min`;
}

export function getLayoverSummary(flight: Flight): string {
  if (!flight.layover) {
      return "";
  }

  const { duration_minutes, airport } = flight.layover;
  const formattedDuration = formatTimeMinutes(duration_minutes);
  
  return `${formattedDuration} in ${airport.iata_code}`;
}

export function getStopSummary(flight: Flight): string {
  if (!flight.layover) {
      return "Nonstop";
  }

  return "1 stop"
}

export function getPriceByPassengerType(seatTypeMapping:SeatTypeMapping, flight:Flight){
  const seatTypes = Object.values(seatTypeMapping);
  const allBusiness = seatTypes.every((type) => type === "Business");

  if (allBusiness) return flight.price_business;
  else return  flight.price_economy;
};

export function getSeatTypeByPassengerType(seatTypeMapping:SeatTypeMapping){
  const seatTypes = Object.values(seatTypeMapping);
  const allBusiness = seatTypes.every((type) => type === "Business");

  if (allBusiness) return "Business";
  else return  "Economy";
};

