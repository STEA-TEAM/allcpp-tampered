/// <reference types="vite/client" />

export declare interface ProjectConfig {
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
