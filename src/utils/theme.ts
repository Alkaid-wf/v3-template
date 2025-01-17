/** 颜色混合器 */
const mix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  const _r = ('0' + (r || 0).toString(16)).slice(-2);
  const _g = ('0' + (g || 0).toString(16)).slice(-2);
  const _b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + _r + _g + _b;
};

/** 变更主题色 */
export const changeTheme = (color: string) => {
  const root = document.documentElement;
  const pre = '--el-color-primary';
  const mixWhite = '#ffffff';

  // 覆盖主题色相关色阶
  root.style.setProperty(pre, color);
  for (let i = 1; i < 10; i += 1) {
    root.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1));
  }

  root.style.setProperty(`${pre}-dark-${2}`, mix(color, '#000000', 2 * 0.1));
};
