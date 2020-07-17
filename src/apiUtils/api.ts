import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    if (response?.data?.access_token) {
      window.localStorage.setItem("token", response.data.access_token);
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      window.localStorage.removeItem("token");
      window.location.pathname = "/";
    }
    return Promise.reject(error);
  }
);

http.interceptors.request.use((config) => {
  if (!!window.localStorage.getItem("token"))
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

export const del = (url: string) => http.delete(url);

export const get = ({ url }: { url: string }) => http.get(url);

export const put = ({ url, data }: { url: string; data: any }) =>
  http.put(url, data);

export const post = ({ url, data }: { url: string; data: any }) =>
  http.post(url, data);

export const patch = ({ url, data }: { url: string; data: any }) =>
  http.patch(url, data);
