class Solution {


    longestPalindrome = function (s) {
        let n = s.length;
        let dp = new Array(n).fill(null).map(() => Array(n).fill(false));
        let start = 0; // 最長回文子字串的起始索引。
        let maxLength = 1; // 最長回文子字串的長度，預設為 1（單個字元）。

        // 處理長度為 1 的子字串（所有單個字元都是回文）。
        for (let i = 0; i < n; i++) {
            dp[i][i] = true;
        }

        // 處理長度為 2 的子字串。
        for (let i = 0; i < n - 1; i++) {
            if (s[i] === s[i + 1]) {
                dp[i][i + 1] = true;
                start = i;
                maxLength = 2;
            }
        }

        // 處理長度大於 2 的子字串。
        for (let len = 3; len <= n; len++) {
            // `i` 是子字串的起始索引。
            for (let i = 0; i <= n - len; i++) {
                // `j` 是子字串的結束索引。
                const j = i + len - 1;
                // 如果 s[i] 和 s[j] 相等，並且 s[i+1...j-1] 是回文，那麼 s[i...j] 也是回文。
                if (s[i] === s[j] && dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    if (len > maxLength) {
                        maxLength = len;
                        start = i;
                    }
                }
            }
        }

        // 使用儲存的起始索引和最長長度，從原始字串中提取最長的回文子字串。
        return s.substring(start, start + maxLength);
    }
}


// 測試範例
let s = "babad";

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.longestPalindrome(s));

/*
LeetCode 5: 最長回文子字串 (Longest Palindromic Substring) (Node.js 實現 - 動態規劃)

題目翻譯：
給定一個字串 `s`，找到 `s` 中最長的回文子字串。

題目需求：
1. 接收一個字串 `s` 作為輸入。
2. 找出 `s` 中最長的回文子字串。
3. 回文子字串是指從前往後讀和從後往前讀都一樣的字串。

解題思路與拆解：
本解法採用了動態規劃 (Dynamic Programming) 的方法，時間複雜度為 O(n^2)，空間複雜度為 O(n^2)。

1. 問題分析：
   - 我們需要找到給定字串 `s` 中最長的回文子字串。
   - 回文的定義是字串正讀和反讀相同。

2. 解題方法選擇：
   - 方法一：暴力枚舉 (O(n^3))
   - 方法二：動態規劃 (O(n^2)) - 本解法採用
   - 方法三：中心擴展 (O(n^2))
   - 方法四：Manacher 演算法 (O(n))

3. 解題步驟 (動態規劃)：
   - **步驟 1：處理邊緣情況。**
     - 如果輸入字串 `s` 為空或長度小於 2，則直接返回 `s`。
   - **步驟 2：初始化 DP 表格。**
     - 創建一個二維布林陣列 `dp`，大小為 `n x n`，其中 `n` 是字串 `s` 的長度。
     - `dp[i][j]` 的值為 `true` 表示子字串 `s[i...j]` 是回文，`false` 表示不是。
   - **步驟 3：初始化基本情況。**
     - 所有長度為 1 的子字串都是回文，因此對於所有的 `i`，`dp[i][i]` 都設為 `true`。
     - 檢查所有長度為 2 的子字串。如果 `s[i]` 等於 `s[i+1]`，則 `dp[i][i+1]` 為 `true`。同時，如果找到長度為 2 的回文，更新最長長度和起始索引。
   - **步驟 4：填充 DP 表格。**
     - 我們按子字串的長度 `len` 從 3 開始迭代到 `n`。
     - 對於每個長度 `len`，我們迭代所有可能的起始索引 `i`，從 0 到 `n - len`。
     - 計算結束索引 `j = i + len - 1`。
     - 如果 `s[i]` 等於 `s[j]`，並且子字串 `s[i+1...j-1]` 是回文（即 `dp[i + 1][j - 1]` 為 `true`），那麼 `s[i...j]` 也是回文，將 `dp[i][j]` 設為 `true`。
     - 如果當前回文子字串的長度 `len` 大於目前找到的最長長度 `maxLength`，則更新 `maxLength` 和起始索引 `start`。
   - **步驟 5：返回最長回文子字串。**
     - 使用儲存的起始索引 `start` 和最長長度 `maxLength`，從原始字串 `s` 中提取最長的回文子字串，使用 `s.substring(start, start + maxLength)`。

重點筆記：
1. **`dp[i][j]` 的定義：** `dp[i][j]` 為 `true` 如果子字串 `s[i...j]` 是回文，否則為 `false`。
2. **基本情況：** 長度為 1 和 2 的子字串的回文性需要單獨處理。
3. **狀態轉移方程式：** `dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1]`，當 `j - i + 1 > 2` 時。
4. **迭代順序：** 我們按子字串的長度從小到大進行迭代，確保在計算 `dp[i][j]` 時，`dp[i + 1][j - 1]` 的值已經被計算出來。
5. **時間複雜度：** 我們使用了三層迴圈（兩層用於填充 DP 表格，一層隱含在長度迭代中），因此時間複雜度為 O(n^2)。
6. **空間複雜度：** 我們創建了一個 `n x n` 的二維布林陣列 `dp`，因此空間複雜度為 O(n^2)。

函數功能說明：
- `longestPalindrome(s)`: 接收一個字串 `s`，返回其最長的回文子字串。
- `const n = s.length`: 獲取字串的長度。
- `const dp = Array(n).fill(null).map(() => Array(n).fill(false))`: 初始化 DP 表格。
- `let start = 0`: 初始化最長回文子字串的起始索引。
- `let maxLength = 1`: 初始化最長回文子字串的長度。
- 處理長度為 1 和 2 的基本情況。
- 使用三層迴圈填充 DP 表格，並更新最長長度和起始索引。
- `return s.substring(start, start + maxLength)`: 返回最長的回文子字串。
*/