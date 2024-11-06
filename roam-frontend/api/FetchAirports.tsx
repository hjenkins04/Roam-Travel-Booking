import React from "react";
import { Airport } from "@/models";

export async function fetchAirports(): Promise<Airport[]> {
  const response = await fetch(`/api/airports`);
  if (!response.ok) {
    throw new Error("Failed to fetch airports");
  }
  const data = await response.json();
  return data;
}
