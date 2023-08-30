// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    private: {
      appSecret: process.env.NUXT_SECRET,
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
      jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      jwtRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      appOrigin: process.env.ORIGIN
    }
  },

  modules: [
    // https://nuxt.com/modules/eslint
    '@nuxtjs/eslint-module',
    // https://nuxt.com/modules/google-fonts
    '@nuxtjs/google-fonts',
    // https://nuxt.com/modules/nuxt-auth
    '@sidebase/nuxt-auth',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt'
  ],

  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: false
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700]
    }
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  },

  app: {
    head: {
      title: 'Nuxt 3 CRUD Prisma',
      titleTemplate: '%s - Nuxt 3 CRUD Prisma',
      meta: [
        { charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'og:title', property: 'og:title', content: 'Syariif Abdurrahman Bathik - Portfolio' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Syariif Abdurrahman Bathik' },
        { hid: 'og:type', property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
      ]
    },
    pageTransition: { name: 'page', mode: 'in-out' }
  }
})
