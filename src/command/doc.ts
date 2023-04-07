import { program } from 'commander'
import { execa } from 'execa'
import inquirer from 'inquirer'
import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'

export default () => {
  program
    .command('doc')
    .argument('[dir]', 'scanf dir', './')
    .option('-t, --test', 'test document')
    .action((dir, options) => {
      // execa()
    })
}
