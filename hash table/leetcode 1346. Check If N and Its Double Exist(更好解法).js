class Solution {
    /**
     * @param {number[]} arr
     * @return {boolean}
     */
    checkIfExist = function (arr) {
        // 如果陣列長度小於 2，則不可能存在兩個不同的索引滿足條件，直接返回 false
        if (arr.length < 2) {
            return false;
        }

        // 創建一個 Set 集合，用於存儲已經遍歷過的數字
        const seen = new Set();

        // 遍歷陣列中的每個數字
        for (const num of arr) {
            // 檢查 Set 中是否已經存在當前數字的兩倍
            if (seen.has(num * 2)) {
                return true;
            }
            // 檢查當前數字是否為偶數，並且 Set 中是否已經存在其一半
            if (num % 2 === 0 && seen.has(num / 2)) {
                return true;
            }
            // 將當前數字添加到 Set 中，以便後續檢查
            seen.add(num);
        }

        // 如果遍歷完整個陣列都沒有找到滿足條件的兩個數字，返回 false
        return false;
    }
}



// 測試範例
let arr = [0, 0];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.checkIfExist(arr));

/*
LeetCode 1346: 檢查整數 N 及其兩倍是否存在 (Check If N and Its Double Exist) (Node.js 實現 - 更優化解法)

題目翻譯：
給定一個整數陣列 `arr`，判斷是否存在兩個不同的索引 `i` 和 `j`，使得 `arr[i] == 2 * arr[j]` 或 `arr[j] == 2 * arr[i]`。

題目需求：
1. 檢查陣列中是否存在兩個不同的元素，其中一個是另一個的兩倍。
2. 這兩個元素的索引必須不同。

解題思路與拆解：
1. 問題分析：
   - 需要找到陣列中是否存在一對數字 (x, y)，使得 x = 2y 或 y = 2x，且它們在陣列中的索引不同。
   - 使用哈希集合 (Set) 可以有效地檢查一個數字是否已經出現過。

2. 解題方法選擇：
   - 方法一：暴力搜尋 (雙重迴圈) - 時間 O(N^2)，空間 O(1)
   - 方法二：使用哈希集合 (Set) (本解法採用 - 更優化) - 時間 O(N)，空間 O(N)

3. 解題步驟 (使用哈希集合方法)：
   - 首先判斷陣列長度是否小於 2，如果小於 2，則不可能存在兩個不同的索引滿足條件，直接返回 `false`。
   - 創建一個空的 `Set` 集合 `seen`，用於存儲已經遍歷過的數字。
   - 遍歷輸入陣列 `arr` 中的每個數字 `num`。
   - 對於每個 `num`，首先檢查 `seen` 集合中是否已經存在 `num * 2`。如果存在，則說明找到了滿足條件的兩個數字，返回 `true`。
   - 接著，檢查當前數字 `num` 是否為偶數 (`num % 2 === 0`)，並且 `seen` 集合中是否已經存在 `num / 2`。如果存在，則說明找到了滿足條件的兩個數字，返回 `true`。
   - 將當前數字 `num` 添加到 `seen` 集合中，以便在後續的遍歷中進行檢查。
   - 如果遍歷完整個陣列都沒有找到滿足條件的數字對，則返回 `false`。

重點筆記：
1. **哈希集合 (Set) 的應用**:
   - 使用 `Set` 可以高效地檢查一個元素是否已經存在，平均時間複雜度為 O(1)。

2. **時間複雜度**:
   - O(N)，其中 N 是陣列 `arr` 的長度。只需要遍歷陣列一次。

3. **空間複雜度**:
   - O(N)，在最壞情況下，`Set` 需要存儲陣列中的所有元素。

4. **關於 0 的處理**:
   - 這個優化後的解法也能正確處理 0 的情況。例如，如果陣列中有兩個 0，當第一個 0 被添加到 `seen` 後，在遍歷到第二個 0 時，`seen.has(0 * 2)` (即 `seen.has(0)`) 會返回 `true`。

5. **避免重複檢查**:
   - 我們在將當前數字添加到 `seen` 之前就進行了兩倍和一半的檢查，這樣可以確保我們找到的是不同索引的數字。

範例解析 (arr = [0, 0]):
- 陣列長度為 2，不小於 2。
- `seen` 初始化為 `{}`。
- 遍歷 `arr`:
  - `num = 0`:
    - `seen.has(0 * 2)` (即 `seen.has(0)`) 為 `false` (因為 `seen` 還是空的)。
    - `0 % 2 === 0` 為 `true`，`seen.has(0 / 2)` (即 `seen.has(0)`) 為 `false`。
    - 將 0 添加到 `seen`，`seen` 變為 `{0}`。
  - `num = 0`:
    - `seen.has(0 * 2)` (即 `seen.has(0)`) 為 `true`。
    - 返回 `true`。

範例解析 (arr = [10, 2, 5, 3]):
- `seen` 初始化為 `{}`。
- `num = 10`: `seen.has(20)` 為 `false`，`10 % 2 === 0` 為 `true`，`seen.has(5)` 為 `false`。添加 10 到 `seen`，`seen` 為 `{10}`。
- `num = 2`: `seen.has(4)` 為 `false`，`2 % 2 === 0` 為 `true`，`seen.has(1)` 為 `false`。添加 2 到 `seen`，`seen` 為 `{10, 2}`。
- `num = 5`: `seen.has(10)` 為 `true`。返回 `true`。

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `checkIfExist(arr)`: 檢查是否存在滿足條件的兩個數字的核心方法 (更優化解法)。
- `if (arr.length < 2) { return false; }`: 如果陣列長度小於 2，直接返回 false。
- `const seen = new Set();`: 創建一個 Set 集合用於存儲遍歷過的數字。
- `for (const num of arr)`: 遍歷輸入陣列中的每個數字。
- `if (seen.has(num * 2)) { return true; }`: 檢查 Set 中是否已存在當前數字的兩倍。
- `if (num % 2 === 0 && seen.has(num / 2)) { return true; }`: 檢查當前數字是否為偶數，且 Set 中已存在其一半。
- `seen.add(num);`: 將當前數字添加到 Set 中。
- `return false;`: 如果沒有找到滿足條件的數字對，返回 false。
- `let arr = [0, 0];`: 設定測試範例。
- `let solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.checkIfExist(arr));`: 調用方法並打印結果。
*/