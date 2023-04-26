/// <reference types="vite/client" />

/* eslint-disable */
declare namespace NodeJS {
  // noinspection JSUnusedGlobalSymbols
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
