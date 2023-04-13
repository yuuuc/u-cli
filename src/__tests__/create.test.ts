import { describe, test, expect } from '@jest/globals'
import { createComponent, createTpl } from '../create'
import fs from 'fs'
import { rimrafSync } from 'rimraf'
import path from 'path'

describe('create', () => {
  test('create component', () => {
    const fileName = 'aaa'
    const scanDir = 'components'
    const cDir = scanDir + '/' + fileName
    fs.mkdirSync(scanDir)
    createComponent(fileName, scanDir)
    expect(fs.existsSync(cDir)).toEqual(true)
    expect(fs.existsSync(path.resolve(cDir, 'index.vue'))).toEqual(true)
    expect(fs.existsSync(path.resolve(cDir, 'test.vue'))).toEqual(true)
    rimrafSync(scanDir)
  })

  // test('create ')

  test('create template', async () => {
    const fileName = 'bbb'
    await createTpl({ type: 'web', name: fileName })
    expect(fs.existsSync(fileName)).toEqual(true)

    rimrafSync(fileName)
  })
})
