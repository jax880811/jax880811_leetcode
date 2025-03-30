class Solution {
    getRow = function (rowIndex) {
        // 初始化二維陣列 (行數 = numRows)
        let dp = [];
        
        // 創建每行基礎結構 (全1陣列)
        for(let i = 0; i <= rowIndex; i++) {
            dp[i] = new Array(i + 1).fill(1); // 第i行有i+1個元素
        }

        // 優化：只有一行時直接返回
        if (rowIndex === 0) return dp[0];

        // 動態規劃填值 (從第2行開始)
        for(let i = 1; i <= rowIndex; i++) {         // i: 當前行索引
            for(let j = 0; j < dp[i].length; j++) { // j: 當前列索引
                // 只處理中間元素 (排除首尾)
                if (j > 0 && j < dp[i-1].length) {  // 關鍵條件：
                    dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; // 左上 + 上方
                }
            }
        }

        return dp[rowIndex];
    }
}

// 自己做出來的

// 測試範例
let rowIndex = 1;

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.getRow(rowIndex));

/*
LeetCode 119: 帕斯卡三角形 II (Pascal's Triangle II) (Node.js 實現)

題目翻譯：
給定一個非負整數 rowIndex，回傳帕斯卡三角形的第 rowIndex 行。

在帕斯卡三角形中，每個數字是它上方兩個數字的和。

        1       (rowIndex = 0)
       1 1      (rowIndex = 1)
      1 2 1     (rowIndex = 2)
     1 3 3 1    (rowIndex = 3)
    1 4 6 4 1   (rowIndex = 4)

題目需求：
1. 給定一個非負整數 `rowIndex`，回傳帕斯卡三角形的第 `rowIndex` 行（索引從 0 開始）。

解題思路與拆解：
1. 問題分析：
   - 需要生成帕斯卡三角形的特定一行，而不是整個三角形。
   - 可以利用帕斯卡三角形的規律，每一行的元素是上一行相鄰兩個元素之和。

2. 解題方法選擇：
   - 方法一：生成完整的帕斯卡三角形 (如 LeetCode 118)，然後返回最後一行。
   - 方法二：動態規劃 (只儲存必要的行) (本解法採用) - 時間 O(rowIndex^2)，空間 O(rowIndex^2) (可以優化到 O(rowIndex))

3. 解題步驟 (動態規劃方法 - 生成完整三角形)：
   - 初始化一個空的二維陣列 `dp` 用於存儲帕斯卡三角形的每一行。
   - 使用外層迴圈遍歷行數 `i` 從 0 到 `rowIndex`。
   - 在每一行 `i` 中，創建一個新的陣列，其長度為 `i + 1`，並使用 `fill(1)` 將所有元素初始化為 1（因為每一行的第一個和最後一個元素都是 1）。
   - 如果 `rowIndex` 小於等於 1，則直接返回 `dp[rowIndex]`。
   - 從第二行開始（索引 `i = 2`），使用另一個內層迴圈遍歷當前行的元素，索引 `j` 從 1 到 `dp[i].length - 2`。
   - 對於每個元素 `dp[i][j]`，將其值更新為上一行對應位置的前一個元素 (`dp[i - 1][j - 1]`) 和當前位置的元素 (`dp[i - 1][j]`) 的和。
   - 返回最終生成的二維陣列 `dp` 的第 `rowIndex` 行。

重點筆記：
1. **動態規劃 (Dynamic Programming)**:
   - 我們利用之前計算好的行來生成當前行。

2. **DP 狀態定義**:
   - `dp[i][j]` 表示帕斯卡三角形中第 `i` 行第 `j` 列的數字（行和列的索引都從 0 開始）。

3. **基礎情況 (Base Cases)**:
   - `dp[i][0] = 1` (每行的第一個元素是 1)。
   - `dp[i][i] = 1` (每行的最後一個元素是 1)。

4. **狀態轉移方程式 (Transition Function)**:
   - 對於 `i > 1` 且 `0 < j < i`，`dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]`。

5. **時間複雜度**:
   - 外層迴圈執行 `rowIndex + 1` 次，內層迴圈在第 `i` 行執行 `i - 1` 次，因此總的時間複雜度是 O(1 + 2 + ... + rowIndex) = O(rowIndex^2)。

6. **空間複雜度**:
   - O(rowIndex^2)，用於儲存整個帕斯卡三角形。

7. **空間優化**:
   - 可以只使用一個一維陣列來儲存上一行的結果，並在迭代過程中更新它，將空間複雜度優化到 O(rowIndex)。

範例解析 (rowIndex = 3):
- `dp` 初始化為 `[]`。
- `i = 0`: `dp[0] = [1]`。
- `i = 1`: `dp[1] = [1, 1]`。返回 `dp[3]`。
- `i = 2`: `dp[2] = [1, 1, 1]`。內層迴圈 `j = 1`: `dp[2][1] = dp[1][0] + dp[1][1] = 1 + 1 = 2`。`dp[2]` 變為 `[1, 2, 1]`。
- `i = 3`: `dp[3] = [1, 1, 1, 1]`。內層迴圈 `j = 1`: `dp[3][1] = dp[2][0] + dp[2][1] = 1 + 2 = 3`；`j = 2`: `dp[3][2] = dp[2][1] + dp[2][2] = 2 + 1 = 3`。`dp[3]` 變為 `[1, 3, 3, 1]`。
- 返回 `dp[3]`: `[1, 3, 3, 1]`。

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `getRow(rowIndex)`: 生成帕斯卡三角形指定行的核心方法。
- `let dp = [];`: 初始化一個空陣列用於存儲帕斯卡三角形的每一行。
- `for(let i = 0; i <= rowIndex; i++)`: 外層迴圈遍歷從 0 到 rowIndex 的每一行。
- `dp[i] = new Array(i + 1).fill(1);`: 初始化當前行，所有元素設為 1。
- `if (rowIndex <= 1) { return dp[rowIndex]; }`: 處理 rowIndex 為 0 或 1 的特殊情況。
- `for(let i = 2; i <= rowIndex; i++)`: 從第三行開始遍歷（索引 2）。
- `for(let j = 1; j < dp[i].length - 1; j++)`: 內層迴圈遍歷當前行的中間元素。
- `dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];`: 計算當前元素的值為上方兩個元素之和。
- `return dp[rowIndex];`: 返回帕斯卡三角形的第 rowIndex 行。
- `let rowIndex = 3;`: 設定測試範例。
- `let solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.getRow(rowIndex));`: 調用方法並打印結果。
*/