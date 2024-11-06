export async function fetchCreateUser() {
  const response = await fetch(
    `/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "user@email.com", password: "password" }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  const data = await response.json();
  return data;
}
