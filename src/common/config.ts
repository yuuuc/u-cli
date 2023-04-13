import fs from 'fs'
import path from 'path'
export const DefaultConfig = {
  create: {
    component: 'components'
  },
  webDoc: {
    root: 'webDoc',
    scanDir: 'components',
    scanName: 'test'
  }
}

export const customConfig = async () => {
  const configFiles = ['u.config.ts', 'u.config.js', 'u.config.json']
  // let c: typeof DefaultConfig | undefined = undefined
  const cf = configFiles.find((e) => {
    if (fs.existsSync(e)) return e
  })

  if (!cf) return
  const module = await import(path.resolve(process.cwd(), cf))
  // import(path.resolve(process.cwd())).then((module) => {
  //   global.uCustomConfig = module.default
  // })
  // if (cf.endsWith('ts') || cf.endsWith('js')) {
  //   c = _module.default
  // }
  // if (cf.endsWith('json')) {
  //   console.log(_module.default)
  // }

  return module.config
}
