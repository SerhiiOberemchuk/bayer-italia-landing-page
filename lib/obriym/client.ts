import "server-only";

export class ObriymRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ObriymRequestError";
  }
}

function getConfig() {
  return {
    baseUrl: process.env.OBRIYM_CRM_API_URL,
    token: process.env.OBRIYM_CRM_API_TOKEN,
  };
}

export function isObriymConfigured() {
  return Boolean(getConfig().token);
}

export async function requestObriym<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { baseUrl, token } = getConfig();
  if (!token) throw new Error("OBRIYM_CRM_API_TOKEN is not configured");

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  if (!response.ok) {
    const body = await response.text();
    throw new ObriymRequestError(
      response.status,
      `Obriym CRM API ${response.status}: ${body.slice(0, 400)}`,
    );
  }

  return (await response.json()) as T;
}
