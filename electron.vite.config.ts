import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import vitePluginImp from 'vite-plugin-imp'
import checker from 'vite-plugin-checker'

export default defineConfig({
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
})
