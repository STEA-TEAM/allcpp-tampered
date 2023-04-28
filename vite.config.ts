import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath, URL } from 'node:url';
import { join } from 'path';
import type {
  NormalizedOutputOptions,
  OutputBundle,
  OutputChunk,
} from 'rollup';
import sass from 'rollup-plugin-sass';
import { defineConfig } from 'vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';

interface ProjectConfig {
  name?: string;
  namespace?: string;
  copyright?: string;
  version?: string;
  description?: string;
  icon?: string;
  icon64?: string;
  grant?: string[];
  author?: string;
  homepage?: string;
  antifeature?: string[];
  require?: string[];
  resource?: string[];
  include?: string[];
  match?: string[];
  exclude?: string[];
  'run-at'?:
    | 'document-start'
    | 'document-body'
    | 'document-end'
    | 'document-idle'
    | 'context-menu';
  sandbox?: 'raw' | 'javascript' | 'DOM';
  connect?: string[];
  noframes?: boolean;
  updateURL?: string;
  downloadURL?: string;
  supportURL?: string;
  webRequest?: JSON;
  unwrap?: boolean;
}

const packageJson = JSON.parse(readFileSync('./package.json').toString());

const FILE_NAME = `${packageJson.name}.user.js`;

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ mode }) => ({
  build: {
    cssCodeSplit: true,
    cssMinify: mode !== 'development',
    lib: {
      entry: './src/main.ts',
      fileName: () => FILE_NAME,
      formats: ['iife'],
      name: FILE_NAME,
    },
    minify: mode !== 'development',
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
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/assets/quasar-variables.scss',
    }),
    sass({ options: { indentedSyntax: false, outputStyle: 'compressed' } }),
    header(mode === 'development'),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));

function header(dev: boolean) {
  // noinspection JSUnusedGlobalSymbols
  return {
    name: 'vite-plugin-header',
    generateBundle(
      outputOptions: NormalizedOutputOptions,
      outputBundle: OutputBundle
    ) {
      const config = JSON.parse(readFileSync('./src/config.json').toString());
      config.name = config.name ?? packageJson.name ?? 'Tamper Vite';
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

      const outputChunk = <OutputChunk>(
        outputBundle[String(outputOptions.name).replace('dist/', '')]
      );
      outputChunk.code = parseConfig(config) + outputChunk.code;

      if (dev) {
        config.name = config.name + ' [Dev]';
        delete config.updateURL;
        delete config.downloadURL;
        if (config.require === undefined) {
          config.require = [];
        }
        config.require.push(`file:///${join(__dirname, '/dist/' + FILE_NAME)}`);
        const parsedConfig = parseConfig(config);
        if (!existsSync('dist')) {
          mkdirSync('dist');
        }
        writeFileSync(
          join(__dirname, '/dist/' + FILE_NAME.replace('.js', '.dev.js')),
          parsedConfig + outputChunk.code
        );
        console.info('\nPut following code in your tampermonkey script: \n');
        console.log(parsedConfig);
      }
    },
  };
}

function parseConfig(config: ProjectConfig) {
  let result = '// ==UserScript==\n';
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
  result += '// ==/UserScript==\n';
  return result;
}
