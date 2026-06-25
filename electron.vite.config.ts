import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import tailwindcss from '@tailwindcss/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const root = resolve(__dirname)

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
        '@resources': resolve(root, 'resources')
      }
    }
  },
  preload: {
    resolve: {
      alias: {
        '@': resolve(root, 'src')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(root, 'src/renderer/src')
      }
    },
    plugins: [tailwindcss(), svelte()]
  }
})
