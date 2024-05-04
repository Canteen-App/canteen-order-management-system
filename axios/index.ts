import { auth } from "@/config/firebase";
import axios from "axios";

const fetchAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor
fetchAPI.interceptors.request.use(
  async (config: any) => {
    config.headers["Content-Type"] = "application/json";
    const accessToken = await auth?.currentUser?.getIdToken(true);
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
fetchAPI.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default fetchAPI;
