import type { AuthCredentials, AuthResponse } from './index';
import { globalInstance } from "@/lib/api";


export const authService = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const api = globalInstance("");
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  logout: async (token: string): Promise<void> => {
    const api = globalInstance(token);
    await api.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const api = globalInstance("");
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },
};
