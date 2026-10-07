import {
  findName,
  getFirstName,
  rememberName,
  saveSession
} from "../storage/session";

// The address of your backend. Every request starts with this.
// const API_URL = "https://trackgeld-backend.fastapicloud.dev";
const API_URL = "http://10.0.2.2:8000";

// ---------- Types ----------

export type SignupPayload = {
  email: string;
  password: string;
  display_name: string;
};

// What the screens get back. ok = worked, otherwise `message` says what failed.
export type AuthResult = {
  ok: boolean;
  status: number; // 200/201 = fine, 401/409/422 = server said no, 0 = no connection
  message: string;
};

export type LoginResult = AuthResult & {
  firstName: string; // name to show in the app ("" if login failed)
};

// ---------- One helper that does the actual network call ----------

async function postJson(path: string, body: object) {
  const url = `${API_URL}${path}`;
  console.log("API -> POST", url, { ...body, password: "******" });

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.log("API -> network error:", error);
    return {
      ok: false,
      status: 0,
      data: null as any,
      message: "Could not reach the server. Check your connection."
    };
  }

  const data: any = await response.json().catch(() => null);
  console.log("API -> status:", response.status);
  // Log the response, but hide the real token so it doesn't sit in your logs.
  console.log("API -> response:", data?.access_token ? { ...data, access_token: "******" } : data);

  if (response.ok) {
    return { ok: true, status: response.status, data, message: data?.message ?? "" };
  }

  // FastAPI errors: { detail: "text" } or { detail: [{ msg: "text" }] }
  let message = "Something went wrong. Please try again.";
  if (typeof data?.detail === "string") {
    message = data.detail;
  } else if (Array.isArray(data?.detail)) {
    message = data.detail[0]?.msg ?? message;
  }
  return { ok: false, status: response.status, data, message };
}

// ---------- SIGNUP: POST /api/v1/auth/signup/email ----------

export async function signupWithEmail(payload: SignupPayload): Promise<AuthResult> {
  const result = await postJson("/api/v1/auth/signup/email", payload);

  if (result.ok) {
    // Remember the first name typed in the form, so login can show it later.
    await rememberName(payload.email, getFirstName(payload.display_name));
  }
  return { ok: result.ok, status: result.status, message: result.message };
}

// ---------- LOGIN: POST /api/v1/auth/login/email ----------
// Success (200) body: { access_token, token_type, expires_in }

export async function loginWithEmail(
  email: string,
  password: string
): Promise<LoginResult> {
  const result = await postJson("/api/v1/auth/login/email", { email, password });

  if (!result.ok) {
    return { ok: false, status: result.status, message: result.message, firstName: "" };
  }

  const token: string | undefined = result.data?.access_token;
  if (!token) {
    return {
      ok: false,
      status: result.status,
      message: "Login worked but the server sent no token.",
      firstName: ""
    };
  }

  // expires_in is seconds. If the server ever leaves it out, assume 1 hour.
  const expiresIn = Number(result.data?.expires_in) > 0 ? Number(result.data.expires_in) : 3600;

  // Name: the one saved at signup, or the part of the email before the "@".
  const firstName = (await findName(email)) ?? email.split("@")[0];

  await saveSession(token, expiresIn, firstName); // <- the token is stored here
  return { ok: true, status: result.status, message: "", firstName };
}

export async function loginWithGoogle(credentialToken: string): Promise<AuthResult> {
  const result = await postJson("/api/v1/auth/google", {credential: credentialToken});

  if (result.ok && result.data) {
    console.log("Google login successful:", result.data);
    const email = result.data.user?.email;
    const displayName = result.data.user?.display_name || "User";
    if (email) {
      await rememberName(email, getFirstName(displayName));
    }
  }
  return { ok: result.ok, status: result.status, message: result.message };
}
