/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  /**
   * dp的定义： 在i,j(棋盘的位置)得到的最大价值
   * 状态：m、n棋盘的位置 i < m, j < n
   * 选择：选择右边或者下边
   */
  // 创建一个m*n，每个元素都是0的二位数组
  const dp = new Array(m).fill().map(() => new Array(n).fill(0));
  // base状态
  dp[0][0] = grid[0][0];
  for (let index = 1; index < m; index++) {
    dp[index][0] = dp[index - 1][0] + grid[index][0]; // 垂直方向
  }
  for (let index = 1; index < n; index++) {
    // 水平方向
    dp[0][index] = dp[0][index - 1] + grid[0][index];
  }

  // 状态转移
  for (let index = 1; index < m; index++) {
    for (let j = 1; j < n; j++) {
      // index j = 当前grid[index][j] + max(左边, 上边)
      dp[index][j] =
        Math.max(dp[index - 1][j], dp[index][j - 1]) + grid[index][j];
    }
  }
  console.log(dp);
  return dp[m - 1][n - 1];
};

maxValue([
  [1, 2, 5],
  [3, 2, 1],
]);
