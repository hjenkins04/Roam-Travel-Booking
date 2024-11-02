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

export function parseTrip(data: any): Trip {
    return {
        ...data,
        departure_date: data.departure_date ? new Date(data.departure_date) : null,
        return_date: data.return_date ? new Date(data.return_date) : null,
    };
}