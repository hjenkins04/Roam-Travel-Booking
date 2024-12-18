import { Flight } from '@/models';

export interface DisplayPurchasePassenger {
    name: string;
    departing_flight: Flight | null;
    returning_flight: Flight | null;
    departure_seat: string | null;
    return_seat: string | null;
    departure_date: Date | null;
    return_date: Date | null
}

export interface DisplayPurchase {
    guid: string;
    title: string;
    passengers: DisplayPurchasePassenger[];
    subtotal: number;
    taxes: number;
    total_cost: number;
}
