import { clearTokens, getAccessToken, logout, saveTokens } from "./auth";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh(resolve);
    });
  }

  isRefreshing = true;
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // send cookies with refresh token
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = await res.json();
    saveTokens(data.accessToken);

    onRefreshed(data.accessToken);
    return data.accessToken;
  } catch (err) {
    clearTokens();
    return null;
  } finally {
    isRefreshing = false;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  let token = getAccessToken();

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (res.status === 401 && token) {
    // try refresh
    token = await refreshAccessToken();
    if (token) {
      res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    } else {
      logout();
      return;
    }
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// const data = await apiFetch("/api/auth/profile");
