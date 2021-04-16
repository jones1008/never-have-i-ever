import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            manifest: {
                name: "Ich hab' noch nie",
                short_name: "Ich hab' noch nie",
                display: "standalone",
                theme_color: "#F67730",
                background_color: "#F67730",
                description: "Ein einfaches Partyspiel mit Fragen, bei der man auch selbst Fragen hinzufügen kann",
                icons: [{
                    src: "/img/icons/homescreen48.png",
                    sizes: "48x48",
                    type: "image/png"
                }, {
                    src: "/img/icons/homescreen72.png",
                    sizes: "72x72",
                    type: "image/png"
                }, {
                    src: "/img/icons/homescreen96.png",
                    sizes: "96x96",
                    type: "image/png"
                }, {
                    src: "/img/icons/homescreen144.png",
                    sizes: "144x144",
                    type: "image/png"
                }, {
                    src: "/img/icons/homescreen168.png",
                    sizes: "168x168",
                    type: "image/png"
                }, {
                    src: "/img/icons/homescreen192.png",
                    sizes: "192x192",
                    type: "image/png"
                }]
            }
        })
    ]
})
