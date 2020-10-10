// rollup.config.js
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    name: 'pubSub',
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
}
