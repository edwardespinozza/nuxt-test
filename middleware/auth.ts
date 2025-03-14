// middleware/auth.ts
import { navigateTo } from "#app";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    try {
      await authStore.getUser();
    } catch (error) {
      // Opcional: Puedes manejar diferentes tipos de errores aquí
      return navigateTo(useLocalePath()("/login"))
    }
  }

  // Verificar roles si están definidos en los metadatos de la página
  /* const requiredRoles = to.meta.roles as Array<string> | undefined
  if (requiredRoles && !requiredRoles.some(role => authStore.user?.roles.includes(role))) {
    return navigateTo('/unauthorized') // Redirige si no tiene los roles necesarios
  } */
});
