// plugins/initAuth.ts
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  //El if solo se dispara si hay un accessToken, isAuthenticated es true y user esta vacio.
  if (authStore.accessToken && authStore.isAuthenticated && !authStore.user) {
    try {
      await authStore.getUser();
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      await authStore.logout(); // Limpia el estado si no se puede autenticar
    }
  }

});
