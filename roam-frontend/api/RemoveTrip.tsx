import React from "react";

export async function RemoveTripByGuid(guid: string): Promise<void> {
  const response = await fetch(
    `/api/trips/${guid}`,
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
