import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import css from 'rollup-plugin-import-css';
import externalGlobals from 'rollup-plugin-external-globals';
// https://vitejs.dev/config/

const PROJECT_NAME = 'ALLCPP Evolved';

const FILE_NAME = 'main.user.js';
const headerText = fs.readFileSync('./src/header.js').toString();
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: 'src/quasar-variables.scss',
      }),
      css(),
      externalGlobals({
        vue: 'Vue',
      }),
      header(headerText, mode === 'dev'),
    ],
    build: {
      outDir: 'dist',
      cssCodeSplit: true,
      minify: false,
      lib: {
        entry: 'src/main.js',
        formats: ['iife'],
        fileName: () => {
          return FILE_NAME;
        },
        name: FILE_NAME,
      },
      watch: mode === 'dev',
    },
  });
};

function header(text, dev = true) {
  return {
    name: 'vite-plugin-header',
    generateBundle(OutputOptions, ChunkInfo) {
      text = text.replace('$PROJECT_NAME$', PROJECT_NAME);
      let filename = String(OutputOptions.name).replace('dist/', '');
      ChunkInfo[filename].code = text + '\n' + ChunkInfo[filename].code;
      if (dev) {
        let index = String(text).lastIndexOf('// ==/UserScript==');
        let newText =
          text.slice(0, index) +
          `// @require     file:///${path.join(
            __dirname,
            '/dist/' + FILE_NAME
          )}\n` +
          text.slice(index);
        newText = newText.replace(PROJECT_NAME, PROJECT_NAME + ' [Dev]');
        if (!fs.existsSync('dist')) {
          fs.mkdirSync('dist');
        }
        fs.writeFileSync(
          path.join(__dirname, '/dist/' + FILE_NAME.replace('.js', '.dev.js')),
          newText
        );
        console.info('\nPut following code in your tampermonkey script: \n');
        console.log(newText);
      }
    },
  };
}
