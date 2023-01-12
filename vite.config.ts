import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
// css
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
// icon
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import PurgeIcons from 'vite-plugin-purge-icons';
// Vite plugins state
import Inspect from 'vite-plugin-inspect';
// localhost https
import mkcert from 'vite-plugin-mkcert';
// analyze modules size
import { visualizer } from 'rollup-plugin-visualizer';
// pwa
import { VitePWA } from 'vite-plugin-pwa';
// html
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    Unocss({ presets: [presetUno()] }),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
          customCollections: ['custom'],
        }),
      ],
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      customCollections: {
        custom: FileSystemIconLoader('./src/assets/svg-icons'),
      },
    }),
    PurgeIcons({
      content: ['**/*.html', '**/*.js', '**/*.tsx'],
    }),
    mkcert({
      mkcertPath: './certs',
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'report.html',
    }) as PluginOption,
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Vite + React + TS',
        },
      },
    }),
  ],
  server: {
    host: true,
    https: true,
  },
});
