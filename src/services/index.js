import axios from "axios";
import { store } from "../redux";
import { setLogout } from "../redux/slices/userSlice";

// const ASSET_URL =
//   'https://server1.appsstaging.com/3672/barter-places/public';

const instance = axios.create({
  baseURL: "https://www.houstoncellphone.repair/cell_fix/public/api/",
  // baseURL: 'https://client1.appsstaging.com:3013/api/',
  // baseURL: 'https://a6cc-202-59-15-163.ngrok-free.app/api/',
  timeout: 20000,
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.data?.message?.includes("Unauthorized")) {
      // handle unauthenticated error if needed
      store.dispatch(setLogout())
    }
    return Promise.reject(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
);

export const apiHelper = async (
  method,
  endPoint,
  customHeaders = {},
  body = null,
  customConfig = {}
) => {
  try {
    const config = {
      method,
      url: endPoint,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
      ...(method !== "GET" && body != null ? { data: body } : {}),
      ...customConfig,
    };

    const response = await instance.request(config);
    return {
      error: null,
      response,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
};
