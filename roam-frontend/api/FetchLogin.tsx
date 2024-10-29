export async function fetchLogin() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "user@email.com", password: "password" }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data = await response.json();
  return data;
}
