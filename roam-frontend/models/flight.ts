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
    seat_configuration: FlightSeatConfiguration | null;
    layover?: Layover;
}

