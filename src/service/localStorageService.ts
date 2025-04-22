// Save token
export const setToken = (
  key: string,
  token: string
) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, token); // Store raw JWT, not JSON.stringified
  } catch (err) {
    console.error(
      "Failed to save token to localStorage:",
      err
    );
  }
};

// Get token and check expiry
export const getToken = (
  key: string
): string | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(key);
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(
      atob(payloadBase64)
    );
    const exp = decodedPayload.exp;

    if (exp && Date.now() >= exp * 1000) {
      localStorage.removeItem(key);
      return null;
    }

    return token;
  } catch (error) {
    console.error(
      "Error decoding JWT token:",
      error
    );
    return null;
  }
};

export const removeToken = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
