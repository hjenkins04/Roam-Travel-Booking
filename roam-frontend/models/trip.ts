import { Flight, Passenger } from '@/models';

export interface Trip {
    guid: string;
    name: string;
    is_round_trip: boolean;
    departing_flight?: Flight | null;
    returning_flight?: Flight | null;
    passengers: Passenger[];
    departure_date: Date | null;
    return_date: Date | null;
}