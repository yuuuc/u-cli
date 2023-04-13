import { describe, test, expect } from '@jest/globals'
import { createComponent, createTpl } from '../create'
import fs from 'fs'
import { rimrafSync } from 'rimraf'
import path from 'path'

describe('create', () => {
  test('create component', () => {
    const fileName = 'aaa'
    createComponent(fileName)
    expect(fs.existsSync(fileName)).toEqual(true)
    expect(fs.existsSync(path.resolve(fileName, 'index.vue'))).toEqual(true)
    expect(fs.existsSync(path.resolve(fileName, 'test.vue'))).toEqual(true)

    rimrafSync(fileName)
  })

  test('create template', async () => {
    const fileName = 'bbb'
    await createTpl({ type: 'web', name: fileName })
    expect(fs.existsSync(fileName)).toEqual(true)

    rimrafSync(fileName)
  })
})
