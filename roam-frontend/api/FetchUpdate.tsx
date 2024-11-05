import { LoginResponse } from "@/models";

export async function fetchUpdate(
  guid: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
): Promise<LoginResponse> {
  const response = await fetch(
    `/api/users/${guid}`,
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
