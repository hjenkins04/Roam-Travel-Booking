import { User } from "@/models";

export async function fetchUserInfo(guid: string): Promise<User> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${guid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  const data: User = await response.json();
  return data;
}
