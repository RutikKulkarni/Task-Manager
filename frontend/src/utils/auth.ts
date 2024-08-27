const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginOrSignup = async (
  endpoint: string,
  payload: object
): Promise<{ token: string }> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to authenticate");
  }

  const data = await res.json();
  return data;
};

export const getTokenInfo = () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  return { token, tokenExpiry };
};

export const fetchUserName = async (token: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/user/userdata`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Failed to fetch user data.");
    }
  }

  const data = await response.json();
  return data.name;
};

export const handleLogout = (router: any) => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  router.push("/login");
};
