export function saveTokens(accessToken: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null; // server-side safety
  return localStorage.getItem("accessToken");
}

export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
}

export function logout() {
  clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return !!token;
}
