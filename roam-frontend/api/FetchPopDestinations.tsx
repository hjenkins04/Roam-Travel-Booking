import React from "react";
import { PopularDestination } from "@/models/popular_destination";

export async function fetchPopDestinations(): Promise<PopularDestination[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/destination/popular`);
    if (!response.ok) {
        throw new Error("Failed to fetch destinations");
    }
    const data = await response.json();
    return data;
}
