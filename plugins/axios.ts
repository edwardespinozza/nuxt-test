// plugins/axios.ts
import { useAuthStore } from "~/stores/authStore";
import axios from "axios";
import { ApiError, NetworkError } from "~/services/errors";
/* import { toast } from "#build/ui"; */


declare module "#app" {
  interface NuxtApp {
    $api: typeof axios;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig(); // Accede a las variables de entorno
  const apiClient = axios.create({
    baseURL: config.public.apiUrl, // tu backend
    //baseURL: "http://localhost:8000/api",
    //baseURL: "https://api2.replanteados.com/api",
    withCredentials: true, // IMPORTANTE => permite que se envíen cookies
    timeout: 10000, // 10 segundos
  });

  // Bandera para prevenir múltiples intentos de refresh simultáneos
  let isRefreshing = false;

  // Interceptor para inyectar el access_token en Authorization header
  apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  });

  // Interceptor para capturar errores 401 y refrescar token
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const authStore = useAuthStore();
      if (error.response) {
        console.log("Entre al error.response de AXIOS.TS-----");
        console.log(error.response);
        
        //logica si el servidor responde con un error
        throw new ApiError(
          error.response.data?.errorCode,
          error.response.data?.message || 'Error desconocido',
          error.response.status,
          error.response.data?.detail
        );
      } else {
        // Logica si el servidor no responde
        console.log("entre al else de if error.response");
        const toast = useToast()
        toast.add({
          title: 'Ocurrio un error.',
          description: 'No se pudo conectar con el servidor. Intente más tarde.',
          color: 'red',
        });
        
        throw new NetworkError('No se pudo conectar con el servidor.');
      }

      if (authStore.isLoggingOut) {
        return Promise.reject(error);
      }

      // Si no hay un token, ni siquiera intentes refrescar
      if (!authStore.accessToken) {
        return Promise.reject(error);
      }

      // Si es un error 401 y no estamos refrescando, intenta refrescar el token
      if (error.response?.status === 401 && !isRefreshing) {
        isRefreshing = true;
        try {
          // Intentar refrescar el token
          await authStore.refreshAccessToken();
          // Reintentar la petición original con el nuevo token
          return apiClient(error.config);
        } catch (refreshError) {
          // Si no se puede refrescar el token, hacer logout
          console.error("Error al refrescar el token:", refreshError);
          await authStore.logout();
        } finally {
          isRefreshing = false;
        }
      }

      // Si llegamos aquí, no se pudo renovar el token, rechazar la solicitud
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", apiClient);

});
