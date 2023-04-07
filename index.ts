import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import chalk from 'chalk'

import { ConfigValue, tplTypeList } from './src/types'
import { createTpl } from './src/tplDownload'

program.version('1.0.0')
program
  .command('create') // <name>
  .description('new-template')
  .action(() => {
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
          choices: tplTypeList,
          default: 'web'
        }
      ])
      .then((res) => {
        const { name } = res
        if (fs.existsSync(name))
          return console.log(chalk.bgRed('\n filename is created!'))
        createTpl(res)
      })
  })

program.parse(process.argv)
