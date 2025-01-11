import cloneDeep from 'lodash/cloneDeep'
import { IRouteObj } from '@/types/user'

/**
 * 菜单列表转树形
 */
export function deepTree(list: any[]) {
  const map: any[] = []
  const result: any[] = []
  list.forEach((item) => {
    map[item.id] = { ...item }
  })

  list.forEach((item) => {
    if (item.parentId) {
      if (map[item.parentId].children) {
        map[item.parentId].children.push(map[item.id])
      } else {
        map[item.parentId].children = [map[item.id]]
      }
    } else {
      result.push(map[item.id])
    }
  })
  return result
}

/**
 * 点击菜单栏 -- 历史路径数据 标签高亮处理 LayoutHead
 */

export function getClickMenuTags(tags: Partial<IRouteObj>[], obj: Partial<IRouteObj> = {}) {
  // 是否增加历史纪录标签
  let arr = cloneDeep(tags)
  const flag = tags.find(e => e.id === obj.id)
  if (flag) {
    arr = arr.map(e => {
      e.active = e.id === flag.id
      return e
    })
  } else {
    arr = arr.map(e => ({ ...e, active: false }));
    (obj = { ...obj, active: true }) && arr.push(obj)
  }
  return arr
}


