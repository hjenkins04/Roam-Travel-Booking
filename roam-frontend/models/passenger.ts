export interface Passenger {
    guid: string | undefined;
    tripId: string | undefined;
    name: string | undefined;
    departingSeatId: number;
    returningSeatId?: number | null;

    // Fields not used on the backend
    middle: string | undefined;
    last: string | undefined;
    prefix: string | undefined;
    dob: Date | undefined;
    passportNumber: string | undefined;
    knownTravellerNumber: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    streetAddress: string | undefined;
    aptNumber: string | undefined;
    province: string | undefined;
    zipCode: string | undefined;
    emergName: string | undefined;
    emergLast: string | undefined;
    emergEmail: string | undefined;
    emergPhone: string | undefined;
}