class Solution {
    /**
     * 找到比目標字母大的最小字母
     * @param {string[]} letters - 已排序的字母數組
     * @param {string} target - 目標字母
     * @return {string} - 比目標字母大的最小字母
     */
    nextGreatestLetter = function (letters, target) {
        // 如果 letters 為空，直接返回
        if (!letters) {
            return;
        }
        // 如果 letters 只有一個字母且大於目標字母，直接返回該字母
        if (letters.length == 1 && letters[0] > target) {
            return letters[0];
        }

        let left = 0; // 左指針
        let right = letters.length; // 右指針

        // 使用二分查找來找到比目標字母大的最小字母
        for (let i = 0; i < letters.length; i++) {
            let mid = Math.floor((left + right) / 2); // 計算中間索引
            if (letters[mid] <= target) {
                left = mid + 1; // 如果中間字母小於等於目標字母，搜索右半部分
            } else {
                right = mid - 1; // 如果中間字母大於目標字母，搜索左半部分
            }
        }

        // 如果 left 超出數組範圍，返回第一個字母（循環）
        return letters[left % letters.length];
    };
}

// 測試範例
let letters = ["c", "f", "j"];
let target = "c";

// 創建 Solution 的實例
let solution = new Solution();

console.log(solution.nextGreatestLetter(letters, target)); // 輸出 "f"


/*
LeetCode 744: 找到比目標字母大的最小字母

題目翻譯：
給你一個已排序的字母數組 letters，其中包含小寫字母，並且至少包含兩個不同的字母。
給定一個目標字母 target，請找到 letters 中比 target 大的最小字母。
如果 letters 中沒有比 target 大的字母，則返回 letters 中的第一個字母。

題目需求：
1. 找到比目標字母大的最小字母。
2. 如果沒有比目標字母大的字母，則返回數組中的第一個字母（循環）。

原始代碼的問題：
1. 如果直接使用線性搜索，時間複雜度為 O(n)，效率較低。
2. 需要一種高效的方式來找到比目標字母大的最小字母。

解題思路與拆解：
1. 問題分析：
   - 數組已排序，可以使用二分查找來提高效率。
   - 需要找到第一個大於目標字母的字母。

2. 解題方法選擇：
   - 使用二分查找來找到比目標字母大的最小字母。
   - 如果沒有找到，則返回數組中的第一個字母。

3. 解題步驟：
   - 初始化左右指針 left 和 right。
   - 使用二分查找來搜索比目標字母大的最小字母。
   - 如果 left 超出數組範圍，返回第一個字母。

重點筆記：
1. **二分查找的使用**:
   - 適用於已排序的數組，時間複雜度為 O(log n)。
   - 通過比較中間字母與目標字母來縮小搜索範圍。

2. **時間複雜度**:
   - O(log n)，其中 n 是數組的長度。

3. **空間複雜度**:
   - O(1)，只使用了常數級別的額外空間。

4. **適用場景**:
   - 適用於已排序數組的搜索問題。
   - 例如查找插入位置、查找邊界等。

範例解析：
- 輸入：letters = ["c", "f", "j"], target = "a"
- 過程：
  - 二分查找找到第一個大於 "a" 的字母 "c"。
- 輸出："c"

函式功能說明：
- `nextGreatestLetter(letters, target)`：找到比目標字母大的最小字母。
- `left` 和 `right`：二分查找的左右指針。
- `mid`：中間索引。
- `letters[left] || letters[0]`：如果 left 超出數組範圍，返回第一個字母。
*/