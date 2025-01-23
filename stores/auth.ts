// stores/auth.ts
import { useNuxtApp } from "#app";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { NetworkError } from "~/services/errors";
import { ApiError } from "~/services/errors";

interface User {
  id: number;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  // ... otros campos necesarios
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

    async login(credentials: LoginCredentials) {
      
      const { $axios } = useNuxtApp();
      try {
        const { data } = await $axios.post("/auth/login", credentials);
        //SI SE USA EL ACCESS TOKEN EN EL HEADER
        this.accessToken = data.access_token;
        await this.fetchUser();
        navigateTo("/dashboard");
      } catch (error: any) {
        throw error;
      }
    },

    async register(formData: any) {
      const { $axios } = useNuxtApp();
      console.log('formData desde register:', formData);
      try {
        const { data } = await $axios.post("/auth/register", formData);
        console.log("Usuario registrado:", data);
        navigateTo("/en/login");

      } catch (error: any) {
        throw error;
      }
    },

    async logout() {
      const { $axios } = useNuxtApp();
      this.isLoggingOut = true;
      try {
        await $axios.post("/auth/logout");
      } catch (error) {
        console.error("Console de Error en logout:", error);
      } finally {
        this.resetAuthState();
        this.isLoggingOut = false;
        navigateTo("/en/login");
      }
    },

    async fetchUser() {
      const { $axios } = useNuxtApp();
      try {
        const { data } = await $axios.get("/auth/user");
        this.user = data;
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        this.resetAuthState();
        throw new Error("No se pudieron obtener los datos del usuario.");
      }
    },

    async refreshAccessToken() {
      if (this.isLoggingOut) return;
      const { $axios } = useNuxtApp();

      try {
        const { data } = await $axios.post("/auth/refresh");
        this.accessToken = data.access_token;
      } catch (error) {
        console.error("Error refrescando token", error);
        this.resetAuthState();
        navigateTo("/en/login");
      }
    },
  },

  persist: true,
});
