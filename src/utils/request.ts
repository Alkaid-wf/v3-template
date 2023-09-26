import axios, { type AxiosResponse } from 'axios';
import saveAs from 'file-saver';
import useUserStore from '@/stores/user';
import { ElMessageBox } from 'element-plus';

export const isRelogin = { show: false };
const { VITE_APP_BASE_URL } = import.meta.env;
const controller = new AbortController();

// 创建axios实例
const service = axios.create({
  baseURL: VITE_APP_BASE_URL,
  timeout: 6 * 1000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 重新登录弹窗存在时，阻止后续请求
    config.signal = controller.signal;
    if (isRelogin.show) controller.abort('');

    // 是否需要设置 token
    const needToken = config.headers?.needToken !== false;
    const token = getToken();
    if (token && needToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 是否需要防止数据重复提交
    const needRepeatSubmit = config.headers?.repeatSubmit !== false;

    // get请求映射params参数
    if (config.method === 'get' && Boolean(config.params)) {
      let url = `${String(config.url)}?${tansParams(config.params)}`;
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    if (needRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: Date.now()
      };

      // 阻止重复提交
      const sessionObj = session.getJSON('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        session.setJSON('sessionObj', requestObj);
      } else {
        const s_url: string = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ${message}`);
          return Promise.reject(new Error(message));
        } else {
          session.setJSON('sessionObj', requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;

    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') return res;
    else if (code === 200 || res.config.url === '/logout') return Promise.resolve(res.data);
    else {
      if (code === 401 && !isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          type: 'warning'
        })
          .then(() => useUserStore().toLogin())
          .finally(() => (isRelogin.show = false));
      }
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    let { message } = error;

    if (message === 'canceled') return { code: 0 };
    else if (message === 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      const code = String(message.slice(-3));
      message = code === '429' ? '您的操作频率过快，请稍后再试' : `系统接口 ${code} 异常`;
    }

    ElMessage.error(message);
    console.error(`err${String(error)}`, error);
    return Promise.reject(error);
  }
);

// 通用下载方法
export const download = (url: string, filename: string, params?: Record<string, any>): Promise<void> =>
  service
    .post(url, params, {
      transformRequest: [(params) => tansParams(params)],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob'
    })
    .then(async ({ data }: AxiosResponse) => {
      const isBlob = await blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const res = JSON.parse(resText);
        ElMessage.error(res.message);
      }
    })
    .catch((error: string) => {
      console.error(error);
      ElMessage.error('下载文件出现错误，请联系管理员！');
    });

export default service;
