import { LoginResponse } from "@/models";

export async function fetchLogin(): Promise<LoginResponse> {
  const response = await fetch(
    `/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "update@email.com",
        password: "password123",
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data: LoginResponse = await response.json();
  return data;
}
