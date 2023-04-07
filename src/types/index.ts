export const tplTypeList = ['web', 'mini-taro', 'mini-uni', 'node'] as const
type TplTypeList = typeof tplTypeList[number]

export type ConfigValue = {
  name: string
  type: TplTypeList
}
