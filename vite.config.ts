import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync('./certs/localhost-key.pem'),
            cert: fs.readFileSync('./certs/localhost.pem')
        }
    },
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Ich hab' noch nie",
                short_name: "Ich hab' noch nie",
                display: "standalone",
                theme_color: "#f67730",
                background_color: "#f67730",
                description: "Ein einfaches Partyspiel mit Fragen, bei der man auch selbst Fragen hinzufügen kann"
            },
            workbox: {}
        })
    ]
})
