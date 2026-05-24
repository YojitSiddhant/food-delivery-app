export function getUserInfo() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("userInfo");
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

