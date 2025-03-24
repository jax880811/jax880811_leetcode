class Solution {
    /**
     * @param {number} nums
     * @return {number}
     */
    majorityElement = function (nums) {
        const counts = {};
        const n = nums.length;

        for (let num of nums) {
            
            counts[num] = (counts[num] || 0) + 1;
            
            if (counts[num] > n / 2) {
                return num;
            }
        }

        return 0;  // 不會執行到這裡，因題目保證存在答案
    };
}

let nums = [2, 2, 1, 1, 1, 2, 2];

// 創建 Solution 的實例
let solution = new Solution();

console.log(solution.majorityElement(nums));

/*
LeetCode 169: 多数元素 (Majority Element) (Node.js 實現 - 優化哈希表計數)

題目翻譯：
給定一個大小為 n 的陣列 nums ，返回其中的多數元素。多數元素是指在陣列中出現次數 大於 ⌊ n/2 ⌋ 的元素。你可以假設陣列是非空的，並且給定的陣列總是存在多數元素。

題目需求：
1. 找到陣列中出現次數超過陣列長度一半的元素（眾數）。
2. 假設陣列非空且總是存在眾數。

解題思路與拆解：
1. 問題分析：
   - 需要統計每個元素在陣列中出現的次數。
   - 找到出現次數超過陣列長度一半的元素。
   - 本解法在統計過程中，一旦發現某個元素的計數超過閾值，就立即返回，避免了遍歷整個哈希表的步驟。

2. 解題方法選擇：
   - 方法一：哈希映射 (Hash Map) (本解法採用 - 優化版本) - 時間 O(N)，空間 O(N)
   - 方法二：排序 - 時間 O(N log N)，空間 O(log N) 或 O(N)
   - 方法三：Boyer-Moore 投票算法 - 時間 O(N)，空間 O(1)

3. 解題步驟 (優化哈希表計數)：
   - 創建一個空的哈希表（JavaScript 中的 Object）用於存儲每個數字及其出現的次數。
   - 獲取輸入陣列 `nums` 的長度 `n`。
   - 遍歷輸入陣列 `nums`。
   - 對於陣列中的每個數字 `num`：
     - 更新該數字在哈希表 `counts` 中的計數。使用 `counts[num] = (counts[num] || 0) + 1;`，如果數字不存在則初始化為 1，否則加 1。
     - 檢查該數字的計數 `counts[num]` 是否大於陣列長度的一半 (`n / 2`)。
     - 如果是，則該數字就是眾數，立即返回該數字。
   - 由於題目保證眾數一定存在，所以迴圈中一定會找到並返回結果，最後的 `return 0;` 實際上不會被執行到。

重點筆記：
1. **哈希表 (Hash Map) 的應用**:
   - 使用哈希表可以高效地統計每個元素的出現次數，平均情況下插入、查找和更新操作的時間複雜度都是 O(1)。

2. **時間複雜度**:
   - O(N)，其中 N 是陣列 `nums` 的長度。只需要遍歷陣列一次。

3. **空間複雜度**:
   - O(N)，在最壞情況下（所有元素都不同），哈希表需要存儲 N 個鍵值對。

4. **優化**:
   - 本解法在統計過程中實時檢查是否已找到眾數，一旦找到就立即返回，避免了額外的哈希表遍歷，在實際執行中可能會更高效。

5. **適用場景**:
   - 適用於需要統計元素出現次數並找到滿足特定條件的元素的問題。

範例解析 (nums = [2, 2, 1, 1, 1, 2, 2]):
- 創建一個空的哈希表 `counts = {}`。
- `n = 7`。
- 遍歷 `nums`:
  - `num = 2`: `counts[2] = 1`。`1 > 7 / 2 = 3.5` 為 false。
  - `num = 2`: `counts[2] = 2`。`2 > 3.5` 為 false。
  - `num = 1`: `counts[1] = 1`。`1 > 3.5` 為 false。
  - `num = 1`: `counts[1] = 2`。`2 > 3.5` 為 false。
  - `num = 1`: `counts[1] = 3`。`3 > 3.5` 為 false。
  - `num = 2`: `counts[2] = 3`。`3 > 3.5` 為 false。
  - `num = 2`: `counts[2] = 4`。`4 > 3.5` 為 true，返回 `2`。

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `majorityElement(nums)`: 尋找眾數的核心方法 (使用優化哈希表計數)。
- `const counts = {};`: 初始化一個空的哈希表用於存儲元素計數。
- `const n = nums.length;`: 獲取陣列長度。
- `for (let num of nums)`: 遍歷輸入陣列。
- `counts[num] = (counts[num] || 0) + 1;`: 更新哈希表中數字的計數。
- `if (counts[num] > n / 2)`: 檢查計數是否超過閾值。
- `return num;`: 返回眾數。
- `return 0;`: 由於題目保證存在答案，這行不會執行到。
- `let nums = [...]`: 定義測試範例。
- `let solution = new Solution();`: 創建 Solution 實例。
- `console.log(...)`: 調用方法並打印結果。
*/
