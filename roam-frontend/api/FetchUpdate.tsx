import { LoginResponse } from "@/models";

export async function fetchUpdate(
  guid: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/users/${guid}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guid,
        firstName,
        lastName,
        email,
        phoneNumber,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data: LoginResponse = await response.json();
  return data;
}
