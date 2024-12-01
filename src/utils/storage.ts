import store from "store2";

class Storage {
  //后缀标识
  suffix: string = "deadtime";

  /**
   * 获取
   * @param {string} key 关键字
   */
  get(key: string) {
    return store.get(key);
  }

  /**
   * 获取全部
   */
  info() {
    const d: any = {};
    store.each(function (key: any, value: any) {
      d[key] = value;
    });
    return d;
  }

  /**
   * 设置
   * @param {string} key 关键字
   * @param {*} value 值
   * @param {number} expires 过期时间，单位 秒
   */
  set(key: string, value: any, expires?: number) {
    if (expires) {
      store.set(key, value);

      if (expires) {
        //todo
        store.set(
          `${key}${this.suffix}`,
          Date.parse(String(new Date())) + expires * 1000
        );
      }
    }
  }

  /**
   * 获取到期时间
   * @param {string} key 关键字
   */
  getExpiration(key: string) {
    return this.get(key + this.suffix);
  }

  /**
   * 是否过期
   * @param key
   */
  isExpired(key: string) {
    return (
      (this.getExpiration(key) || 0) - Date.parse(String(new Date())) <= 2000
    );
  }

  /**
   * 移除到期时间
   * @param key
   */
  removeExpiration(key: string) {
    store.remove(key + this.suffix);
  }

  /**
   * 移除
   * @param key
   */
  remove(key: string) {
    store.remove(key);
    this.removeExpiration(key);
  }

  /**
   * 清理
   */
  clearAll() {
    store.clearAll();
  }
}

export default new Storage();
