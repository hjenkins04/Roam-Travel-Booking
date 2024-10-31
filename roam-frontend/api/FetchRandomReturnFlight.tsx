import { Flight, FlightSearch } from "@/models";

export async function fetchRandomReturnFlight(searchData: FlightSearch): Promise<Flight> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/flights/random`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random return flight");
  }

  const data: Flight = await response.json();
  return data;
}
