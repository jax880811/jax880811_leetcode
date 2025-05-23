from typing import List
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        answer = [[1]*n for i in range(m)]
        for i in range(1,m):
            for j in range(1,n):
                answer[i][j] = answer[i-1][j] + answer[i][j-1]
        
        return answer[m-1][n-1]



m = 3
n = 7

solution = Solution()
print(solution.uniquePaths(m,n))

'''
從最左上走到最右下有多少種方法，已知只能走下或者右，不能倒回
就代表下一格能累積到的方法就是左邊一格+上面一格的總和
因此就用迭代的方式進行，不斷更新最新的格數總和

不過這題其實也是排列組合的經典問題
使用公式C(M+N-2,N-1) = (M+N-2)!/(M-1)!(N-1)! 就能夠直接得到答案
'''
'''
LeetCode 62: 不同的路徑數 (Unique Paths) (Python 實現)

題目翻譯：
一個機器人位於一個 m x n 的網格的左上角（起始點在下圖標記為“Start” ）。
機器人每次只能向下或者向右移動一步。機器人試圖達到網格的右下角（在下圖標記為“Finish”）。
問總共有多少條不同的路徑？

題目需求：
1. 計算從網格左上角到右下角的唯一路徑數量。
2. 機器人只能向下或向右移動。
3. 給定網格的行數 m 和列數 n。

解題思路與拆解：
1. 問題分析：
   - 這是一個典型的路徑計數問題，可以使用動態規劃解決。
   - 機器人只能向下或向右移動，這意味著到達任何一個格子 (i, j) 的路徑數量，只能是從它上面的格子 (i-1, j) 向下移動一步，或者從它左邊的格子 (i, j-1) 向右移動一步到達。

2. 解題方法選擇：
   - 方法一：動態規劃 (Dynamic Programming) (本解法採用) - 時間 O(m*n)，空間 O(m*n)
   - 方法二：組合數學 (Combinatorics) - 時間 O(min(m, n)) 或 O(max(m, n))，空間 O(1) (需要計算組合數)

3. 解題步驟 (動態規劃方法)：
   - 定義 DP 陣列：
     - `dp[i][j]` 代表從起始點到達網格中第 `i` 行第 `j` 列的唯一路徑數量。
   - 初始化 DP 陣列的基礎情況：
     - 第一行 (`i = 0`) 的所有格子都只有一種路徑到達（一直向右移動），所以 `dp[0][j] = 1`。
     - 第一列 (`j = 0`) 的所有格子都只有一種路徑到達（一直向下移動），所以 `dp[i][0] = 1`。
   - 狀態轉移方程式：
     - 對於網格中的其他格子 `(i, j)` (其中 `i > 0` 且 `j > 0`)，到達該格子的路徑數量等於到達它上方格子 `(i-1, j)` 的路徑數量加上到達它左方格子 `(i, j-1)` 的路徑數量。
     - 因此，狀態轉移方程式為：`dp[i][j] = dp[i-1][j] + dp[i][j-1]`。
   - 迭代計算：
     - 使用雙重迴圈遍歷網格，從第二行第二列開始，根據狀態轉移方程式計算 `dp[i][j]` 的值。
   - 返回結果：
     - 最終結果是到達網格右下角的路徑數量，即 `dp[m-1][n-1]`。

重點筆記：
1. **動態規劃 (Dynamic Programming)**:
   - 將複雜問題分解為更小的重疊子問題，並儲存子問題的解以避免重複計算。
   - 本題的子問題是計算到達網格中每個格子的唯一路徑數量。

2. **DP 狀態定義**:
   - `dp[i][j]` 清晰地定義了狀態的含義。

3. **基礎情況 (Base Cases)**:
   - 初始化第一行和第一列為 1 是正確的，因為到達這些格子的路徑是唯一的。

4. **狀態轉移方程式 (Transition Function)**:
   - `dp[i][j] = dp[i-1][j] + dp[i][j-1]` 正確地描述了如何從之前的狀態推導出當前狀態。

5. **時間複雜度**:
   - O(m * n)，需要遍歷整個 m x n 的網格來計算 DP 陣列。

6. **空間複雜度**:
   - O(m * n)，用於儲存 m x n 的 DP 陣列。
   - **空間優化**: 可以注意到在計算 `dp[i][j]` 時，只需要用到前一行 (`dp[i-1]`) 的資訊。因此，空間複雜度可以優化到 O(n) 或 O(min(m, n))，通過只儲存前一行的 DP 值。

7. **適用場景**:
   - 適用於解決網格路徑計數問題，且移動方向受限（例如只能向下或向右）。

範例解析 (m = 3, n = 7):
- 初始化 `dp` 為一個 3x7 的二維陣列，所有元素初始化為 1。
- 迭代計算 `dp[i][j]`：
  - `dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2`
  - `dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3`
  - ...
  - `dp[2][6]` 將會是最終結果。

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `uniquePaths(self, m: int, n: int) -> int`: 計算唯一路徑數的核心方法。
- `dp = [[1 for _ in range(n)] for _ in range(m)]`: 初始化一個 m x n 的二維陣列 `dp`，並用 1 填充。
- `for i in range(m):`: 外層迴圈遍歷行。
- `for j in range(n):`: 內層迴圈遍歷列。
- `if i - 1 >= 0 and j - 1 >= 0:`: 判斷當前格子是否不是第一行或第一列。
- `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]`: 狀態轉移方程式，計算到達當前格子的路徑數。
- `return dp[m - 1][n - 1]`: 返回右下角格子的路徑數。
- `m = 3; n = 7`: 設定測試範例的網格尺寸。
- `solution = Solution()`: 創建 `Solution` 實例。
- `print(solution.uniquePaths(m, n))`: 調用 `uniquePaths` 方法並打印結果。
'''