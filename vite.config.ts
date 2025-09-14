import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {type ManifestOptions, VitePWA} from 'vite-plugin-pwa'
import rawManifest from './manifest.json';

const manifest = rawManifest as ManifestOptions

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    const startUrl = env.VITE_START_URL
    const apiUrl = env.VITE_API_URL


    console.log(`API_URL: ${apiUrl}`)
    console.log(`START_URL: ${startUrl}`)

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            // Usa a variável do .env carregada via loadEnv
            VitePWA({
                manifest: {...manifest, start_url: startUrl},
                registerType: 'autoUpdate',
                workbox: {
                    navigateFallback: '/index.html',
                    globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}']
                }
            })
        ],
        build: {
            target: 'es2020',
            minify: 'esbuild',
            cssCodeSplit: true,
            sourcemap: false,
            emptyOutDir: true,
            assetsInlineLimit: 0,
            chunkSizeWarningLimit: 900,
            cssMinify: 'esbuild',
            brotliSize: false,
            rollupOptions: {
                treeshake: true,
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom'],
                        router: ['react-router-dom'],
                        emotion: ['@emotion/react', '@emotion/styled'],
                        mui: ['@mui/material', '@mui/icons-material'],
                    },
                    chunkFileNames: 'assets/chunks/[name]-[hash].js',
                    entryFileNames: 'assets/chunks/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                },
                preserveEntrySignatures: 'exports-only',
            },
        },
        esbuild: {
            // Remove console/debugger only in production to keep DX in dev
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        server: {
            proxy: {
                '^/api/': {
                    target: env.VITE_API_URL,
                    secure: false,
                    headers: {
                        'X-API-KEY': env.VITE_API_KEY,
                    }
                }
            },
            host: true,
        }
    }
})
