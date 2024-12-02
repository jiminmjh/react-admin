/** 菜单列表转树形 */
export function deepTree(list: any[]) {
  const map: any[] = [];
  const result: any[] = [];

  list.forEach((item) => {
    map[item.id] = { ...item };
  });

  list.forEach((item) => {
    if (item.parentId) {
      if (map[item.parentId].children) {
        map[item.parentId].children.push(map[item.id]);
      } else {
        map[item.parentId].children = [map[item.id]];
      }
    } else {
      result.push(map[item.id]);
    }
  });
  return result;
}
