import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import PurgeIcons from 'vite-plugin-purge-icons';
import Inspect from 'vite-plugin-inspect';

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
  ],
});
