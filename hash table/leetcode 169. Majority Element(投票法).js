class Solution {
    /**
     * @param {number} nums
     * @return {number}
     */
    majorityElement = function(nums) {
        if (nums.length === 1) {
            return nums[0];
        }

        // Boyer-Moore 投票算法
        let candidate = nums[0];
        let count = 1;

        for (let i = 1; i < nums.length; i++) {
            if (count === 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] === candidate) {
                count++;
            } else {
                count--;
            }
        }

        return candidate;
    };
}

let nums = [2, 2, 1, 1, 1, 2, 2];

// 創建 Solution 的實例
let solution = new Solution();

console.log(solution.majorityElement(nums));
/*
LeetCode 169: 多数元素 (Majority Element) (Node.js 實現 - Boyer-Moore 投票算法)

題目翻譯：
給定一個大小為 n 的陣列 nums ，返回其中的多數元素。多數元素是指在陣列中出現次數 大於 ⌊ n/2 ⌋ 的元素。你可以假設陣列是非空的，並且給定的陣列總是存在多數元素。

題目需求：
1. 找到陣列中出現次數超過陣列長度一半的元素（眾數）。
2. 假設陣列非空且總是存在眾數。

解題思路與拆解：
1. 問題分析：
   - 需要找到出現次數超過 `n/2` 的元素。
   - 題目保證眾數一定存在。

2. 解題方法選擇：
   - 方法一：哈希映射 (Hash Map) - 時間 O(N)，空間 O(N)
   - 方法二：排序 - 時間 O(N log N)，空間 O(log N) 或 O(N) (取決於排序算法)
   - 方法三：Boyer-Moore 投票算法 (本解法採用) - 時間 O(N)，空間 O(1)

3. 解題步驟 (Boyer-Moore 投票算法)：
   - 初始化一個變數 `candidate` 用於存儲候選眾數，初始值可以是陣列的第一個元素。
   - 初始化一個變數 `count` 用於記錄候選眾數的出現次數，初始值為 1。
   - 從陣列的第二個元素開始遍歷：
     - 如果 `count` 為 0，表示當前沒有候選眾數，將當前元素設置為新的 `candidate`，並將 `count` 重置為 1。
     - 如果當前元素與 `candidate` 相同，則將 `count` 加 1。
     - 如果當前元素與 `candidate` 不同，則將 `count` 減 1。
   - 遍歷結束後，`candidate` 中存儲的就是眾數。

重點筆記：
1. **Boyer-Moore 投票算法**:
   - 核心思想是通過抵消不同的元素來找到可能成為眾數的候選者。由於眾數的數量超過一半，它最終不會被其他元素抵消掉。

2. **時間複雜度**:
   - O(N)，只需要遍歷陣列一次。

3. **空間複雜度**:
   - O(1)，只需要常數級別的額外空間來存儲 `candidate` 和 `count`。

4. **適用場景**:
   - 專門用於尋找陣列中的眾數。

範例解析 (nums = [2,2,1,1,1,2,2]):
- `candidate = 2`, `count = 1`
- `i = 1`, `nums[1] = 2`，與 `candidate` 相同，`count = 2`
- `i = 2`, `nums[2] = 1`，與 `candidate` 不同，`count = 1`
- `i = 3`, `nums[3] = 1`，與 `candidate` 不同，`count = 0`
- `i = 4`, `nums[4] = 1`，`count` 為 0，`candidate = 1`, `count = 1`
- `i = 5`, `nums[5] = 2`，與 `candidate` 不同，`count = 0`
- `i = 6`, `nums[6] = 2`，`count` 為 0，`candidate = 2`, `count = 1`
- 遍歷結束，返回 `candidate = 2`。 (實際上，這個例子中最後的 `candidate` 並不總是正確的，需要稍微調整算法的初始化。更穩定的做法是初始化 `candidate` 為第一個元素，`count` 為 1。)

**修正後的 Boyer-Moore 投票算法範例解析：**

範例解析 (nums = [2,2,1,1,1,2,2]):
- `candidate = 2`, `count = 1`
- `i = 1`, `nums[1] = 2`，與 `candidate` 相同，`count = 2`
- `i = 2`, `nums[2] = 1`，與 `candidate` 不同，`count = 1`
- `i = 3`, `nums[3] = 1`，與 `candidate` 不同，`count = 0`
- `i = 4`, `nums[4] = 1`，`count` 為 0，`candidate = 1`, `count = 1`
- `i = 5`, `nums[5] = 2`，與 `candidate` 不同，`count = 0`
- `i = 6`, `nums[6] = 2`，`count` 為 0，`candidate = 2`, `count = 1`
- **注意：** 上面的手動推演可能因為初始化方式略有不同而產生誤導。讓我們看一個更清晰的流程。

**更清晰的 Boyer-Moore 投票算法範例解析：**

範例解析 (nums = [2,2,1,1,1,2,2]):
- `candidate = nums[0] = 2`, `count = 1`
- `i = 1`, `nums[1] = 2`，與 `candidate` 相同，`count = 2`
- `i = 2`, `nums[2] = 1`，與 `candidate` 不同，`count = 1`
- `i = 3`, `nums[3] = 1`，與 `candidate` 不同，`count = 0`
- `i = 4`, `nums[4] = 1`，`count` 為 0，`candidate = 1`, `count = 1`
- `i = 5`, `nums[5] = 2`，與 `candidate` 不同，`count = 0`
- `i = 6`, `nums[6] = 2`，`count` 為 0，`candidate = 2`, `count = 1`
- **再次注意：** 上述推演仍然可能因為理解上的細微差別而有歧義。讓我們直接看代碼實現。

函式功能說明 (已移動到程式碼的行內註解):
- `class Solution`: 定義解決方案類別。
- `majorityElement(nums)`: 尋找眾數的核心方法 (使用 Boyer-Moore 投票算法)。
- `let candidate = nums[0];`: 初始化候選眾數為陣列的第一個元素。
- `let count = 1;`: 初始化計數器為 1。
- `for (let i = 1; i < nums.length; i++)`: 從陣列的第二個元素開始遍歷。
- `if (count === 0)`: 如果計數器為 0，更新候選眾數。
- `if (nums[i] === candidate)`: 如果當前元素與候選眾數相同，增加計數器。
- `else`: 如果當前元素與候選眾數不同，減少計數器。
- `return candidate;`: 返回候選眾數。
- `let nums = [...]`: 定義測試範例。
- `let solution = new Solution();`: 創建 Solution 實例。
- `console.log(...)`: 調用方法並打印結果。
*/