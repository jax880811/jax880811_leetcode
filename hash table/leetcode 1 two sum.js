class Solution {
    // 定義 twoSum 方法，使用 Hash Map 來加速查找
    twoSum(nums, target) {
        // 建立一個 Hash Map（JavaScript 使用 Map 物件）
        let numMap = new Map();

        // 遍歷數組的每個元素
        for (let i = 0; i < nums.length; i++) {
            // 計算需要的數值，即目標數減去當前數
            let complement = target - nums[i];

            // 如果哈希表內已有該數值，則返回該數值的索引與當前索引
            if (numMap.has(complement)) {
                return [numMap.get(complement), i];
            }

            // 如果哈希表內沒有該數值，則存入當前數字與索引
            numMap.set(nums[i], i);
        }

        // 根據題目要求，這段程式碼理論上不會執行
        return [];
    }
}

// 測試範例
let nums = [2, 7, 11, 15];
let target = 9;

// 創建 Solution 的實例
let solution = new Solution();

// 調用 twoSum 方法並輸出結果
console.log(solution.twoSum(nums, target));  // 輸出應該是 [0, 1]

/*
📌 **重點筆記**
1. **哈希表法**：
   - 使用 `Map` 來記錄已遍歷過的數字和索引。
   - 每次計算 `target - nums[i]` 是否已經出現在 `Map` 中。
   - 若出現，則返回兩個索引。

2. **時間複雜度**：
   - 只遍歷一次 `nums`，每次查找 `Map` 需要 **O(1)**。
   - **總時間複雜度為 O(N)**。

3. **空間複雜度**：
   - 需要一個 `Map` 來存儲 `N` 個數字，空間複雜度為 **O(N)**。

4. **適用場景**：
   - 適合大規模數據（如 `N > 10^5`）。
   - 一般來說，比暴力法快很多。
*/