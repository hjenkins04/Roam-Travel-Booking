import React from "react";
import { Trip } from "@/models";

export async function fetchTrips(): Promise<Trip[]> {
  const response = await fetch(`/api/trips`);
  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }
  const data = await response.json();
  return data;
}
