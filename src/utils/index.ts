import { ElMessage, ElMessageBox } from 'element-plus';
import saveAs from 'file-saver';
import type { Def } from '@/api/types';

/**
 * 参数处理
 * @param {Record<string, any>} params  参数
 */
export const tansParams = (params: Record<string, any>): string => {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          const params = `${propName}[${key}]`;
          const subPart = `${encodeURIComponent(params)}=`;
          result += `${subPart + encodeURIComponent(value[key])}&`;
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
};

/**
 * 处理接口返参
 * @param res 返回数据
 * @param successMsg 成功时的toast信息
 * @param callback 回调函数
 * @returns
 */
export const resHandle = <T>(res: Def, successMsg = '操作成功', callback?: (res: Def) => void): T => {
  if (res.code === 200) {
    if (callback) callback(res);
    if (successMsg) ElMessage.success(successMsg);
  } else ElMessage.error(res.message);
  return res?.data;
};

/**
 * list转obj
 * @param list
 * @param k
 * @param v
 * @returns
 */
export const l2o = (list: any[], k = 'id', v = 'name'): Record<string, string> => {
  const obj: Record<string, string> = {};
  list.forEach((item) => {
    obj[item[k]] = item[v] || item[k];
  });
  return obj;
};

/**
 * list转str（数组非空内容拼接）
 * @param list 任意值（0, -0, false, '', null, undefined, NaN 将被过滤）
 * @param separator 分隔符
 * @returns
 */
export const list2str = (list: any[], separator?: string): string => {
  return list.filter(Boolean).join(separator);
};

/**
 * 下载base64
 * @param base64
 * @param title
 */
export const downloadBase64 = (base64: string, title: string) => {
  const byteCharacters = atob(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
  const byteNumbers: any[] = Array.from({ length: byteCharacters.length });
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);
  saveAs(blob, `${title}.jpg`);
};

/**
 * 复制字符串到剪贴板
 * @param source
 */
export const clipboard = (source: string) => {
  const { copy, isSupported } = useClipboard({ source, legacy: true });
  if (isSupported) {
    copy(source);
    ElMessage.success('已复制到剪贴板');
  } else {
    ElMessage.error('浏览器不支持');
  }
};

/**
 * 删除数据方法封装
 * @param id
 * @param FUN
 * @param queryFun
 * @param msg
 */
export const del = (id: number, FUN: (id: number) => Promise<any>, queryFun: () => void | Promise<void>, msg = '') => {
  ElMessageBox.confirm(msg, '删除确认').then(async () => {
    resHandle(await FUN(id));
    queryFun();
  });
};

/**
 * 导出数据弹窗
 * @param url
 * @param title
 */
export const exportData = (url: string, title: string, params?: Record<string, any>) => {
  const inputValue = title;

  ElMessageBox.prompt('文件名称', '导出数据', {
    inputValue,
    inputPlaceholder: '请输入',
    inputPattern: /^.+$/,
    inputErrorMessage: '文件名称不能为空',
    closeOnClickModal: false
  }).then(({ value }: { value: string }) => download(url, `${value}.xlsx`, params));
};

/** 返回页面顶部 */
export const toTop = () => {
  const el = document.querySelector('.layout__scrollbar-view');
  el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * 打开新标签页
 * @param url
 * @returns
 */
export const goBlank = (url: string) => window.open(url, '_blank');
