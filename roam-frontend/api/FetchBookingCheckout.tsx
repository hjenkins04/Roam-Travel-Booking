import { Trip } from "@/models";

export async function FetchBookingCheckout(trip: Trip): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips`, {
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
