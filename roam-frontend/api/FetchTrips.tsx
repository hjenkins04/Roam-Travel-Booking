import React from "react";
import { Trip, parseTrip } from "@/models";

export async function fetchTrips(): Promise<Trip[]> {
  const response = await fetch(`/api/trips`);
  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }
  const data = await response.json();
  console.log(data);
  return data;
}
