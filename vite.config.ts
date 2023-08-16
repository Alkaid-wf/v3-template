import { join } from 'node:path';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import ViteRestart from 'vite-plugin-restart';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { presetAttributify, presetIcons, presetUno } from 'unocss';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const pathSrc = join(__dirname, 'src');

export default defineConfig({
  base: '/',

  resolve: { alias: { '@': pathSrc } },

  server: {
    port: 4444,
    host: true
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element.scss" as *;@use "@/styles/variable.scss" as *;`
      }
    }
  },

  plugins: [
    Vue({ reactivityTransform: true }),

    // 自动引入方法
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
      dirs: [join(pathSrc, 'utils'), join(pathSrc, 'api/*')],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass' }),
        // 自动导入图标组件
        IconsResolver({ prefix: 'Icon' })
      ],
      vueTemplate: true,
      dts: join(pathSrc, 'unplugin', 'auto-imports.d.ts')
    }),

    // 自动引入组件
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({ enabledCollections: ['tabler'] }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: 'sass' })
      ],
      dirs: [join(pathSrc)],
      dts: join(pathSrc, 'unplugin', 'components.d.ts')
    }),

    // 自动引入iconify 的 icon
    Icons({ autoInstall: true }),

    // 注册自定义icon
    createSvgIconsPlugin({ iconDirs: [join(pathSrc, 'assets/icon')], symbolId: 'icon-[name]' }),

    // 更改配置后自动重启服务
    ViteRestart({ restart: ['my.config.[jt]s'] }),

    // 压缩文件
    viteCompression({
      verbose: true,
      deleteOriginFile: false,
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),

    // UnoCSS
    UnoCSS({ presets: [presetAttributify(), presetIcons(), presetUno()] })
  ],

  build: {
    minify: 'terser',
    sourcemap: false,
    emptyOutDir: true,
    terserOptions: {
      // 打包时移除所有注释
      output: { comments: false },
      compress: {
        keep_infinity: true,
        drop_console: true
      }
    }
  }
});
