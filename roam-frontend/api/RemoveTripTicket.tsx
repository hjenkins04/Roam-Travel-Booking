import React from "react";

export async function RemoveTripTicketByGuidAndIndex(guid: string, index: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/${guid}/${index}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete trip ticket with index ${index}`);
  }
  return;
}
