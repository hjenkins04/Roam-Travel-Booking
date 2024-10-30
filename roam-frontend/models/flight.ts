import { Airline, Airport, Layover } from "@/models";

export interface Flight {
    guid: string;
    airline: Airline;
    departure_airport: Airport;
    arrival_airport: Airport;
    flight_time_minutes: number;
    seat_configuration_id?: string;
    layover?: Layover;
  }