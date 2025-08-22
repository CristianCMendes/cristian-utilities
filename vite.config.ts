import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {type ManifestOptions, VitePWA} from 'vite-plugin-pwa'
import manifest from './manifest.json'


// https://vite.dev/config/
export default defineConfig(({mode}) => ({
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({manifest: manifest as ManifestOptions})
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
}))
