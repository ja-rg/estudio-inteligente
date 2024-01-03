// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-bootstrap-icons",
    "@nuxt/image",
    'nuxt-mongoose',
    '@sidebase/nuxt-auth',
    '@sidebase/nuxt-pdf',
    'nuxt-vuefire',
  ],
  bootstrapIcons: {
    renderType: 'component'
  },

  css: [
    '~/node_modules/bootstrap/scss/bootstrap.scss',
    '~/assets/css/style.css',
  ],


  plugins: [
    { src: '~/plugins/useBootstrap.client.ts', mode: 'client' },
  ],

  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      dbName: 'plataforma-web',
    },
    modelsDir: 'models',
  },

  auth: {
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: true,
  },

  vuefire: {
    config: {
      apiKey: "AIzaSyAFvVYzzKM2yl3WVP6we6RFSsXc8flHfFs",
      authDomain: "studially-2790e.firebaseapp.com",
      projectId: "studially-2790e",
      storageBucket: "studially-2790e.appspot.com",
      messagingSenderId: "498493727897",
      appId: "1:498493727897:web:c6af7dfcbdbb151f1e8408",
      measurementId: "G-9QHDHDQ1MQ"
    },
  }
})
