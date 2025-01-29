// services/authService.ts
import { useNuxtApp } from "#app";

export const AuthService = {
  async login(LoginData: { email: string; password: string }) {
    const { $api } = useNuxtApp();    
    return await $api.post("/auth/login", LoginData);
  },
  
  async register(RegisterData: { email: string; password: string; password2: string }) {
    const { $api } = useNuxtApp();
    return await $api.post("/auth/register", RegisterData);
  },
  
  async logout() {
    const { $api } = useNuxtApp();
    return await $api.post("/auth/logout");
  },
  
  async getUser() {
    const { $api } = useNuxtApp();
    return await $api.get("/auth/user");
  },
  
  async refreshAccessToken() {
    const { $api } = useNuxtApp();
    return await $api.post("/auth/refresh");
  },
};
