// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
  },

  modules: [
    // https://nuxt.com/modules/eslint
    '@nuxtjs/eslint-module',
    // https://nuxt.com/modules/nuxtlabs-ui
    '@nuxthq/ui',
    // https://nuxt.com/modules/google-fonts
    '@nuxtjs/google-fonts',
    // https://nuxt.com/modules/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700]
    }
  }
})
