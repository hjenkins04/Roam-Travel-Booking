export interface Passenger {
    guid: string | undefined;
    trip_id: string | undefined;
    name: string | undefined;
    departing_seat_id: number;
    returning_seat_id?: number | null;

    // Fields not used on the backend
    middle: string | undefined;
    last: string | undefined;
    prefix: string | undefined;
    dob: Date | undefined;
    passport_number: string | undefined;
    known_traveller_number: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    street_address: string | undefined;
    apt_number: string | undefined;
    province: string | undefined;
    zip_code: string | undefined;
    emerg_name: string | undefined;
    emerg_last: string | undefined;
    emerg_email: string | undefined;
    emerg_phone: string | undefined;
}