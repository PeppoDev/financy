const AUTH_STORAGE_KEY = "financy:is-authenticated";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function persistAuthSession() {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
