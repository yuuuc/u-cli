import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'

import { ConfigValue, tplTypeList } from '../types'
import { createTpl, createComponent } from '../create/index'

type createType = {
  component: boolean
  project: boolean
}

/**
 * create [name] 创建项目模板
 *
 * create -c [name] 创建组件模板
 *
 * create -p [name] 创建项目模板
 */
export default () => {
  program
    .command('create') // <name>
    .description('new-template')
    .argument('[name]', 'create project name', 'u')
    .option('-c, --component', 'create component package')
    .option('-p, --project', 'create project')
    .action((name, options: createType) => {
      if (options.component) {
        checkExist(name)
        createPendingHandle(createComponent(name))
      }
      if (options.project || Object.keys(options).length === 0) {
        inquirer
          .prompt<ConfigValue>([
            {
              name: 'name',
              message: '项目名称',
              type: 'input',
              default: name
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
            checkExist(name)
            createPendingHandle(createTpl(res))
          })
      }
    })
}

const createPendingHandle = (p: Promise<void>) => {
  const load = ora('creating').start()
  p.then(() => {
    console.log(chalk.greenBright('\n created!'))
  })
    .catch((e) => {
      console.log(chalk.redBright('\n ' + e.message))
    })
    .finally(() => {
      load.text = 'successful'
      load.succeed()
    })
}

const checkExist = (name: string) => {
  if (fs.existsSync(name)) {
    console.log(chalk.redBright('\n filename is created!'))
    // throw new Error(`${name} Dir is exist!`)
  }
}
