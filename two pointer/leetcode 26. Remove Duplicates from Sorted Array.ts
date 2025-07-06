export {};

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums: number[]): number {
        // 處理邊界情況：如果陣列為空，則沒有重複項，長度為 0。
        if (nums.length === 0) {
            return 0;
        }

        // 使用雙指針法。
        // `i` (慢指針) 指向目前唯一元素的最後一個位置。它也代表了最終唯一陣列的長度減一。
        // `j` (快指針) 遍歷整個陣列，尋找新的唯一元素。
        let i: number = 0;

        // 從第二個元素開始遍歷 (j=1)，因為第一個元素 (nums[0]) 必然是唯一的。
        for (let j: number = 1; j < nums.length; j++) {
            // 比較快指針 `j` 所指的元素與慢指針 `i` 所指的元素。
            // 由於陣列是已排序的，如果 `nums[j]` 不等於 `nums[i]`，
            // 則表示 `nums[j]` 是一個新的唯一元素。
            if (nums[j] !== nums[i]) {
                // 將慢指針 `i` 向前移動一位，為新的唯一元素騰出空間。
                i++;
                // 將新找到的唯一元素 `nums[j]` 放置到 `nums[i]` 的位置。
                // 這樣，從 `nums[0]` 到 `nums[i]` 的子陣列就包含了所有唯一的元素。
                nums[i] = nums[j];
            }
            // 如果 `nums[j]` 等於 `nums[i]`，則表示 `nums[j]` 是一個重複元素。
            // 我們不需要對它做任何操作，只需讓 `j` 繼續前進，跳過這個重複項。
        }

        // 當循環結束時，`i` 指向唯一子陣列的最後一個元素的索引。
        // 因此，唯一元素的數量（新長度）是 `i + 1`。
        // 陣列 `nums` 的前 `i + 1` 個元素現在包含所有唯一的元素。
        return i + 1;
    }
}

// 測試範例
// 創建 Solution 類別的實例。
const solution = new Solution();

// 範例 1
let nums1: number[] = [1, 1, 2];
// 為了驗證 in-place 修改，我們將原始陣列傳遞給函式，並在之後檢查它。
const len1: number = solution.removeDuplicates(nums1);
console.log(`Original array: [1,1,2]`);
console.log(`New length: ${len1}`); // 預期輸出：2
console.log(`Modified array (first ${len1} elements): ${nums1.slice(0, len1)}`); // 預期輸出：[1,2]


// 範例 2
let nums2: number[] = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const len2: number = solution.removeDuplicates(nums2);
console.log(`\nOriginal array: [0,0,1,1,1,2,2,3,3,4]`);
console.log(`New length: ${len2}`); // 預期輸出：5
console.log(`Modified array (first ${len2} elements): ${nums2.slice(0, len2)}`); // 預期輸出：[0,1,2,3,4]

// 範例 3 (空陣列)
let nums3: number[] = [];
const len3: number = solution.removeDuplicates(nums3);
console.log(`\nOriginal array: []`);
console.log(`New length: ${len3}`); // 預期輸出：0
console.log(`Modified array (first ${len3} elements): ${nums3.slice(0, len3)}`); // 預期輸出：[]

// 範例 4 (只有一個元素)
let nums4: number[] = [7];
const len4: number = solution.removeDuplicates(nums4);
console.log(`\nOriginal array: [7]`);
console.log(`New length: ${len4}`); // 預期輸出：1
console.log(`Modified array (first ${len4} elements): ${nums4.slice(0, len4)}`); // 預期輸出：[7]

// 範例 5 (所有元素都重複)
let nums5: number[] = [5, 5, 5, 5, 5];
const len5: number = solution.removeDuplicates(nums5);
console.log(`\nOriginal array: [5,5,5,5,5]`);
console.log(`New length: ${len5}`); // 預期輸出：1
console.log(`Modified array (first ${len5} elements): ${nums5.slice(0, len5)}`); // 預期輸出：[5]


/*
LeetCode 26: 移除排序陣列中的重複項 (Remove Duplicates from Sorted Array) (TypeScript 實現)

題目翻譯：
給定一個已排序的陣列 `nums`，請在 **原地** 移除重複項，使每個元素只出現一次，並返回新的長度。
不要為此目的分配額外的陣列空間，你必須使用 O(1) 的額外空間 **原地** 修改輸入陣列。

題目需求：
1. 接收一個已排序的數字陣列 `nums` 作為輸入。
2. 從陣列中移除所有重複的元素，確保每個唯一的元素只出現一次。
3. **必須在原地 (in-place) 修改輸入陣列**，不能創建新陣列。
4. 返回移除重複後陣列的新長度。
5. 陣列中超出新長度的元素內容不重要。

解題思路與拆解：
由於陣列是已排序的，所有重複的元素都會是相鄰的。這使得我們可以利用雙指針技術來高效地解決這個問題。

1. 問題分析：
   - 「原地修改」和「O(1) 額外空間」是關鍵約束，這意味著我們不能簡單地創建一個 `Set` 或新陣列來儲存唯一元素。
   - 「已排序」是重要的提示，它保證了重複元素總是連續出現。

2. 解題方法選擇：
   - **雙指針法 (Two-Pointer Approach)** (本解法採用)：一個指針（慢指針 `i`）用來記錄唯一元素的最終位置，另一個指針（快指針 `j`）用來遍歷陣列。

3. 解題步驟 (雙指針法)：
   - **步驟 1：處理邊界情況。**
     - 如果輸入陣列 `nums` 的長度為 0，則直接返回 0（沒有元素，也就沒有重複項）。
   - **步驟 2：初始化指針。**
     - 設置慢指針 `i` 為 0。這個指針將始終指向目前找到的唯一元素子陣列的最後一個位置。從概念上講，`nums[0...i]` 包含了所有唯一的元素。
     - 設置快指針 `j` 為 1。這個指針將從陣列的第二個元素開始遍歷到陣列的末尾。
   - **步驟 3：遍歷陣列。**
     - 使用一個 `for` 迴圈，讓 `j` 從 1 遍歷到 `nums.length - 1`。
     - 在迴圈內部，比較 `nums[j]`（快指針當前指向的元素）和 `nums[i]`（慢指針指向的唯一元素）。
   - **步驟 4：判斷是否為新的唯一元素。**
     - 如果 `nums[j]` 不等於 `nums[i]`：這表示 `nums[j]` 是一個新的、不重複的元素。
       - 首先，將慢指針 `i` 向右移動一位（`i++`），為這個新的唯一元素騰出空間。
       - 然後，將 `nums[j]` 的值複製到 `nums[i]` 的位置 (`nums[i] = nums[j]`)。這樣，`nums[i]` 現在包含了這個新的唯一元素，並且 `nums[0...i]` 仍然是唯一的。
     - 如果 `nums[j]` 等於 `nums[i]`：這表示 `nums[j]` 是一個重複元素。
       - 我們不需要對它做任何操作。只需讓快指針 `j` 繼續前進，跳過這個重複項。慢指針 `i` 保持不動，因為 `nums[i]` 已經是該值的唯一副本。
   - **步驟 5：返回新長度。**
     - 當迴圈結束時，慢指針 `i` 將指向唯一元素子陣列的最後一個元素的索引。
     - 因此，唯一元素的數量（也就是新的長度）是 `i + 1`。返回這個值。

重點筆記：
1.  **原地修改：** 關鍵在於利用已排序的特性，將不重複的元素直接寫到陣列的前面部分。
2.  **雙指針效率：** `i` 維護結果陣列的末尾，`j` 探索原始陣列。這種方法只進行一次遍歷，效率很高。
3.  **條件判斷：** `if (nums[j] !== nums[i])` 是核心判斷。只有當遇到與當前唯一元素不同的元素時，才將其納入唯一列表。
4.  **返回長度：** 函式返回的是長度，而非修改後的陣列本身。但題目要求修改後的唯一元素要放在陣列的前面，這正是此方法所做的。

時間複雜度：O(n)，其中 n 是陣列 `nums` 的長度。因為快指針 `j` 遍歷了陣列中的所有元素一次。
空間複雜度：O(1)。我們只使用了幾個常數空間的變數（`i`, `j`, `nums.length` 等），沒有額外分配與輸入大小相關的空間。

函數功能說明：
- `removeDuplicates(nums: number[]): number` (作為 Solution 類別的一個方法): 接收一個已排序的數字陣列 `nums`，原地移除重複項，並返回移除重複後陣列的新長度。
- `if (nums.length === 0)`: 處理空陣列的邊界情況。
- `let i: number = 0`: 初始化慢指針。
- `for (let j: number = 1; j < nums.length; j++)`: 快指針遍歷。
- `if (nums[j] !== nums[i])`: 判斷是否為新唯一元素。
- `i++; nums[i] = nums[j];`: 將新唯一元素放入正確位置。
- `return i + 1`: 返回新長度。
*/