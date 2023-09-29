import { getEnvVariable } from "./env.lib";

export function getAppUrl(): string {
  try {
    const vercelUrl = getEnvVariable("VERCEL_URL");
    return `https://${vercelUrl}`;
  } catch {
    return "http://localhost:3000";
  }
}
