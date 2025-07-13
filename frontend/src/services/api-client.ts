const BASEURL = import.meta.env.VITE_SERVER || "http://localhost:";

export async function apiClient<T>(
  port: number,
  endpoint: string,
  method: string = "GET", // Defaults to GET method
  body?: Record<string, string | number> | { [key: string]: any }
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASEURL}${port}/${endpoint}`, options);

  if (response.ok) {
    return response.json();
  }
  throw new Error(
    `We're having trouble connecting to the ${endpoint} endpoint. Sorry!`
  );
  console.log(response);
}
