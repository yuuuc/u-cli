import request from 'request'
import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'

import { ConfigValue } from '../types'
import { uncompressFileRename } from '../fileHandle'
import tplData from '../../tpl.json'

const tplOpt: {
  [key in ConfigValue['type']]: string
} = tplData

export const createTpl = async ({ type, name }: ConfigValue) => {
  const load = ora('template creating').start()
  const tempFile = './temp.zip'
  const stream = fs.createWriteStream(tempFile)

  request
    .get(tplOpt[type])
    .pipe(stream)
    .on('close', function (err: string) {
      if (err) return console.log(err)
      uncompressFileRename(tempFile, `tpl-all-${type}`, name)
        .then(() => {
          modifyProjectPackageInfo(name)
          console.log(chalk.green(`\n created ${name} project!`))
        })
        .catch((e) => {
          console.log(chalk.red(`\n Error ${e.message}`))
        })
        .finally(() => {
          load.stop()
        })
    })
}

export const modifyProjectPackageInfo = (fileName: string) => {
  if (!fs.existsSync(fileName))
    return console.log(chalk.red(`\n ${fileName} Directory does not exist`))
  if (!fs.statSync(fileName).isDirectory())
    return console.log(chalk.red(`\n ${fileName} is not Directory`))
  const packageJsonPath = fileName + '/package.json'
  const packageJson = fs.readFileSync(packageJsonPath).toString('utf-8')
  const tempJson = JSON.parse(packageJson)
  tempJson.name = fileName
  fs.writeFileSync(packageJsonPath, JSON.stringify(tempJson, null, '\t'))
}
