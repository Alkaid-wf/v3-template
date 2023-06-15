import Cookies from 'js-cookie';

const TokenKey = 'ITEM-Token';

export const getToken = (): string | undefined => Cookies.get(TokenKey);

export const setToken = (token: string): string | undefined => Cookies.set(TokenKey, token);

export const removeToken = (): void => Cookies.remove(TokenKey);
