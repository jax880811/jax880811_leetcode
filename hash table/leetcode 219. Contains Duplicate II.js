class Solution {
    /**
     * 檢查數組中是否存在兩個不同的索引 i 和 j，
     * 使得 nums[i] = nums[j] 且 abs(i - j) <= k
     * @param {number[]} nums - 整數數組
     * @param {number} k - 索引最大允許距離
     * @return {boolean} - 是否存在滿足條件的重複元素
     */
    containsNearbyDuplicate = function (nums, k) {
        // 使用 Map 記錄元素最近出現的索引
        const map = new Map()
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (map.has(num)) {
                const lastindex = map.get(num);
                if (Math.abs(i - lastindex) <= k) {
                    return true;
                }
            }


            map.set(num, i);

        }
        return false;
    }
}

// 測試範例
if (require.main === module) {
    const solution = new Solution();

    // 範例 1
    const nums1 = [1, 2, 3, 1];
    const k1 = 3;
    console.log(solution.containsNearbyDuplicate(nums1, k1)); // 輸出: true

    // 範例 2
    const nums2 = [1, 0, 1, 1];
    const k2 = 1;
    console.log(solution.containsNearbyDuplicate(nums2, k2)); // 輸出: true

    // 範例 3
    const nums3 = [1, 2, 3, 1, 2, 3];
    const k3 = 2;
    console.log(solution.containsNearbyDuplicate(nums3, k3)); // 輸出: false
}

/*
LeetCode 219: 存在重複元素 II

題目翻譯：
給定一個整數數組 nums 和一個整數 k，判斷數組中是否存在兩個不同的索引 i 和 j，
使得 nums[i] == nums[j] 且 abs(i - j) <= k。

題目需求：
1. 檢查是否存在重複元素，且重複元素的索引差 ≤ k。
2. 返回布林值表示是否存在。

解題思路與拆解：
1. 問題分析：
   - 需要快速查找元素是否在最近 k 個位置出現過。
   - 需要記錄元素的最新索引。

2. 方法選擇：
   - 哈希表法：使用 Map 記錄元素最近出現的索引。
   - 滑動窗口法：維護一個大小為 k 的窗口（空間更優）。

3. 解決步驟：
   - 遍歷數組，用 Map 記錄每個元素的最近索引。
   - 遇到重複元素時檢查索引差。
   - 若滿足條件立即返回 true。

重點筆記：
1. **哈希表法**:
   - 時間複雜度：O(n)，只需一次遍歷。
   - 空間複雜度：O(min(n,k))，最多存儲 k 個元素。

2. **滑動窗口優化**:
   - 可改為只維護最近 k 個元素的 Set，
   - 當窗口大小 > k 時刪除最舊元素，
   - 空間複雜度降至 O(k)。

3. **邊界條件**:
   - k = 0 時直接返回 false。
   - 空數組返回 false。

範例解析：
- 輸入：nums = [1,2,3,1], k = 3
  - i=0: Map = {1:0}
  - i=1: Map = {1:0, 2:1}
  - i=2: Map = {1:0, 2:1, 3:2}
  - i=3: 發現 1 已存在，lastIndex=0，3-0=3 ≤ k → 返回 true

函式功能說明：
- `indexMap`：記錄元素最近出現的索引。
- `indexMap.has(num)`：檢查元素是否已存在。
- `indexMap.get(num)`：獲取元素上次出現的索引。
- `indexMap.set(num, i)`：更新元素的最新索引。
*/