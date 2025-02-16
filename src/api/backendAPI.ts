import axios, { InternalAxiosRequestConfig } from "axios";
import { readEnv } from "../utilitys";

const { VITE_BASE_URL } = readEnv();

const backendAPI = axios.create({
  baseURL: VITE_BASE_URL,
});

backendAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Asegúrate de que `headers` esté definido
  config.headers = config.headers || {};

  // Agregar el token al encabezado
  config.headers["x-token"] = window.localStorage.getItem("token") || "";

  return config;
});

export default backendAPI;
