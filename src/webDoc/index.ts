import { DefaultConfig } from '../common/index'
import { template } from './config/template'
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import { execa } from 'execa'
import { platform } from 'os'
import { rimrafSync } from 'rimraf'

/**
 * 文件绝对路径
 * @param name 文件名
 * @returns
 */
const pathResolve = (name?: string) => {
  const webDoc = webDocDefaultConfig()
  return path.resolve(process.cwd(), webDoc.root + (name ? `/${name}` : ''))
}

/**
 * webDoc 配置
 * @returns
 */
const webDocDefaultConfig = () => {
  const { root, scanDir, scanName } = DefaultConfig.webDoc
  return {
    root,
    scanDir,
    scanName
  }
}

type webDocConfig = typeof DefaultConfig.webDoc

/**
 * 目录初始化
 */
export const init = (dir: string, webDoc: webDocConfig) => {
  const component_test_dir = path.resolve(process.cwd(), dir)
  const component_list = fs.readdirSync(component_test_dir)
  // 判断文件是否存在
  if (fs.existsSync(pathResolve())) {
    rimrafSync(pathResolve())
    // fs.rmdirSync(pathResolve())
    // if (fs.statSync(pathResolve()).isDirectory()) {
    //   startViteWeb()
    // } else {
    //   console.log(chalk.redBright(`${config.root} is not a dir!`))
    // }
  }
  const load = ora('init web doc...').start()
  createBaseEnv(component_list, webDoc)
  load.stop()
  startViteWeb()
}

/**
 * 创建基础依赖环境
 * webDoc |- index.html
 *        |- mian.ts
 *        |- App.ts
 *        |- router.ts ?
 */
const createBaseEnv = (l: string[], webDoc: webDocConfig) => {
  fs.mkdirSync(pathResolve())
  fs.writeFileSync(pathResolve('index.html'), template.html)
  fs.writeFileSync(pathResolve('main.ts'), template.mian_ts)
  fs.writeFileSync(
    pathResolve('App.vue'),
    template.app_vue(createScript(l, webDoc))
  )
  fs.writeFileSync(
    pathResolve('vite.config.ts'),
    template.vite_config(webDoc.root)
  )
}

/**
 * 生成 App 中的 script 内容
 * @param list @type { string[] }
 */
const createScript = (list: string[], webDoc: webDocConfig): string => {
  // 生成响应式数据
  const createMenuRef = (): string => {
    let components_obj_str = ''
    const nsList = `[${list.reduce((t, e, i) => {
      const dot = i !== list.length - 1 ? ',' : ''
      components_obj_str += `'${e}': ${e}` + dot
      return (t += `'${e}'` + dot)
    }, '')}]`
    return `const menuList = ref(${nsList})
    const c = ref(${list[0]})
    const co = {${components_obj_str}};
    `
  }

  /**
   * 生成头部导入
   * @param name @type { string }
   * @returns
   */
  const createImportRow = (name: string): string => {
    const c = `./${name}/${webDoc.scanName}.vue`
    let p: string
    // windows
    if (/^win/.test(platform())) {
      p = path.posix.join(...path.resolve(webDoc.scanDir, c).split(path.sep))
    } else {
      // mac 兼容
      p = path.resolve(webDoc.scanDir, c)
    }
    return `import ${name} from "${p}"\n`
  }

  // 生成事件函数
  const createEventHandle = () => {
    return `
    const menuHandle = (name: string) => {
      if(c.value === co[name]) return
      c.value = co[name]
    }
    `
  }

  let scriptStr = `import { ref } from 'vue';\n`
  // 生成import
  list.forEach((e) => {
    scriptStr += createImportRow(e)
  })
  scriptStr += createMenuRef()
  scriptStr += createEventHandle()
  return scriptStr
}

/**
 * 启动 ViteWeb
 */
const startViteWeb = async () => {
  const webDoc = webDocDefaultConfig()
  await execa(`npx vite --config ./${webDoc.root}/vite.config.ts`, undefined, {
    stdout: 'inherit',
    stderr: 'ignore'
  })
}
