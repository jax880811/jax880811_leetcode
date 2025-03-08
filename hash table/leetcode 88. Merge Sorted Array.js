class Solution {
    merge(nums1, m, nums2, n) {
        let i = m - 1; // nums1 的最後一個有效元素
        let j = n - 1; // nums2 的最後一個元素
        let k = m + n - 1; // nums1 的最後一個位置

        // 從後往前合併
        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k] = nums1[i];
                i--;
            } else {
                nums1[k] = nums2[j];
                j--;
            }
            k--;
        }

        // 如果 nums2 中還有剩餘元素，直接複製到 nums1
        while (j >= 0) {
            nums1[k] = nums2[j];
            j--;
            k--;
        }
    }
}

// 測試範例
let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

let solution = new Solution();
solution.merge(nums1, m, nums2, n);
console.log(nums1); // 輸出: [1, 2, 2, 3, 5, 6]

/*
合併兩個有序數組

重點筆記：
1. **從後往前合併**:
   - 由於 `nums1` 的後半部分是空的，從後往前合併可以避免覆蓋 `nums1` 中的有效元素。

2. **指針的使用**:
   - `i`：指向 `nums1` 的最後一個有效元素。
   - `j`：指向 `nums2` 的最後一個元素。
   - `k`：指向 `nums1` 的最後一個位置。

3. **時間複雜度**:
   - 只需遍歷 `nums1` 和 `nums2` 一次，時間複雜度為 O(m + n)。

4. **空間複雜度**:
   - 只使用了常數級別的額外空間，空間複雜度為 O(1)。

5. **適用場景**:
   - 適合處理大規模數據，因為時間和空間複雜度都很低。
   - 例如：合併兩個有序列表、數據庫中的合併操作等。

範例解析：
- 輸入：nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
- 過程：
  - 比較 3 和 6，將 6 放入 nums1[5]，k = 4, j = 2
  - 比較 3 和 5，將 5 放入 nums1[4]，k = 3, j = 1
  - 比較 3 和 2，將 3 放入 nums1[3]，k = 2, i = 2
  - 比較 2 和 2，將 2 放入 nums1[2]，k = 1, j = 0
  - 比較 2 和 1，將 2 放入 nums1[1]，k = 0, i = 1
  - 將剩餘的 1 放入 nums1[0]
- 輸出：nums1 = [1, 2, 2, 3, 5, 6]
*/