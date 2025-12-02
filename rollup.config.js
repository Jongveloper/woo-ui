import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const require = createRequire(import.meta.url);

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

const EXTERNAL_MODULES = ['react', 'react-dom', 'react/jsx-runtime'];
const SUPPORTED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const IGNORED_WARNING_CODES = ['MODULE_LEVEL_DIRECTIVE'];

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: SUPPORTED_EXTENSIONS,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
      }),
      postcss({
        extensions: ['.css'],
        plugins: [require('@tailwindcss/postcss')()],
        minimize: true,
        inject: false,
        extract: 'index.css',
      }),
      terser({
        format: {
          comments: false,
        },
      }),
    ],
    external: EXTERNAL_MODULES,
    onwarn(warning, warn) {
      if (IGNORED_WARNING_CODES.includes(warning.code)) {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'es',
    },
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*'],
          },
        },
      }),
    ],
    external: [/\.css$/],
  },
];

export default config;
