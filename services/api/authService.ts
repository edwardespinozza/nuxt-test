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

  async sendVerificationEmail(token: string) {
    const response = {token: token};
    console.log(response);
    
    const { $api } = useNuxtApp();
    return await $api.post("/auth/send_verification_email", response);
  },

  async request_password_reset(email: string) {
    const response = {email: email};
    const { $api } = useNuxtApp();
    return await $api.post("/auth/request_password_reset", response);
  },

  async reset_password(data: {token: string; password: string}) {
    const { $api } = useNuxtApp();
    return await $api.post("/auth/reset_password", data);
  }
};


/* const resendVerificationEmail = async () => {
  try {
    // Lógica para volver a enviar el correo de verificación
    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiUrl}/auth/send_verification_email`, {
      method: 'POST',
      body: { email: email } // Aquí puedes pasar el correo del usuario si lo tienes
    })
    verificationStatus.value = 'Correo de verificación reenviado. Revisa tu bandeja de entrada.'
    showResendButton.value = false  // Ocultar el botón de reenviar
  } catch (error) {
    console.error('Error reenviando el correo:', error)
    verificationStatus.value = 'Error al reenviar el correo de verificación.'
  }
} */