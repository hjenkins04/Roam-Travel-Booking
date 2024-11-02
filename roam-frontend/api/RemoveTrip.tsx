import React from "react";

export async function RemoveTripByGuid(guid: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/${guid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete trip");
  }
  return;
}
