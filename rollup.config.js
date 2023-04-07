import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import tsPlugin from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
const getPath = (_path) => path.resolve(__dirname, _path)
import { RollupOptions, defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

/**
 * @type { RollupOptions }
 */
const config = {
  input: './index.ts',
  output: {
    file: './dist/index.js',
    format: 'es',
    banner: '#!/usr/bin/env node'
  },
  plugins: [
    json(),
    // resolve({
    //   extensions
    // }),
    commonjs(),
    tsPlugin({
      tsconfig: getPath('./tsconfig.json')
    })
    // terser({})
  ]
}

const extensions = ['.js', '.ts']

export default config
