import useDictStore from './dict';

// #007db8
const defaultTheme = '#FF6A00';

export default defineStore('user', {
  state: () => ({
    loginUrl: '',
    token: getToken(),
    profile: { name: 'FGG' } as Record<string, any>,
    // 主题色
    theme: local.get('theme') || defaultTheme
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
      // 保存重定向地址（cas登录用）
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
    },

    /** 设置主题色 */
    setTheme(color: string) {
      const c = color || defaultTheme;
      this.theme = c;
      local.set('theme', c);
    }
  }
});
