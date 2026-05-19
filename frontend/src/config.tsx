const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, "");

export const DATABASE_URL = normalizedApiUrl.endsWith("/api/v1")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api/v1`;
