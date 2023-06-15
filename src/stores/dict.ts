import type { DictCollection } from './types';

export default defineStore('dict', {
  state: () => ({
    base: {},
    // session直取，解决刷新时字典等待接口导致的解析问题
    remote: session.getJSON('dicts') || {}
  }),

  getters: {
    dicts: ({ base, remote }): DictCollection => ({ ...base, ...remote })
  },

  actions: {
    getDict() {
      // getAllDict().then(res => {
      //   this.remote = resHandle(res, '')
      //   session.setJSON('dicts', this.remote)
      // })
    }
  }
});
