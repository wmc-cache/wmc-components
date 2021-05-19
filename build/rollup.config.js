import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
//插件可以告诉 Rollup 如何查找外部模块
import { name } from '../package.json'
const file = type => `dist/${name}.${type}.js`
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["tests/**/*.ts", "tests/**/*.tsx"]
}
export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' })
  ],
  external: ['vue', 'lodash-es']
}