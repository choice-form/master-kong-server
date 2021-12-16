/**
 * 按每组数量对数组进行分组
 * @param data 数组
 * @param cols 分组每组个数
 * @returns
 */
export function grouping<T>(data: T[], cols: number): T[][] {
  const list: T[][] = [];
  let current: T[] = [];

  data.forEach((d) => {
    current.push(d);
    if (current.length === cols) {
      list.push(current);
      current = [];
    }
  });
  if (current.length) {
    list.push(current);
  }
  return list;
}
