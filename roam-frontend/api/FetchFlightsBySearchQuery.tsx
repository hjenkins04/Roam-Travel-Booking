import React from "react";
import { FlightSearch, Flight } from "@/models";

export async function fetchFlightsBySearchQuery(searchData: FlightSearch): Promise<Flight[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/flights/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  const data: Flight[] = await response.json();
  return data;
}
