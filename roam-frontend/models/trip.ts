import { Flight, Passenger } from '@/models';

export interface Trip {
    guid: string;
    name: string;
    isRoundTrip: boolean;
    departingFlight?: Flight | null;
    returningFlight?: Flight | null;
    passengers: Passenger[];
}