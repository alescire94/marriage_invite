// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
    // dev -> '/', build -> '/marriage_invite/' (repo name on GitHub Pages)
    base: command === 'build' ? '/marriage_invite/' : '/',
    build: { outDir: 'dist' }
}))