export const session = {
  set(key: string, value: any) {
    if (sessionStorage) sessionStorage.setItem(key, value);
  },

  get(key: string) {
    if (sessionStorage) return sessionStorage.getItem(key);
  },

  setJSON(key: string, jsonValue: any) {
    this.set(key, JSON.stringify(jsonValue));
  },

  getJSON(key: string) {
    const value = this.get(key);
    if (value) return JSON.parse(value);
  },

  remove(key: string) {
    sessionStorage.removeItem(key);
  }
};

export const local = {
  set(key: string, value: any) {
    if (localStorage) localStorage.setItem(key, value);
  },

  get(key: string) {
    if (localStorage) return localStorage.getItem(key);
  },

  setJSON(key: string, jsonValue: any) {
    this.set(key, JSON.stringify(jsonValue));
  },

  getJSON(key: string) {
    const value = this.get(key);
    if (value) return JSON.parse(value);
  },

  remove(key: string) {
    localStorage.removeItem(key);
  }
};
