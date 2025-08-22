import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// Nota: Grande parte das configurações de build(mais especificamente o manual chunks
// e o dropmode) foram escrito pela IA Junie, da Jetbrains
// https://vite.dev/config/
export default defineConfig(({mode}) => ({
    plugins: [
        react(),
        tsconfigPaths(),
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
                // Prefer dedicated chunks for core libs; merge the rest into a single vendor to avoid many tiny files
                manualChunks: (id) => {
                    const libs = [
                        {name: 'react', pkgs: ['react', 'react-dom']},
                        {name: 'mui', pkgs: ['@mui/material', '@mui/icons-material']},
                        {name: 'emotion', pkgs: ['@emotion/react', '@emotion/styled']},
                        {name: 'router', pkgs: ['react-router-dom']},
                    ]
                    const normalized = id.split('\\').join('/')
                    if (normalized.includes('node_modules')) {
                        for (const {name, pkgs} of libs) {
                            if (pkgs.some(pkg => normalized.includes(`node_modules/${pkg}/`))) return name
                        }
                        return 'vendor'
                    }
                    return undefined
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
