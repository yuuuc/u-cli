import fs from 'fs'

const TPL_VUE = `<template></template>\n
\n
<script setup lang="ts"></script>\n
\n
<style scoped></style>`

export const createComponent = (name: string): Promise<void> => {
  fs.mkdirSync(name)
  fs.writeFileSync(`${name}/index.vue`, TPL_VUE)
  fs.writeFileSync(`${name}/test.vue`, TPL_VUE)
  return Promise.resolve(undefined)
}
