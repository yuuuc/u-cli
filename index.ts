import { program } from 'commander'
import create_command from './src/command/create'

program.version('1.0.0')
create_command()

// program
//   .command('create-component <name>')
//   .description('创建组件')
//   .action((name) => {
//     console.log(name, '创建组件')
//   })

program.parse(process.argv)
