// const map = new Map()
// map.set(1, 1)
// map.set(2, 2)
// console.log(map);
// map.set(3, 1)
// console.log(map);
// map.delete(1)
// console.log(map);
// let keys = map.keys()
// console.log(keys.next());
// console.log(keys.next());
// while (!keys.next().value) {
//   console.log(keys.next());
// }

/**
 * 保护最近访问的数据，访问了就放到最后面
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key)
      this.map.delete(key)
      this.map.set(key, value)
      return value
    }
    return -1
  }
  /**
   * 如果key存在就删除key，重新set一遍
   * 没有就看看容量够不够，如果不够就删除第一个
   * @param {any} key 
   * @param {any} value 
   * @returns 
   */
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    } else {
      const restLength = this.capacity - this.map.size
      if (restLength === 0) { // 如果没有空间了删除第一个
        const firstKey = this.map.keys().next().value
        this.map.delete(firstKey)
      }
    }
    this.map.set(key, value)
  }
}

lRUCache = new LRUCache(2)
lRUCache.put(1, 1);
lRUCache.put(2, 2)
console.log(lRUCache);
console.log(lRUCache.get(1))
console.log(lRUCache);
lRUCache.put(3, 3)
console.log(lRUCache);
console.log(lRUCache.get(2));
lRUCache.put(4, 4)
console.log(lRUCache);