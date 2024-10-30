import { Seat } from "@/models/seat";

export interface FlightSeatConfiguration {
    guid: string;
    seats_available: number;
    flight_id: string;
    seat_configuration: Seat[];
}
