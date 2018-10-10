const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Industry Summit - Southern Tier Economic Development Conference hosted by Southern Tier 8',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        name: "msapplication-TileColor",
        content: "#ffffff"
      },
      {
        name: "msapplication-TileImage",
        content: "/icons/ms-icon-144x144.png"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/icons/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/icons/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/icons/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/icons/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/icons/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/icons/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/icons/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-icon-180x180.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/icons/android-icon-192x192.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/icons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/icons/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/icons/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/manifest.json"
      }
    ],

    script: [{
        src: '//fast.fonts.net/jsapi/5811e47d-1408-43d0-b854-1878574ab5df.js',
        defer: true
      },
      {
        src: '/js/uikit-core.min.js',
        defer: true
      },
      {
        src: '/js/components/parallax.min.js',
        defer: true
      },
      {
        src: 'https://js.stripe.com/v3/',
        defer: true
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#23538a',
    height: '10px'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '~/assets/scss/app.scss',
    lang: 'scss'
  }],

  /*
   ** Plugins to load before mounting the App
   */
  izitoast: {
    timeout: 3000,
    position: 'bottomRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    backgroundColor: '#00C7FF',
    color: '#243457',
    titleColor: '#243457',
    messageColor: '#243457',
    iconColor: '#243457',
    layout: 2,
    imageWidth: 80,
    pauseOnHover: false,
    progressBarColor: '#243457',
    overlay: true,
    overlayClose: true,
    overlayColor: 'rgba(0,0,0,0.7)',
  },

  plugins: [
    '~/plugins/vuikit'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-izitoast',
    ['nuxt-validate', {
      lang: 'en'
    }],
    '@nuxtjs/google-analytics'
  ],
  'google-analytics': {
    id: 'UA-126643495-1'
  },

  router: {
    middleware: ['auth']
  },
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'https://southerntiersummit.com/manage/api/1.1'
  },

  auth: {
    // Options
    resetOnError: true,
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/request-token',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: { url: 'https://southerntiersummit.com/manage/logout/', method: 'post' },
          user: {
            url: 'users/me',
            method: 'patch',
            propertyName: 'data'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
      google: {
        client_id: '1038506444078-54jltpkeqkbo72bf15cp3abnsh3jkf0l.apps.googleusercontent.com',
        scope: ['openid', 'profile', 'email'],
        redirect_uri: 'http://localhost:3000/account/callback'
      },
      facebook: {
        client_id: '334107333990799',
        scope: ['public_profile', 'email', 'user_birthday']
      }
    },
    redirect: {
      login: '/account/login/',
      logout: '/',
      callback: '/account/callback/',
      user: '/account/',
      home: '/account/'
    },
    rewriteRedirects: true,
    fullPathRedirect: true
  },

  /*
   ** Build configuration
   */
  // generate: {
  //   routes: function() {
  //     return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/')
  //       .then((res) => {
  //         return res.data.map((user) => {
  //           return {
  //             route: '/account/reset/' + user.email,
  //             payload: user
  //           }
  //         })
  //       })
  //   }
  // },
  generate: {
    // minify: false
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vuikit'],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
