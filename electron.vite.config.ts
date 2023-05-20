import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import { resolve } from 'path'
import checker from 'vite-plugin-checker'
import vitePluginImp from 'vite-plugin-imp'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode)

  return {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [
        react(),
        tsconfigPaths(),
        checker({
          typescript: true
        }),
        vitePluginImp({
          libList: [
            {
              libName: 'antd',
              style: (name: string) => {
                if (name === 'col' || name === 'row') {
                  return 'antd/lib/style/index.js'
                }
                return `antd/es/${name}/style/index.js`
              }
            }
          ]
        })
      ]
    }
  }
})
