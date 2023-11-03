export type BuildMode = 'production' | 'development';

export interface BuilPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuilPaths;
  isDev: boolean;
  port: number;
}
