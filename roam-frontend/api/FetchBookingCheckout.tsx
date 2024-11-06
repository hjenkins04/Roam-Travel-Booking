import { Trip } from "@/models";

export async function FetchBookingCheckout(trip: Trip): Promise<Response> {
  const response = await fetch(`/api/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to send trip data");
  }

  return response;
}
