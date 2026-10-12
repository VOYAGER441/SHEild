import axios, { AxiosRequestConfig } from "axios";
import { getBackendBaseUrl } from "./backendUrl";
import { loadSession } from "./token.storage";

// Shared axios client for every call to the SHEild API. The access token is
// read from secure storage and attached as a Bearer header on each request.
export const api = axios.create({
    timeout: 15000,
});

api.interceptors.request.use(async (config) => {
    const session = await loadSession();
    if (session?.accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

// POST helper that resolves the backend base URL at call time (it can differ
// between Expo Go LAN hosts and production).
export async function apiPost<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
    const url = `${getBackendBaseUrl()}${path}`;
    const response = await api.post<T>(url, body, config);
    return response.data;
}
