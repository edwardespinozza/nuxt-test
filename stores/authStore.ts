import { defineStore } from "pinia";
import { useLocalePath } from "#i18n";

import { AuthService } from "~/services/api/authService";

interface User {
  id: number;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
    user: null as User | null,
    isLoggingOut: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },
  actions: {
    resetAuthState() {
      this.accessToken = null;
      this.user = null;
      this.isLoggingOut = false;
    },

    async login(LoginData: { email: string; password: string }) {
      try {        
        const { data } = await AuthService.login(LoginData);
        this.accessToken = data.access;
        await this.getUser();
        navigateTo(useLocalePath()("dashboard"));
      } catch (error: any) {
        console.log("error: ", error);
        throw error;
      }
    },

    async register(RegisterData: { email: string; password: string; password2: string }) {
      try {
        const { data } = await AuthService.register(RegisterData)
        console.log("Usuario registrado:", data);
        const resend_instructions_token = data.data.resend_instructions_token;
        console.log(resend_instructions_token);
        
        navigateTo(useLocalePath()(`/verify-email?token=${resend_instructions_token}&email=${RegisterData.email}`));
      } catch (error: any) {
        console.log("error: ", error);
        throw error;
      }
    },

    async logout() {
      this.isLoggingOut = true;
      try {
        await AuthService.logout();
      } catch (error) {
        console.error("Console de Error en logout:", error);
      } finally {
        this.resetAuthState();
        useCookie('refresh_token').value = undefined;
        navigateTo(useLocalePath()("login"));
      }
    },

    async getUser() {
      try {
        const { data } = await AuthService.getUser();
        this.user = data;
      } catch (error) {
        console.error("Error en getUser:", error);
        this.resetAuthState();
        throw new Error("No se pudieron obtener los datos del usuario.");
      }
    },

    async refreshAccessToken() {
      if (this.isLoggingOut) return;
      try {
        const { data } = await AuthService.refreshAccessToken();
        this.accessToken = data.access_token;
      } catch (error) {
        console.error("Error refrescando token", error);
        this.resetAuthState();
        navigateTo(useLocalePath()("login"));
      }
    },
  },

  persist: true,
});
