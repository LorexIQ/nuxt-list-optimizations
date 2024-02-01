// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,

    app: {
        head: {
            title: 'Benchmarks Optimizations'
        }
    },

    css: [
        `~/assets/styles/main.scss`
    ],

    devtools: {enabled: true}
})
