import { LoginResponse } from "@/models";

export async function fetchUpdate(
  guid: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
): Promise<LoginResponse> {
  const response = await fetch(`/api/users/${guid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guid,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phoneNumber,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update user");
  }
  const data: LoginResponse = await response.json();
  return data;
}
