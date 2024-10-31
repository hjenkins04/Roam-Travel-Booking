import { LoginResponse } from "@/models";

export async function fetchLogin(): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
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
