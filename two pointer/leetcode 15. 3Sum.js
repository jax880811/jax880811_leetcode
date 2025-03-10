class Solution {
    threeSum(nums) {
        const result = []; // 用於存儲結果
        nums.sort(); // 將數組排序
        
        for (let i = 0; i < nums.length - 2; i++) {
            // 跳過重複的 nums[i]
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }

            let j = i + 1; // 左指針
            let k = nums.length - 1; // 右指針

            while (j < k) {
                const sum = nums[i] + nums[j] + nums[k];

                if (sum === 0) {
                    result.push([nums[i], nums[j], nums[k]]);
                    // 跳過重複的 nums[j] 和 nums[k]
                    while (j < k && nums[j] === nums[j + 1]) j++;
                    while (j < k && nums[k] === nums[k - 1]) k--;
                    j++;
                    k--;
                } else if (sum < 0) {
                    j++; // 如果和小於 0，移動左指針
                } else {
                    k--; // 如果和大於 0，移動右指針
                }

            }
        }

        return result;
    }
}






const nums = [-1, 0, 1, 2, -1, -4];
const solution = new Solution();
console.log(solution.threeSum(nums)); // 輸出: [[-1, -1, 2], [-1, 0, 1]]

/*
三數之和

重點筆記：
1. **排序數組**:
   - 將數組排序，方便後續處理。

2. **固定一個數，使用雙指針法**:
   - 固定一個數 `nums[i]`，然後使用雙指針法在剩餘的數組中尋找兩個數 `nums[j]` 和 `nums[k]`，使得 `nums[i] + nums[j] + nums[k] == 0`。

3. **避免重複**:
   - 在固定 `nums[i]` 和移動指針時，跳過重複的元素，避免重複的三元組。

4. **時間複雜度**:
   - 排序的時間複雜度為 O(N log N)。
   - 雙指針法的時間複雜度為 O(N^2)。
   - 總時間複雜度為 O(N^2)。

5. **空間複雜度**:
   - 結果數組的空間複雜度為 O(N)，其中 N 是結果的數量。

6. **適用場景**:
   - 適合處理中等規模的數組，例如：統計學中的三數之和問題、數據分析中的組合問題等。

範例解析：
- 輸入：nums = [-1, 0, 1, 2, -1, -4]
- 過程：
  - 排序後：nums = [-4, -1, -1, 0, 1, 2]
  - 固定 -4，尋找兩個數使其和為 4。
  - 固定 -1，尋找兩個數使其和為 1。
  - 找到 [-1, -1, 2] 和 [-1, 0, 1]。
- 輸出：[[-1, -1, 2], [-1, 0, 1]]


*/