
class Solution {
    search(nums, target) {
        let left = 0;
        let right = nums.length - 1; // 改為左閉右閉區間

        while (left <= right) {      // 正確的循環條件
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                return mid;         // 找到目標值
            } else if (nums[mid] < target) {
                left = mid + 1;     // 搜索右半部分
            } else {
                right = mid - 1;    // 搜索左半部分
            }
        }

        return -1; // 未找到
    }
}
//這題有自己做出來
// 測試範例
const nums = [-1,0,3,5,9,12];
const target = 9;
const solution = new Solution();
console.log(solution.search(nums, target)); // 輸出 true

/*
LeetCode 704: 二分查找

題目翻譯：
給你一個已排序的整數數組 nums 和一個目標值 target，請檢查 nums 中是否存在 target。
如果存在，返回 true；否則返回 false。

題目需求：
1. 在已排序的數組中查找目標值。
2. 返回目標值是否存在。

解題思路與拆解：
1. 問題分析：
   - 數組已排序，可以使用二分查找來提高效率。
   - 需要找到目標值的位置。

2. 解題方法選擇：
   - 使用二分查找來搜索目標值。
   - 如果找到目標值，返回 true；否則返回 false。

3. 解題步驟：
   - 初始化左右指針 left 和 right。
   - 使用二分查找來搜索目標值。
   - 如果找到目標值，返回 true。
   - 如果未找到目標值，返回 false。

重點筆記：
1. **二分查找的使用**:
   - 適用於已排序的數組，時間複雜度為 O(log n)。
   - 通過比較中間值與目標值來縮小搜索範圍。

2. **時間複雜度**:
   - O(log n)，其中 n 是數組的長度。

3. **空間複雜度**:
   - O(1)，只使用了常數級別的額外空間。

4. **適用場景**:
   - 適用於已排序數組的搜索問題。
   - 例如查找插入位置、查找邊界等。

範例解析：
- 輸入：nums = [-1, 0, 3, 5, 9, 12], target = 9
- 過程：
  - 二分查找找到目標值 9。
- 輸出：4(index值)

函式功能說明：
- `class Solution`：封裝解決方案的類。
- `search(nums, target)`：在已排序的數組中查找目標值。
- `left` 和 `right`：二分查找的左右指針。
- `mid`：中間索引。
- `nums[mid] === target`：檢查是否找到目標值。
- `nums[mid] < target`：搜索右半部分。
- `nums[mid] > target`：搜索左半部分。
*/