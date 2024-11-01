import { Flight } from '@/models';

export interface DisplayPurchasePassenger {
    name: string;
    departing_flight: Flight | null;
    returning_flight: Flight | null;
    departure_seat: string;
    return_seat: string;
    departure_date: Date | null;
    return_date: Date | null
}

export interface DisplayPurchase {
    title: string;
    passengers: DisplayPurchasePassenger[];
    subtotal: number;
    taxes: number;
    total_cost: number;
}
