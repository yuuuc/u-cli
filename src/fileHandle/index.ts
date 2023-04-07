import fs from 'fs'
import compressing from 'compressing'

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
        console.log(e)
      })
      .finally(() => {
        fs.rmSync(tempFile)
      })
  })
}
