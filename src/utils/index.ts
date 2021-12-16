import { PagingDto } from 'src/dto/paging.dto';
import { FindManyOptions } from 'typeorm';

/**
 * 把字符串中的关键字用具体的值替换
 * 1. 通过正则获取字符串的关键字
 * 2. 把{{关键字}}，替换成实际值
 *
 * @param merge 能够被替换的参数对象
 * @param str 原始字符串，含有 {{[a-zA-z]*}} 的字符串
 * @returns
 */
export function replaceValue(merge: any, str: string) {
  const reg = new RegExp(/{{([A-Za-z]*)}}/, 'g');
  let xArray;
  while ((xArray = reg.exec(str))) {
    const [_, key] = xArray;
    str = str.replace(`{{${key}}}`, merge[key]);
  }
  return str;
}

export function deepClone(obj) {
  const newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] =
          obj && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
      }
    }
  }
  return newObj;
}

/**
 * 合并分页到查询条件中
 * @param findOptions
 * @param pagingDto
 * @returns
 */
export function mergePaging<T>(
  findOptions: FindManyOptions<T>,
  pagingDto?: PagingDto,
) {
  const { page, pageSize } = pagingDto;
  const take = pageSize ? parseInt(`${pageSize}`) : 10;
  const skip = page ? (parseInt(`${page}`) - 1) * parseInt(`${pageSize}`) : 0;
  if (!findOptions) {
    findOptions = {};
  }
  findOptions.take = take;
  findOptions.skip = skip;

  return findOptions;
}

// Helper
// const stringIsNumber = (value) => isNaN(Number(value)) === false;

// Turn enum into array
export function enumToArray(enumme) {
  return (
    Object.keys(enumme)
      // .filter(stringIsNumber)
      .map((key) => enumme[key])
  );
}

/**
 * 下划线转换驼峰
 * @param name
 * @returns
 */
export function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 驼峰转换下划线
 * @param name
 * @returns
 */
export function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}
