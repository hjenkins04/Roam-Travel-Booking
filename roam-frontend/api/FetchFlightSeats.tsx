import { FlightSeatConfiguration } from "@/models";

export async function fetchFlightSeats(flightGuid: string): Promise<FlightSeatConfiguration> {
  const response = await fetch(`/api/flight/${flightGuid}/seats`);
  if (!response.ok) {
    throw new Error("Failed to fetch flight seats");
  }
  const data = await response.json();
  return data;
}
