from typing import List
import math

class Solution:
    def numSquares(self, n: int) -> int:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = i  # 最壞情況，用 i 個 1 相加
            for j in range(1, int(math.sqrt(i)) + 1):
                square = j * j
                dp[i] = min(dp[i], dp[i - square] + 1)
            # print(dp[i]) # 這行可能用於調試，打印每個 i 對應的最小完全平方數個數
        return dp[n]

# 測試範例
n = 12

# 創建 Solution 的實例
solution = Solution()

print(solution.numSquares(n))

'''
LeetCode 279: 完全平方數 (Perfect Squares) (Python 實現)

題目翻譯：
給定一個正整數 n，找出最少數量的完全平方數（例如 1, 4, 9, 16, ...）的總和等於 n。

題目需求：
1. 找到最少數量的完全平方數，其和等於給定的正整數 `n`。
2. 完全平方數是指可以表示為某個整數的平方的數。

解題思路與拆解：
1. 問題分析：
   - 這是一個求最優解的問題，可以使用動態規劃來解決。
   - 我們需要找到將 `n` 表示為最少個完全平方數之和的方法。

2. 解題方法選擇：
   - 方法一：動態規劃 (Dynamic Programming) (本解法採用) - 時間 O(n * sqrt(n))，空間 O(n)
   - 方法二：數學方法 (四平方和定理、拉格朗日四平方定理) - 更複雜，但可能更高效

3. 解題步驟 (動態規劃方法)：
   - 定義 DP 陣列：
     - `dp[i]` 代表數字 `i` 最少可以由多少個完全平方數相加得到。
   - 初始化 DP 陣列的基礎情況：
     - `dp[0] = 0`，表示 0 可以由 0 個完全平方數相加得到。
     - 對於 `i > 0`，我們初始化 `dp[i] = i`。這是最壞的情況，即將 `i` 表示為 `i` 個 1 相加（1 是完全平方數）。
   - 狀態轉移方程式：
     - 對於每個數字 `i`（從 1 到 `n`），我們遍歷所有小於等於 `i` 的完全平方數 `j*j`（其中 `j` 從 1 開始）。
     - 對於每個完全平方數 `j*j`，我們可以考慮是否使用它來組成 `i`。如果我們使用了 `j*j`，那麼剩下的部分就是 `i - j*j`。
     - 根據 DP 的定義，`dp[i - j*j]` 已經計算出了表示 `i - j*j` 所需的最少完全平方數的個數。
     - 因此，如果我們使用了一個 `j*j`，那麼表示 `i` 的完全平方數個數可以是 `dp[i - j*j] + 1`。
     - 我們需要找到所有可能的 `j` 中，使得 `dp[i]` 的值最小的那個。
     - 所以，狀態轉移方程式為：`dp[i] = min(dp[i], dp[i - j*j] + 1)`。
   - 迭代計算：
     - 使用外層迴圈遍歷數字 `i` 從 1 到 `n`。
     - 在外層迴圈中，先將 `dp[i]` 初始化為 `i`。
     - 使用內層迴圈遍歷所有可能的 `j`，只要 `j*j <= i`。
     - 在內層迴圈中，根據狀態轉移方程式更新 `dp[i]` 的值。
   - 返回結果：
     - 最終結果是 `dp[n]`，它表示數字 `n` 最少可以由多少個完全平方數相加得到。

重點筆記：
1. **動態規劃 (Dynamic Programming)**:
   - 將問題分解為更小的子問題，並儲存子問題的解以避免重複計算。

2. **DP 狀態定義**:
   - `dp[i]` 表示組成數字 `i` 的最少完全平方數的個數。

3. **基礎情況 (Base Cases)**:
   - `dp[0] = 0`。

4. **狀態轉移方程式 (Transition Function)**:
   - `dp[i] = min(dp[i - j*j] + 1)`，其中 `j*j <= i`。

5. **時間複雜度**:
   - 外層迴圈從 1 到 `n`，內層迴圈 `j` 的上限約為 `sqrt(i)`，因此總的時間複雜度約為 O(n * sqrt(n))。

6. **空間複雜度**:
   - O(n)，用於儲存 `dp` 陣列。

7. **適用場景**:
   - 適用於求解最優化問題，其中問題可以分解為具有重疊子問題的結構。

範例解析 (n = 12):
- 初始化 `dp` 陣列，`dp[0] = 0`，`dp[1] = 1`, `dp[2] = 2`, ..., `dp[12] = 12`。
- 計算 `dp[1]`: `j=1`, `dp[1] = min(1, dp[1-1*1] + 1) = min(1, dp[0] + 1) = min(1, 0 + 1) = 1`。
- 計算 `dp[2]`: `j=1`, `dp[2] = min(2, dp[2-1*1] + 1) = min(2, dp[1] + 1) = min(2, 1 + 1) = 2`。
- 計算 `dp[3]`: `j=1`, `dp[3] = min(3, dp[3-1*1] + 1) = min(3, dp[2] + 1) = min(3, 2 + 1) = 3`。
- 計算 `dp[4]`: `j=1`, `min(4, dp[3]+1)`；`j=2`, `min(4, dp[0]+1) = min(4, 0+1) = 1`。所以 `dp[4] = 1` (4 本身就是完全平方數)。
- ...
- 計算 `dp[12]`:
  - `j=1`, `dp[12] = min(12, dp[11] + 1)`
  - `j=2`, `dp[12] = min(12, dp[8] + 1)`
  - `j=3`, `dp[12] = min(12, dp[3] + 1)`
  - 我們需要先計算出 `dp[3]` 和 `dp[8]` 的值。
  - `dp[8]`: `j=1`, `min(8, dp[7]+1)`；`j=2`, `min(8, dp[4]+1) = min(8, 1+1) = 2` (`8 = 4 + 4`)。
  - `dp[3] = 3` (`3 = 1 + 1 + 1`)。
  - `dp[12] = min(12, dp[8] + 1, dp[3] + 1) = min(12, 2 + 1, 3 + 1) = min(12, 3, 4) = 3` (`12 = 4 + 4 + 4`)。
'''