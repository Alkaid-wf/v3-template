import { isString } from 'lodash';
import useDictStore from '@/stores/dict';
import type { Dict } from '@/stores/types';

/**
 * 获取指定字典
 * @param dictName
 * @returns Dict[]
 */
export const getDict = (dictName: string): Dict[] => useDictStore().dicts[dictName] || [];

/**
 * 获取并过滤字典
 * @param dictName
 * @param key
 * @param val
 * @returns Dict[]
 */
export const filterDict = (dict: string | any[], key: string, val?: any): Dict[] => {
  const list = isString(dict) ? getDict(dict) : dict;
  return list.filter((item) => (val ? item[key] === val : item[key]));
};

/**
 * 字典解析
 * @param dict
 * @param val
 * @returns string
 */
export const dictParse = (dict: string | Dict[], val: any): string => {
  const dictObj = l2o(isString(dict) ? getDict(dict) : dict);
  return dictObj[val] || '';
};
