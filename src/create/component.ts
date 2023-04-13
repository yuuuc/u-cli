import fs from 'fs'

const TPL_VUE = `<template></template>\n
\n
<script setup lang="ts"></script>\n
\n
<style scoped></style>`

export const createComponent = (name: string, dir: string): Promise<void> => {
  if (fs.existsSync(dir)) return Promise.reject(`${dir} dir is not exists`)
  const createDir = `${dir}/${name}`
  fs.mkdirSync(createDir)
  fs.writeFileSync(`${createDir}/index.vue`, TPL_VUE)
  fs.writeFileSync(`${createDir}/test.vue`, TPL_VUE)
  return Promise.resolve(undefined)
}
