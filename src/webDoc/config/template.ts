export const template = {
  html: `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>#title#</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
  `,
  mian_ts: `
  import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
`,
  app_vue: (script: string, template = '<component :is="c"></component>') =>
    `<script setup lang="ts">
    ${script}
    </script>
<template>
<div class="container">
<div class="menu">
  <div class="menu-item" v-for="item in menuList" @click="menuHandle(item)"> {{item}} </div>
</div>
 <div class="content">
  ${template}
 </div>
</div>
</template>
<style>
html,body,html,div,p {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  width: 100vw;
}
.menu {
  width: 266px;
  box-sizing: border-box;
  padding-left: 12px
}
.menu-item {
  height: 40px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
}
.content {
  flex: 1;
  padding: 12px;
}
</style>
  `,
  vite_config: (root: string) => {
    return `
    import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  root: '${root}',
  base: './',
  plugins: [vue()],
  server: {
    port: 5999
  }
})
`
  }
}
