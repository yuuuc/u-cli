import request from 'request'
import fs from 'fs'
import compressing from 'compressing'
import { ConfigValue } from '../types'
import tplData from '../../tpl.json'
import chalk from 'chalk'

const tplOpt: {
  [key in ConfigValue['type']]: string
} = tplData

export const createTpl = ({ type, name }: ConfigValue): Promise<void> => {
  return new Promise((resolve, reject) => {
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
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      })
  })
}

export const modifyProjectPackageInfo = (fileName: string) => {
  // if (!fs.existsSync(fileName))
  //   throw new Error(`\n ${fileName} Directory does not exist`)
  if (!fs.statSync(fileName).isDirectory())
    return console.log(chalk.redBright(`\n ${fileName} is not d directory`))
  // throw `\n ${fileName} is not d directory`
  const packageJsonPath = fileName + '/package.json'
  const packageJson = fs.readFileSync(packageJsonPath).toString('utf-8')
  const tempJson = JSON.parse(packageJson)
  tempJson.name = fileName
  fs.writeFileSync(packageJsonPath, JSON.stringify(tempJson, null, '\t'))
}

export const uncompressFileRename = (
  tempFile: string,
  oldName: string,
  newName: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    compressing.zip
      .uncompress(tempFile, './')
      .then((res) => {
        fs.renameSync(oldName, newName)
        resolve(undefined)
      })
      .catch((e) => {
        reject(e)
      })
      .finally(() => {
        fs.rmSync(tempFile)
      })
  })
}
