// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui', 
    '@pinia/nuxt',
    "pinia-plugin-persistedstate/nuxt",
  ],
  routeRules: {
    "/": { redirect: "/en" },
  },
  colorMode: {
    preference: 'light', // Modo por defecto
    fallback: 'light', // Fallback si no se detecta preferencia del usuario
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
        dir: "ltr",
        file: "en.ts",
      },
      {
        code: "es",
        name: "Español",
        iso: "es-ES",
        dir: "ltr",
        file: "es.ts",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: 'locales/',
    strategy: "prefix",
    detectBrowserLanguage: false,
  }
})