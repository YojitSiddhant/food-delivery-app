export function getUserInfo() {
  if (typeof window === "undefined") return null;

  // Keep auth session-scoped: a user should not appear logged in after
  // closing/reopening the browser unless they login again.
  // Clear any legacy persisted auth state.
  try {
    localStorage.removeItem("userInfo");
  } catch {
    // ignore
  }

  const raw = sessionStorage.getItem("userInfo");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getAuthToken() {
  return getUserInfo()?.token ?? null;
}

export function isLoggedIn() {
  return Boolean(getAuthToken());
}
