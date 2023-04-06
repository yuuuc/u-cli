import { program } from 'commander'
import inquirer from 'inquirer'
import request from 'request'
import fs from 'fs'
import compressing from 'compressing'
import ora from 'ora'
import tplData from './tpl.json'

const tplOpt: {
  [key in ConfigValue['type']]: string
} = tplData

type ConfigValue = {
  name: string
  type: 'web' | 'mini'
}

program.version('1.0.0')
program
  .command('create') // <name>
  .description('new-template')
  .action((name) => {
    inquirer
      .prompt<ConfigValue>([
        {
          name: 'name',
          message: '项目名称',
          type: 'input'
        },
        {
          name: 'type',
          message: '模板类型',
          type: 'rawlist',
          choices: ['web', 'mini'],
          default: 'web'
        }
      ])
      .then((res) => {
        const load = ora('template creating').start()
        const { type, name } = res
        if (fs.existsSync(name)) return console.log('filename is created!')
        const tempFile = './temp.zip'
        const stream = fs.createWriteStream(tempFile)
        request
          .get(tplOpt[type])
          .pipe(stream)
          .on('close', function (err: string) {
            if (err) return console.log(err)
            compressing.zip
              .uncompress(tempFile, './')
              .then((res) => {
                fs.renameSync(`tpl-all-${type}`, name)
                console.log('\ncreate over')
              })
              .catch((e) => {
                console.log(e)
              })
              .finally(() => {
                fs.rmSync(tempFile)
                load.stop()
              })
          })
      })
  })

program.parse(process.argv)
