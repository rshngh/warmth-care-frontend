import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000/api"
      : "https://warmth-care-backend.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
