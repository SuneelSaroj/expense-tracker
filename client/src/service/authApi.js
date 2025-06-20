import api from "./api";

export const registerUser = async (name, email, password) => {
  return await api.post(
    "/auth/register",
    { name, email, password },
    {
      withCredentials: true,
    }
  );
};

export const loginUser = async (email, password) => {
  return await api.post(
    "/auth/login",
    { email, password },
    {
      withCredentials: true,
    }
  );
};

export const logoutUser = async () => {
  return await api.post("/auth/logout", {
    withCredentials: true,
  });
};

export const authStatus = async () => {
  return await api.get("/auth/status", {
    withCredentials: true,
  });
};

export const forgotPassword = async (email) => {
  return await api.post(
    "/auth/forgot-password",
    { email },
    {
      withCredentials: true,
    }
  );
};
