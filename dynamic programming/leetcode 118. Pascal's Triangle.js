class Solution {
    generate = function(numRows) {
        // 初始化二維陣列 (行數 = numRows)
        let dp = [];
        
        // 創建每行基礎結構 (全1陣列)
        for(let i = 0; i < numRows; i++) {
            dp[i] = new Array(i + 1).fill(1); // 第i行有i+1個元素
        }

        // 優化：只有一行時直接返回
        if (numRows === 1) return dp;

        // 動態規劃填值 (從第2行開始)
        for(let i = 1; i < numRows; i++) {         // i: 當前行索引
            for(let j = 0; j < dp[i].length; j++) { // j: 當前列索引
                // 只處理中間元素 (排除首尾)
                if (j > 0 && j < dp[i-1].length) {  // 關鍵條件：
                    dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; // 左上 + 上方
                }
            }
        }

        return dp;
    }
}

// 自己做出來的

// 測試範例
let numRows = 5;

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.generate(numRows));
/*
LeetCode 118: 楊輝三角生成

題目翻譯：
給定一個非負整數 numRows，生成前 numRows 行的楊輝三角(Pascal's Triangle)。

楊輝三角特性：
1. 每行首尾元素為 1
2. 中間元素 = 上一行左上方元素 + 上一行正上方元素
3. 行數從 0 開始計算

解題思路與拆解：
1. 初始化結構：
   - 創建二維陣列 dp 儲存結果
   - 每行初始化為全 1 (滿足首尾為 1 的特性)

2. 動態填值：
   - 從第 2 行(索引 1)開始處理中間元素
   - 每個元素 dp[i][j] = dp[i-1][j-1] + dp[i-1][j]

3. 邊界處理：
   - 當 numRows=1 時直接返回
   - 內層循環跳過首尾元素 (保持為 1)

時間複雜度：O(n²)
空間複雜度：O(n²) (儲存完整三角結構)

// 測試案例解析

輸入：numRows = 5
生成過程：
1. 初始化 5 個全1陣列：
   [
     [1],
     [1,1],
     [1,1,1],
     [1,1,1,1],
     [1,1,1,1,1]
   ]
2. 填充中間值：
   第2行(i=1): 無需處理 (長度2無中間值)
   第3行(i=2):
     j=1 → dp[2][1] = dp[1][0] + dp[1][1] = 1+1=2
   第4行(i=3):
     j=1 → dp[3][1] = dp[2][0] + dp[2][1] = 1+2=3
     j=2 → dp[3][2] = dp[2][1] + dp[2][2] = 2+1=3
   第5行(i=4):
     j=1 → 1+3=4
     j=2 → 3+3=6
     j=3 → 3+1=4
最終結果：
[
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1]
]
*/