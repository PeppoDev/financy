const AUTH_STORAGE_KEY = "financy";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function persistAuthSession() {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
