class Solution {
    
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthFactor = function(n, k) {
        let answer = []; // 初始化一個空陣列 answer，用於儲存 n 的所有因數。
        for (let i=1; i<=n; i++){ // 使用 for 迴圈從 1 迭代到 n (包含 n)。
            if (n%i === 0){ // 檢查當前數字 i 是否是 n 的因數。如果 n 除以 i 的餘數為 0，則 i 是 n 的因數。
                answer.push(i); // 如果 i 是 n 的因數，則將 i 添加到 answer 陣列中。
            }
        }
        if (answer.length < k){ // 檢查 answer 陣列的長度是否小於 k。如果小於 k，表示 n 的因數個數少於 k，因此不存在第 k 個因數。
            return -1; // 如果 n 的因數個數少於 k，則返回 -1。
        }
        return answer[k-1]; // 如果 answer 陣列的長度大於等於 k，則返回 answer 陣列中索引為 k-1 的元素。由於陣列索引從 0 開始，因此 k-1 對應於第 k 個因數。
    }
}
//有自己做出來

// 測試範例
let n = 7;
let k = 2;

// 創建 Solution 的實例
let solution = new Solution();

// 調用 twoSum 方法並輸出結果
console.log(solution.kthFactor(n, k));  

/*
LeetCode 1492: n 的第 k 個因數 (The k-th Factor of n) (Node.js 實現)

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
   - 需要找到 n 的所有因數。
   - 需要將這些因數排序（題目已說明按遞增順序考慮，所以自然排序即可）。
   - 需要根據給定的 k 值返回對應位置的因數。
   - 需要處理因數個數不足 k 的情況。

2. 解題方法選擇：
   - 方法一：暴力枚舉 (本解法採用) - 迭代從 1 到 n 的所有數字，檢查是否為 n 的因數。

3. 解題步驟 (暴力枚舉)：
   - 初始化一個空陣列 `answer`，用於儲存 n 的所有因數。
   - 使用一個迴圈從 1 迭代到 n (包含 n)。
   - 在迴圈中，對於每個數字 `i`，檢查 `n` 除以 `i` 的餘數是否為 0。如果是 0，則 `i` 是 `n` 的一個因數。
   - 如果 `i` 是 `n` 的因數，將 `i` 添加到 `answer` 陣列中。
   - 迴圈結束後，`answer` 陣列將包含 `n` 的所有因數，並且由於我們是按順序迭代的，所以這些因數也是按遞增順序排列的。
   - 檢查 `answer` 陣列的長度是否小於 `k`。如果小於 `k`，表示 `n` 的因數個數少於 `k`，此時應該返回 -1。
   - 如果 `answer` 陣列的長度大於等於 `k`，則返回 `answer` 陣列中索引為 `k-1` 的元素，這就是第 `k` 個因數（因為陣列索引從 0 開始）。

重點筆記：
1. **因數的定義：** 如果整數 `i` 滿足 `n % i == 0`，則 `i` 是 `n` 的因數。
2. **暴力枚舉範圍：** 需要檢查從 1 到 `n` 的所有整數。
3. **排序：** 由於迭代是從 1 開始遞增的，所以找到的因數會自然地按遞增順序排列，不需要額外的排序步驟。
4. **邊界情況：** 需要處理 `n` 的因數個數小於 `k` 的情況，此時返回 -1。
5. **時間複雜度：** O(N)，其中 N 是輸入的數字 `n`。我們需要迭代從 1 到 `n` 的所有數字。
6. **空間複雜度：** O(M)，其中 M 是 `n` 的因數個數。在最壞情況下（例如，當 `n` 是完全平方數時），M 可能接近於 N 的平方根，但通常情況下會小於 N。

範例解析 (n = 7, k = 2):
- 迴圈從 `i = 1` 開始。
- 當 `i = 1` 時，`7 % 1 === 0` 為真，`answer` 變為 `[1]`。
- 當 `i = 2` 時，`7 % 2 === 0` 為假。
- 當 `i = 3` 時，`7 % 3 === 0` 為假。
- 當 `i = 4` 時，`7 % 4 === 0` 為假。
- 當 `i = 5` 時，`7 % 5 === 0` 為假。
- 當 `i = 6` 時，`7 % 6 === 0` 為假。
- 當 `i = 7` 時，`7 % 7 === 0` 為真，`answer` 變為 `[1, 7]`。
- 迴圈結束。
- `answer.length` (2) 不小於 `k` (2)。
- 返回 `answer[2-1]`，即 `answer[1]`，其值為 7。

函式功能說明:
- `class Solution`: 定義解決方案類別。
- `kthFactor(n, k)`: 找到數字 `n` 的第 `k` 個因數。
- `let answer = []`: 初始化一個空陣列以儲存因數。
- `for (let i=1; i<=n; i++)`: 迭代從 1 到 `n` 的所有數字。
- `if (n%i === 0)`: 檢查 `i` 是否是 `n` 的因數。
- `answer.push(i)`: 如果 `i` 是 `n` 的因數，則將其添加到 `answer` 陣列。
- `if (answer.length < k)`: 檢查因數的數量是否少於 `k`。
- `return -1`: 如果因數數量少於 `k`，則返回 -1。
- `return answer[k-1]`: 返回排序後的因數陣列中的第 `k` 個因數。
*/