import { paramCase } from 'change-case';
import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import type {
  NormalizedOutputOptions,
  OutputBundle,
  OutputChunk,
} from 'rollup';
// import postcss from 'rollup-plugin-postcss'
import { defineConfig } from 'vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';

import type { ProjectConfig } from './env';

const config = JSON.parse(fs.readFileSync('./src/config.json').toString());
const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

config.name = config.name ?? packageJson.name ?? 'Tamper Vite';

const FILE_NAME = `${paramCase(config.name)}.user.js`;

config.copyright =
  config.copyright ?? `License: ${packageJson.license ?? 'None'}`;
config.version = config.version ?? packageJson.version;
config.description = config.description ?? packageJson.description;
config.author = config.author ?? packageJson.author;
config.homepage = config.homepage ?? packageJson.homepage;
config['run-at'] = config['run-at'] ?? 'document-start';
config.updateURL =
  config.updateURL ??
  `${packageJson.repository.url}/releases/latest/download/${FILE_NAME}`;
config.downloadURL = config.downloadURL ?? config.updateURL;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: './src/main.ts',
      fileName: () => FILE_NAME,
      formats: ['iife'],
      name: FILE_NAME,
    },
    watch:
      mode === 'development'
        ? {
            clearScreen: true,
          }
        : null,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  plugins: [
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
    vue({
      template: { transformAssetUrls },
    }),
    // externalGlobals({
    //   vue: 'Vue'
    // }),
    header(config, mode === 'development'),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));

function header(config: ProjectConfig, dev: boolean) {
  return {
    name: 'vite-plugin-header',
    generateBundle(
      outputOptions: NormalizedOutputOptions,
      outputBundle: OutputBundle
    ) {
      const outputChunk = <OutputChunk>(
        outputBundle[String(outputOptions.name).replace('dist/', '')]
      );
      outputChunk.code = parseConfig(config) + outputChunk.code;

      if (dev) {
        config.name = config.name + ' [Dev]';
        if (config.require === undefined) {
          config.require = [];
        }
        config.require.push(
          `file:///${path.join(__dirname, '/dist/' + FILE_NAME)}`
        );
        const parsedConfig = parseConfig(config);
        if (!fs.existsSync('dist')) {
          fs.mkdirSync('dist');
        }
        fs.writeFileSync(
          path.join(__dirname, '/dist/' + FILE_NAME.replace('.js', '.dev.js')),
          parsedConfig + outputChunk.code
        );
        console.info('\nPut following code in your tampermonkey script: \n');
        console.log(parsedConfig);
      }
    },
  };
}

function parseConfig(config: ProjectConfig) {
  let result = `// ==UserScript==\n`;
  for (const [key, value] of Object.entries(config)) {
    if (value) {
      if (Array.isArray(value)) {
        for (const item of value) {
          result += `// @${key} ${item}\n`;
        }
      } else if (typeof value === 'boolean') {
        result += `// @${key}\n`;
      } else {
        result += `// @${key} ${value}\n`;
      }
    }
  }
  result += `// ==/UserScript==\n`;
  return result;
}
