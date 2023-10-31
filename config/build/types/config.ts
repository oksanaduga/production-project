export type BuildMode = 'production' | 'development';

export interface BuilPaths {
  entry: string;
  build: string;
  html: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuilPaths;
  isDev: boolean;
}