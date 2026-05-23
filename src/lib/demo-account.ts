export const DEMO_EMAIL = "demo@nexly.app";

export function isDemoEmail(email: string) {
  return email.toLowerCase() === DEMO_EMAIL;
}

export function isValidDemoAccessSecret(key: string | null | undefined) {
  const secret = process.env.DEMO_ACCESS_SECRET;
  if (!secret || !key) return false;
  return key === secret;
}

export function getDemoPassword() {
  return process.env.DEMO_PASSWORD ?? "senha123";
}
