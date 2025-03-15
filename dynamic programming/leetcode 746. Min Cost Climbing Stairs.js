

class Solution {
    /**
     * @param {number} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const n = cost.length; // 取得成本陣列的長度
        const dp = new Array(n + 1).fill(0); // 初始化 DP 陣列，長度為 n+1，所有元素初始化為 0

        // 基礎情況：到達第 0 階和第 1 階的成本為 0
        dp[0] = 0;
        dp[1] = 0;

        // 迭代計算到達每一階台階的最低成本
        for (let i = 2; i <= n; i++) {
            // 到達第 i 階台階可以從第 i-1 階或第 i-2 階爬上來
            // 選擇成本較低的路徑
            dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
        }

        // dp[n] 即為到達頂端的最低成本
        return dp[n];
    }
}

// 測試範例
const cost1 = [10, 15, 20];
const cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];

const solution = new Solution();

console.log(`範例 1 成本: ${cost1}, 最低成本: ${solution.minCostClimbingStairs(cost1)}`); // 輸出: 15
console.log(`範例 2 成本: ${cost2}, 最低成本: ${solution.minCostClimbingStairs(cost2)}`); // 輸出: 6

/*
LeetCode 746: 爬樓梯的最低成本 (Min Cost Climbing Stairs) (Node.js 實現)

題目翻譯：
你是一個爬樓梯愛好者，你想要以最低的成本爬到樓梯的頂端。
樓梯有 n 階台階，編號從 0 到 n-1。每階台階 i 都有一個成本 cost[i]，
你可以在台階 i 支付 cost[i] 後選擇向上爬一階或兩階。

你可以從台階 0 或台階 1 開始爬，請你計算達到樓梯頂端的最低總成本。

範例 1:
輸入: cost = [10, 15, 20]
輸出: 15
解釋: 最低的成本是從 cost[1] = 15 開始，直接跳到頂端。

範例 2:
輸入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
輸出: 6
解釋: 最低的成本是從 cost[0] = 1 開始，然後每次都爬一階，總成本為 1 + 1 + 1 + 1 + 1 + 1 = 6。

題目需求：
1. 計算爬到樓梯頂端的最低總成本。
2. 可以從台階 0 或台階 1 開始。
3. 每階台階都有一個成本，爬上該階必須支付。
4. 每次可以爬一階或兩階。

解題思路與拆解：
1. 問題分析：
   - 最佳化問題：求最低成本。
   - 最優子結構：到達第 i 階的最低成本取決於到達第 i-1 階和第 i-2 階的最低成本。
   - 重疊子問題：計算過程中會重複計算子問題。
   - 因此，可以使用動態規劃 (Dynamic Programming) 來解決。

2. 解題方法選擇：
   - 方法一：動態規劃 (Dynamic Programming) (本解法採用) - 時間 O(N)，空間 O(N) 或 O(1) (空間優化後)
   - 方法二：遞迴 (Recursion) (不推薦，效率較差)

3. 解題步驟 (動態規劃方法)：
   - 定義 DP 陣列：
     - `dp[i]` 代表到達第 i 階台階的最低成本。
     - 由於目標是到達樓梯頂端，我們可以將頂端視為第 n 階。因此，`dp` 陣列長度設為 n+1，`dp[n]` 代表到達頂端的最低成本。
   - 初始化 DP 陣列的基礎情況：
     - `dp[0] = 0`: 到達第 0 階的成本為 0。
     - `dp[1] = 0`: 到達第 1 階的成本也為 0。
   - 狀態轉移方程式：
     - `dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])` 對於 i >= 2。
   - 迭代計算：
     - 使用迴圈從 i = 2 迭代到 n，根據狀態轉移方程式計算 `dp[i]` 的值。
   - 返回結果：
     - `dp[n]` 即為到達樓梯頂端的最低總成本。

重點筆記：
1. **動態規劃 (Dynamic Programming)**:
   - 使用 DP 解決最佳化問題。
   - 關鍵步驟：定義 DP 狀態、初始化基礎情況、找出狀態轉移方程式、迭代計算。

2. **DP 狀態定義**:
   - `dp[i]` 代表到達第 i 階台階的最低成本.

3. **基礎情況 (Base Cases)**:
   - `dp[0] = 0` 和 `dp[1] = 0`.

4. **狀態轉移方程式 (Transition Function)**:
   - `dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`.

5. **時間複雜度**:
   - O(N)。

6. **空間複雜度**:
   - O(N)，可以優化為 O(1)。

7. **適用場景**:
   - 適合解決具有最優子結構和重疊子問題的優化問題。

範例解析 (範例 1: cost = [10, 15, 20]):
- `dp = [0, 0, 0, 0]`
- `dp[0] = 0`
- `dp[1] = 0`
- `dp[2] = Math.min(dp[1] + cost[1], dp[0] + cost[0]) = Math.min(0 + 15, 0 + 10) = 10`
- `dp[3] = Math.min(dp[2] + cost[2], dp[1] + cost[1]) = Math.min(10 + 20, 0 + 15) = 15`
- 返回 `dp[3] = 15`

範例解析 (範例 2: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]):
- `dp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
- `dp[0] = 0`
- `dp[1] = 0`
- `dp[2] = Math.min(dp[1] + cost[1], dp[0] + cost[0]) = Math.min(0 + 100, 0 + 1) = 1`
- `dp[3] = Math.min(dp[2] + cost[2], dp[1] + cost[1]) = Math.min(1 + 1, 0 + 100) = 2`
- ... (計算過程省略)
- 返回 `dp[10] = 6`

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `minCostClimbingStairs(cost)`: 計算爬樓梯最低成本的核心方法。
- `n = cost.length`: 取得成本陣列的長度。
- `dp = new Array(n + 1).fill(0)`: 初始化 DP 陣列。
- `dp[0] = 0; dp[1] = 0;`: 設定基礎情況。
- `for (let i = 2; i <= n; i++)`: 迭代計算最低成本。
- `dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`: 狀態轉移方程式。
- `return dp[n]`: 返回結果。
- `cost1 = [...]`, `cost2 = [...]`: 定義測試用例。
- `solution = new Solution()`: 創建 Solution 實例。
- `console.log(...)`: 調用方法並打印結果。
*/

