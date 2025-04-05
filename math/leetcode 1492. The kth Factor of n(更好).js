class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthFactor = function(n, k) {
        const factors = []; // 用於儲存 n 的因數
        for (let i = 1; i * i <= n; i++) { // 迭代到 n 的平方根
            if (n % i === 0) { // 如果 i 是 n 的因數
                factors.push(i); // 將 i 加入因數列表
                if (i * i !== n) { // 如果 i 不是 n 的平方根（避免重複加入）
                    factors.push(n / i); // 將 n/i 也加入因數列表
                }
            }
        }
        factors.sort((a, b) => a - b); // 將因數列表按遞增順序排序
        if (factors.length < k) { // 如果因數個數少於 k
            return -1; // 返回 -1
        }
        return factors[k - 1]; // 返回排序後的第 k 個因數
    }
}

// 測試範例
let n = 7;
let k = 2;

// 創建 Solution 的實例
let solution = new Solution();

// 調用 kthFactor 方法並輸出結果
console.log(solution.kthFactor(n, k));

/*
LeetCode 1492: n 的第 k 個因數 (The k-th Factor of n) (Node.js 實現 - 更有效率的解法)

題目翻譯：
給你兩個正整數 n 和 k。如果整數 i 滿足 n % i == 0，則認為整數 i 是 n 的因數。
按遞增順序考慮 n 的所有因數。
返回列表中第 k 個因數。如果 n 沒有 k 個因數，則返回 -1。

題目需求：
1. 找到給定正整數 n 的所有因數。
2. 將這些因數按遞增順序排列。
3. 返回排序後的因數列表中的第 k 個因數。
4. 如果 n 的因數個數少於 k，則返回 -1。

解題思路與拆解：
1. 問題分析：
   - 與之前的解法相同，但目標是提高效率。
   - 關鍵觀察：如果 `i` 是 `n` 的因數，那麼 `n / i` 也一定是 `n` 的因數。這意味著我們只需要遍歷到 `n` 的平方根，就可以找到所有的因數對。

2. 解題方法選擇：
   - 方法二：迭代到平方根 (本解法採用) - 迭代從 1 到 sqrt(n) 的數字，找到因數並同時找到其對應的因數。

3. 解題步驟 (迭代到平方根)：
   - 初始化一個空陣列 `factors`，用於儲存 `n` 的所有因數。
   - 使用一個迴圈從 `i = 1` 迭代到 `sqrt(n)` (包含 `sqrt(n)`)。我們只需要檢查到 `sqrt(n)`，因為如果 `i > sqrt(n)` 且 `i` 是 `n` 的因數，那麼 `n / i` 一定小於 `sqrt(n)`，並且我們在之前的迭代中已經找到了 `n / i`。
   - 在迴圈中，對於每個數字 `i`，檢查 `n` 除以 `i` 的餘數是否為 0。如果是 0，則 `i` 是 `n` 的一個因數。
   - 如果 `i` 是 `n` 的因數，將 `i` 添加到 `factors` 陣列中。
   - 接著，我們檢查 `i * i` 是否不等於 `n`。這個條件用於處理完全平方數的情況。例如，如果 `n = 9`，當 `i = 3` 時，`i * i` 等於 `n`。我們已經將 3 加入了 `factors`，如果我們再加入 `n / i` (即 9 / 3 = 3)，就會重複。所以，只有當 `i` 不是 `n` 的平方根時，我們才將 `n / i` 也添加到 `factors` 陣列中。
   - 迴圈結束後，`factors` 陣列可能包含未排序的因數。我們需要使用 `factors.sort((a, b) => a - b)` 將 `factors` 陣列按遞增順序排序。
   - 檢查 `factors` 陣列的長度是否小於 `k`。如果小於 `k`，表示 `n` 的因數個數少於 `k`，此時應該返回 -1。
   - 如果 `factors` 陣列的長度大於等於 `k`，則返回 `factors` 陣列中索引為 `k - 1` 的元素，這就是第 `k` 個因數。

重點筆記：
1. **平方根優化：** 只需要迭代到 `sqrt(n)` 即可找到所有因數。
2. **因數對：** 如果 `i` 是 `n` 的因數，則 `n / i` 也是 `n` 的因數。
3. **避免重複：** 對於完全平方數，當 `i * i == n` 時，`i` 和 `n / i` 是相同的，只需要加入一次。
4. **排序：** 找到所有因數後，需要將它們排序以找到第 `k` 個。
5. **時間複雜度：** O(sqrt(N) + M log M)，其中 N 是輸入的數字 `n`，M 是 `n` 的因數個數。迭代到平方根需要 O(sqrt(N)) 的時間。排序因數列表需要 O(M log M) 的時間。在最壞情況下，M 可能接近於 N 的平方根，所以總體時間複雜度接近 O(sqrt(N) + sqrt(N) log sqrt(N))，通常比 O(N) 快得多。
6. **空間複雜度：** O(M)，其中 M 是 `n` 的因數個數，用於儲存因數列表。

範例解析 (n = 7, k = 2):
- 迴圈從 `i = 1` 開始，到 `sqrt(7)` 約為 2.64。所以 `i` 會取 1 和 2。
- 當 `i = 1` 時，`7 % 1 === 0` 為真，`factors` 加入 1。`1 * 1 !== 7` 為真，`factors` 加入 `7 / 1 = 7`。`factors` 現在是 `[1, 7]`。
- 當 `i = 2` 時，`7 % 2 === 0` 為假。
- 迴圈結束。
- 對 `factors` 排序，得到 `[1, 7]`。
- `factors.length` (2) 不小於 `k` (2)。
- 返回 `factors[2 - 1]`，即 `factors[1]`，其值為 7。

函式功能說明:
- `class Solution`: 定義解決方案類別。
- `kthFactor(n, k)`: 找到數字 `n` 的第 `k` 個因數。
- `const factors = []`: 初始化一個空陣列以儲存因數。
- `for (let i = 1; i * i <= n; i++)`: 迭代從 1 到 `sqrt(n)` 的所有數字。
- `if (n % i === 0)`: 檢查 `i` 是否是 `n` 的因數。
- `factors.push(i)`: 如果 `i` 是 `n` 的因數，則將其添加到 `factors` 陣列。
- `if (i * i !== n)`: 檢查 `i` 是否不是 `n` 的平方根。
- `factors.push(n / i)`: 如果 `i` 不是 `n` 的平方根，則將 `n / i` 也添加到 `factors` 陣列。
- `factors.sort((a, b) => a - b)`: 將 `factors` 陣列按遞增順序排序。
- `if (factors.length < k)`: 檢查因數的數量是否少於 `k`。
- `return -1`: 如果因數數量少於 `k`，則返回 -1。
- `return factors[k - 1]`: 返回排序後的因數陣列中的第 `k` 個因數。
*/