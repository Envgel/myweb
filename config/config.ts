// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    // compact: true, // 开启紧凑主题
    // dark: true, // 开启暗色主题
  },
  dva: {
    hmr: true,
  },
  layout: {
    name: '',
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      'target': 'http://localhost:8080/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
});
