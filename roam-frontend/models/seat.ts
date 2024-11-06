export interface Seat {
    seat_id: number; // 1 to 188
    type: string; // Business or Economy
    position: string; // Window, Aisle, or Middle
    available: boolean;
}
