import { program } from 'commander'
// import { execa } from 'execa'
// import inquirer from 'inquirer'
import { init } from '../webDoc'
import { DefaultConfig } from '../common'
// import ora from 'ora'
// import chalk from 'chalk'

export default () => {
  program
    .command('webDoc')
    .argument('[dir]', 'scanf dir', './components')
    .option('-t, --test', 'test document')
    .action((dir, options) => {
      init(dir, DefaultConfig.webDoc)
    })
}
