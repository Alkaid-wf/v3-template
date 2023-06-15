/** 是否为手机登录 */
export const isMobile: boolean =
  /(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone)/i.test(
    navigator.userAgent
  );

/**
 * 是否为blob格式
 * @param {*} data
 * @returns {Boolean}
 */
export const blobValidate = async (data: any): Promise<boolean> => {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch {
    return true;
  }
};

/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export const isHttp = (url: string): boolean => {
  return url.includes('http://') || url.includes('https://');
};

/** 手机号正则 */
export const mobileReg = /^1[3-9|]\d{9}$/;

/**
 * 校验手机号
 * @param {string} mobile
 * @returns {Boolean}
 */
export const mobileValid = (mobile: string): boolean => mobileReg.test(mobile);

/** 邮箱正则 */
export const emailReg = /^([\dA-Za-z][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;

/**
 * 校验邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export const emailValid = (email: string): boolean => emailReg.test(email);
