import axios from "axios";

// Create the custom Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Important to send cookies
});

// Add a request interceptor to send user ID (or user info)
api.interceptors.request.use(
  (config) => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    console.log("userSession", userSession);

    // Send only user ID or basic info
    if (userSession) {
      config.headers["x-user-id"] = userSession.userId; // Sending only user ID
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
