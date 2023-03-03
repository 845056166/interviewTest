/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  /**
 * 状态：当前所在的数组索引
 * 选择：当前索引抢不抢
 * @param {*} nums 
 * @param {*} start 开始位置
 * @returns 
 */
  function dp(nums, start) {
    if (start > nums.length - 1) {
      return 0
    }
    // 如果之前存在直接取，不用递归
    if (map.has(start)) return map.get(start)
    const res = Math.max(
      dp(nums, start + 1), // 当前这个不抢、去下家
      nums[start] + dp(nums, start + 2) // 抢
    )
    // 记录之前计算的值
    map.set(start, res)
    return res
  }
  const map = new Map()
  return dp(nums, 0)
};


console.time('rob');
const res = rob([2, 7, 9, 3, 1]) // 4
console.log(res);
console.timeEnd('rob')

