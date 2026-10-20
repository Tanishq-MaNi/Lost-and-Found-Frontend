const API_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

// Every request goes through here: adds the token, parses JSON,
// and turns failures into a thrown Error with the server's message.
export async function api(path, { method = "GET", body } = {}) {
  const token = getToken();
  const isForm = body instanceof FormData;

  let res;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      method,
      headers: {
        ...(body && !isForm && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });
  } catch {
    throw new Error("Cannot connect to the server. Check your connection.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // empty or non-JSON body
  }

  // An expired token logs the user out. A 401 with no token is just
  // "wrong password" on the login form, so it must not trigger this.
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event("auth:logout"));
  }

  if (!res.ok || data?.success === false) {
    const error = new Error(data?.message || `Request failed (${res.status})`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}