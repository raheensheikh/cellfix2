// import axios, {
//     AxiosRequestConfig,
//     AxiosResponse,
//     InternalAxiosRequestConfig,
//     AxiosRequestHeaders,
//   } from 'axios';
// import { store } from '../redux';

// //   export const ASSET_URL =
// //     'https://server1.appsstaging.com/3672/barter-places/public';
//   const instance = axios.create({
//     baseURL: 'https://qready-api.deployment-uat.com/api/',
//         // baseURL: 'https://client1.appsstaging.com:3013/api/',
//         // baseURL:'https://a6cc-202-59-15-163.ngrok-free.app/api/',

//     timeout: 20000,
//   });
//   instance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = store.getState().user.token;
//       console.log("token:",token);
//       // Ensuring headers are of type AxiosRequestHeaders
//       if (token) {
//         (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
//       }
//       config.headers['ngrok-skip-browser-warning'] = "69420";
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     },
//   );
//   instance.interceptors.response.use(
//     (response: AxiosResponse) => {
//       return response;
//     },
//     error => {
//       console.error('API Error:', error.response?.data || error.message);
//       if (error.response?.data?.message.includes('Unauthenticated')) {

//       }
//       return Promise.reject(
//         error.response?.data?.message ||
//           'Something went wrong. Please try again.',
//       );
//     },
//   );
//   type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   interface ApiResponse<T = any> {
//     error: string | null;
//     response: AxiosResponse<T> | null;
//   }
//   export const apiHelper = async <T = any>(
//     method: HttpMethod,
//     endPoint: string,
//     customHeaders: Record<string, string> = {},
//     body: any = null,
//     customConfig: AxiosRequestConfig = {} // 👈 New optional config for things like responseType

//   ): Promise<ApiResponse<T>> => {
//     try {
//       const config: AxiosRequestConfig = {
//         method,
//         url: endPoint,
//         headers: {
//           'Content-Type': 'application/json',
//           ...customHeaders,
//         },
//         // ...(method !== 'GET' && {data: body}),
//         ...(method !== 'GET' && body != null ? { data: body } : {}),
//         ...customConfig, // 👈 Allow external configs like { responseType: 'blob' }

//       };
//       const response = await instance.request<T>(config);
//       return {
//         error: null,
//         response,
//       };
//     } catch (error: any) {
//       return {
//         error: error,
//         response: null,
//       };
//     }
//   };
import axios from "axios";
import { store } from "../redux";

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
    console.log("token:", token);
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
    if (error.response?.data?.message?.includes("Unauthenticated")) {
      // handle unauthenticated error if needed
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
