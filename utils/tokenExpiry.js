
import { jwtDecode } from "jwt-decode";

let expiryTimer = null;

export const startTokenExpiryTimer = (token, onExpire) => {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
  }

  try {
    const { exp } = jwtDecode(token);

    const remaining = exp * 1000 - Date.now();

    if (remaining <= 0) {
      onExpire();
      return;
    }

    expiryTimer = setTimeout(onExpire, remaining);

  } catch (err) {
    console.error("Invalid JWT:", err);
    onExpire();
  }
};

export const clearTokenExpiryTimer = () => {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
};