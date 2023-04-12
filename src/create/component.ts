import fs from 'fs'

const TPL_VUE = `<template></template>\n
\n
<script setup lang="ts"></script>\n
\n
<style></style>`

export const createComponent = (name: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    createComponentFiles(name)
      .then(() => {
        resolve(undefined)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export const createComponentFiles = async (name: string) => {
  fs.mkdirSync(name)
  fs.writeFileSync(`${name}/index.vue`, TPL_VUE)
  fs.writeFileSync(`${name}/test.vue`, TPL_VUE)
}
