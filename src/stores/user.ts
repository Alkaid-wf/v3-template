import useDictStore from './dict';

export default defineStore('user', {
  state: () => ({
    loginUrl: '',
    token: getToken(),
    profile: {}
  }),

  actions: {
    /** 获取token */
    async getToken(code: string) {
      // const res = await loginToken({ code })
      // this.token = resHandle(res, '', () => {
      //   setToken(res.data as string)
      //   // 获取个人信息与字典
      //   this.getProfile()
      //   useDictStore().getDict()
      // })
      // return res.code === 200
    },

    /** 快去登录 */
    toLogin(redirect = '') {
      // 保存重定向地址 - jAccount重定向的地址无法携带参数（会导致认证异常）
      session.set('redirect', redirect);

      window.location.href = this.loginUrl;
    },

    /** 注销 */
    async logout() {
      // const res = await logout()
      // resHandle(res, '', () => {
      //   this.profile = {} as ProfileData
      //   this.token = ''
      //   removeToken()
      //   toLogin()
      // })
    },

    /** 获取用户个人信息 */
    async getProfile() {
      // this.profile = resHandle(await getProfile(), '')
    }
  }
});
