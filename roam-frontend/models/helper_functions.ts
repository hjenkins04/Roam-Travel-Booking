import { Flight, Seat, Trip, Airline, Airport, Layover, FlightSeatConfiguration } from "@/models";
import { DisplayPurchase, DisplayPurchasePassenger } from '@/models';

type SeatTypeMapping = { [index: number]: "Economy" | "Business" };

export function formatTimeMinutes(minutes: number): string {
  if (minutes < 60) {
      return `${minutes}min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0){
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}min`;
}

export function getLayoverSummary(flight: Flight): string {
  if (!flight.layover) {
      return "";
  }

  const { duration_minutes, airport } = flight.layover;
  const formattedDuration = formatTimeMinutes(duration_minutes);
  
  return `${formattedDuration} in ${airport.iata_code}`;
}

export function getStopSummary(flight: Flight): string {
  if (!flight.layover) {
      return "Nonstop";
  }

  return "1 stop"
}

export function getPriceByPassengerType(seatTypeMapping:SeatTypeMapping, flight:Flight){
  const seatTypes = Object.values(seatTypeMapping);
  const allBusiness = seatTypes.every((type) => type === "Business");

  if (allBusiness) return flight.price_business;
  else return  flight.price_economy;
};

export function getSeatTypeByPassengerType(seatTypeMapping:SeatTypeMapping){
  const seatTypes = Object.values(seatTypeMapping);
  const allBusiness = seatTypes.every((type) => type === "Business");

  if (allBusiness) return "Business";
  else return  "Economy";
};

export function getDepartingFlightSeatSummary(trip: Trip, passengerIndex: number): string {
    let passengerSeatIndex = trip.passengers[passengerIndex].departing_seat_id ?? undefined
    const seat = trip.departing_flight?.seat_configuration?.seat_configuration[passengerSeatIndex] ?? undefined
    passengerSeatIndex -= 1;
    if (seat){
        return `Seat ${seat.seat_id} (${seat.type}, ${seat.position})`;
    }
    else return ""
}

export function getReturningFlightSeatSummary(trip: Trip, passengerIndex: number): string {
    let passengerSeatIndex = trip.passengers[passengerIndex].returning_seat_id ?? undefined
    if (passengerSeatIndex){
        passengerSeatIndex -= 1;
        const seat = trip.returning_flight?.seat_configuration?.seat_configuration[passengerSeatIndex] ?? undefined
        if (seat)
            return `Seat ${seat.seat_id} (${seat.type}, ${seat.position})`;
    }
    return ""
}

export function getFlightIdString(flight: Flight): string {
    return flight.guid.slice(-6);
}

export function getNameOrDefault(name: string | undefined, index: number): string {
    return name?.trim() ? name : `Unknown Passenger ${index}`;
}


export function mapTripToPurchase(trip: Trip): DisplayPurchase {
    // Check if passengers is undefined or null and handle it
    const passengers: DisplayPurchasePassenger[] = trip.passengers?.map((passenger, index) => ({
        name: getNameOrDefault(passenger.name, index),
        departing_flight: trip.departing_flight ?? null,
        returning_flight: trip.returning_flight ?? null,
        departure_seat: trip.departing_flight ? getDepartingFlightSeatSummary(trip, index) : "No seat assigned",
        return_seat: trip.returning_flight ? getReturningFlightSeatSummary(trip, index) : "No seat assigned",
        departure_date: trip.departure_date ?? null,
        return_date: trip.return_date ?? null,
    })) || []; // Fallback to an empty list

    const subtotal = calculateSubtotal(passengers, trip);
    const tax = calculateTax(subtotal);
    const total = Math.round((subtotal + tax) * 100) / 100; // Round to 2 decimals

    return {
        guid: trip.guid ?? "",
        title: trip.name,
        passengers,
        subtotal,
        taxes: tax,
        total_cost: total,
    };
}



export function calculateSubtotal(passengers: DisplayPurchasePassenger[], trip: Trip): number {
    let subtotal = 0;

    passengers.forEach((passenger, index) => {
        // Determine departing flight cost
        if (trip.departing_flight) {
            const departingSeatType = getSeatType(trip.departing_flight, trip.passengers[index].departing_seat_id);
            subtotal += departingSeatType === "Business" ? trip.departing_flight.price_business : trip.departing_flight.price_economy;
        }

        // Add returning flight cost
        if (trip.is_round_trip && trip.returning_flight && trip.passengers[index].returning_seat_id) {
            const returningSeatType = getSeatType(trip.returning_flight, trip.passengers[index].returning_seat_id);
            subtotal += returningSeatType === "Business" ? trip.returning_flight.price_business : trip.returning_flight.price_economy;
        }
    });

    return subtotal;
}


export function calculateTax(subtotal: number): number {
    return subtotal * 0.13;
}


export function getSeatType(flight: Flight, seatId: number): string {
    const seat = flight.seat_configuration?.seat_configuration.find((seat) => seat.seat_id === seatId);
    return seat?.type || "Economy";
}