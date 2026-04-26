const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

type ApiOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(json?.message ?? "Request failed");
  }

  return json as T;
}
