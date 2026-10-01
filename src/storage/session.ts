import * as SecureStore from "expo-secure-store";

// SecureStore = encrypted storage on the phone (Android Keystore / iOS Keychain).
// Keys may only contain letters, numbers, "." "-" and "_".
const TOKEN_KEY = "access_token";
const EXPIRES_KEY = "token_expires_at";
const NAME_KEY = "user_first_name";
const NAMES_MAP_KEY = "known_first_names";

// "Alex Berger" -> "Alex"
export function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

// ---------- The login session (token) ----------

export async function saveSession(
  token: string,
  expiresInSeconds: number,
  firstName: string
) {
  const expiresAt = Date.now() + expiresInSeconds * 1000; // when the token dies
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(EXPIRES_KEY, String(expiresAt));
  await SecureStore.setItemAsync(NAME_KEY, firstName);
}

// Returns the saved login, or null if there is none / it has expired.
export async function loadSession(): Promise<{
  token: string;
  firstName: string;
} | null> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const expiresAt = Number(await SecureStore.getItemAsync(EXPIRES_KEY));
    const firstName = (await SecureStore.getItemAsync(NAME_KEY)) ?? "";

    if (!token || !expiresAt || Date.now() >= expiresAt) return null;
    return { token, firstName };
  } catch (error) {
    console.log("SESSION -> could not read:", error);
    return null;
  }
}

// Used later when you call protected endpoints.
export async function getToken(): Promise<string | null> {
  const session = await loadSession();
  return session ? session.token : null;
}

// Logout = delete the token. (We keep the remembered names, see below.)
export async function clearSession() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(EXPIRES_KEY);
  await SecureStore.deleteItemAsync(NAME_KEY);
}

// ---------- Remembering the name typed at signup ----------
// The login endpoint only returns a token, not the user's name. So at signup
// we save "email -> first name" on the phone and look it up again at login.

async function readNames(): Promise<Record<string, string>> {
  try {
    const raw = await SecureStore.getItemAsync(NAMES_MAP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function rememberName(email: string, firstName: string) {
  const names = await readNames();
  names[email.trim().toLowerCase()] = firstName;
  await SecureStore.setItemAsync(NAMES_MAP_KEY, JSON.stringify(names));
}

export async function findName(email: string): Promise<string | null> {
  const names = await readNames();
  return names[email.trim().toLowerCase()] ?? null;
}