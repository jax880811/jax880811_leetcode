
class Solution {

    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    lengthOfLIS = function (nums) {
        if (!nums){
            return 0;
        }
        let answer = [];
        for (let num of nums){
            let left = 0;
            let right = answer.length;
            while(left<right){
                let mid = Math.floor((left+right)/2);
                if(answer[mid]<num){
                    left = mid +1;
                }
                else{
                    right = mid;
                }
            }
            if(left === answer.length){
                answer.push(num);
            }
            else{
                answer[left] = num;
            }
        }
        return answer.length;

    }
}
/*
class Solution {

    
    lengthOfLIS = function (nums) {
        // 如果輸入陣列為空，則最長遞增子序列的長度為 0。
        if (!nums || nums.length === 0) {
            return 0;
        }

        // `tails` 陣列用於儲存所有長度為 `i+1` 的遞增子序列中最小的尾部元素。
        // 例如，如果 `tails = [2, 3, 7]`，則表示存在長度為 1 的遞增子序列，其最小尾部是 2；
        // 存在長度為 2 的遞增子序列，其最小尾部是 3；存在長度為 3 的遞增子序列，其最小尾部是 7。
        const tails = [];

        // 遍歷輸入陣列 `nums` 中的每個數字。
        for (const num of nums) {
            // 我們需要找到 `tails` 陣列中第一個大於或等於 `num` 的元素。
            // 如果找到這樣的元素，我們將其替換為 `num`。
            // 這樣做的目的是保持 `tails` 陣列中相同長度的遞增子序列的尾部元素盡可能小，
            // 這有助於我們在之後更容易擴展遞增子序列。

            // 如果沒有找到大於或等於 `num` 的元素，則表示 `num` 可以擴展當前最長的遞增子序列，
            // 或者它可以作為一個新的更長的遞增子序列的尾部（如果 `num` 大於 `tails` 中的所有元素）。

            // 實現二分搜尋來找到 `tails` 陣列中第一個大於或等於 `num` 的元素的索引。
            let left = 0;
            let right = tails.length;

            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (tails[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            // `left` 現在指向 `tails` 中第一個大於或等於 `num` 的元素的索引（如果存在）。
            // 如果 `left` 等於 `tails.length`，表示 `num` 大於 `tails` 中的所有元素，
            // 我們可以將 `num` 添加到 `tails` 的末尾，從而將最長遞增子序列的長度增加 1。
            if (left === tails.length) {
                tails.push(num);
            } else {
                // 否則，我們將 `tails` 中索引為 `left` 的元素替換為 `num`。
                // 這樣做的目的是保持相同長度的遞增子序列的尾部元素盡可能小。
                tails[left] = num;
            }
        }

        // `tails` 陣列的長度就是最長遞增子序列的長度。
        return tails.length;

    }
}
*/

// 測試範例
let nums = [10, 9, 2, 5, 3, 7, 101, 18];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.lengthOfLIS(nums));

/*
LeetCode 300: 最長遞增子序列 (Longest Increasing Subsequence) (Node.js 實現 - Patience Sorting 優化的動態規劃)

題目翻譯：
給你一個整數陣列 `nums`，找到其中最長嚴格遞增子序列的長度。
子序列是由陣列派生而來的序列，刪除（或不刪除）陣列中的某些元素而不改變其餘元素的順序。例如，`[3,6,2,7]` 是陣列 `[0,3,1,6,2,2,7]` 的子序列。

題目需求：
1. 接收一個整數陣列 `nums` 作為輸入。
2. 找出 `nums` 中最長嚴格遞增子序列的長度。
3. 子序列中的元素必須嚴格遞增（即後一個元素必須大於前一個元素）。

解題思路與拆解：
本解法採用了一種基於耐心排序 (Patience Sorting) 思想的優化動態規劃方法，其時間複雜度為 O(n log n)，空間複雜度為 O(n)。

1. 問題分析：
   - 我們需要找到一個子序列，這個子序列中的元素是嚴格遞增的，並且這個子序列的長度是所有可能的遞增子序列中最長的。

2. 解題方法選擇：
   - **方法一：動態規劃 (O(n^2))** - 傳統的動態規劃方法，對於每個元素，遍歷其前面的所有元素，找到可以擴展的最長遞增子序列。
   - **方法二：動態規劃與二分搜尋 (O(n log n))** - 本解法採用的方法，它維護一個 `tails` 陣列，用於儲存到目前為止找到的所有長度的遞增子序列中最小的尾部元素。

3. 解題步驟 (動態規劃與二分搜尋)：
   - **步驟 1：處理空陣列。**
     - 如果輸入陣列 `nums` 為空，則最長遞增子序列的長度為 0，直接返回 0。
   - **步驟 2：初始化 `tails` 陣列。**
     - 創建一個空陣列 `tails`。這個陣列將會儲存我們找到的遞增子序列的最小尾部元素。
   - **步驟 3：遍歷輸入陣列 `nums`。**
     - 對於 `nums` 中的每個數字 `num`：
       - **步驟 3.1：在 `tails` 陣列中進行二分搜尋。**
         - 我們需要在 `tails` 陣列中找到第一個大於或等於 `num` 的元素的索引。我們使用二分搜尋來高效地完成這個操作。
         - 初始化左指針 `left` 為 0，右指針 `right` 為 `tails.length`。
         - 在 `while (left < right)` 迴圈中：
           - 計算中間索引 `mid = Math.floor((left + right) / 2)`。
           - 如果 `tails[mid] < num`，表示 `num` 可以放在 `tails[mid]` 的後面以形成一個更長的遞增子序列（或者可以替換 `tails[left]` 如果 `num` 更小但長度相同）。因此，我們將左指針移動到 `mid + 1`。
           - 否則（如果 `tails[mid] >= num`），表示 `num` 可以作為長度為 `mid + 1` 的遞增子序列的一個更小的尾部元素。因此，我們將右指針移動到 `mid`。
       - **步驟 3.2：更新 `tails` 陣列。**
         - 在二分搜尋結束後，`left` 指針將指向 `tails` 中第一個大於或等於 `num` 的元素的索引。
         - 如果 `left === tails.length`，表示 `num` 大於 `tails` 中的所有元素，我們可以將 `num` 添加到 `tails` 的末尾，這意味著我們找到了一個更長的遞增子序列。
         - 否則（如果 `left < tails.length`），我們將 `tails` 中索引為 `left` 的元素替換為 `num`。這樣做的目的是保持相同長度的遞增子序列的尾部元素盡可能小。例如，如果 `tails` 中有一個遞增子序列的尾部是 5，而我們遇到了 3，我們可以將 5 替換為 3，因為長度仍然相同，但更小的尾部可能允許我們在之後擴展出更長的遞增子序列。
   - **步驟 4：返回 `tails` 的長度。**
     - 在遍歷完 `nums` 中的所有元素後，`tails` 陣列的長度就是最長遞增子序列的長度。

重點筆記：
1. **`tails` 陣列的意義：** `tails[i]` 是所有長度為 `i+1` 的遞增子序列中最小的尾部元素。
2. **二分搜尋的應用：** 使用二分搜尋在 `tails` 陣列中找到合適的替換位置，以保持 `tails` 的有序性並優化時間複雜度。
3. **保持尾部最小：** 替換 `tails` 中的元素為更小的數值（如果可能），有助於在後續步驟中更容易找到更長的遞增子序列。
4. **時間複雜度：** 對於 `nums` 中的每個元素，我們執行一次二分搜尋，二分搜尋的時間複雜度是 O(log n)，遍歷 `nums` 需要 O(n)，因此總的時間複雜度是 O(n log n)。
5. **空間複雜度：** `tails` 陣列在最壞情況下可能會儲存 `nums` 中的所有元素（例如，當 `nums` 本身就是一個遞增序列時），因此空間複雜度是 O(n)。

函數功能說明：
- `lengthOfLIS(nums)`: 接收一個整數陣列 `nums`，返回其最長遞增子序列的長度。
- `if (!nums || nums.length === 0)`: 處理輸入為空陣列的情況。
- `const tails = []`: 初始化 `tails` 陣列。
- `for (const num of nums)`: 遍歷輸入陣列 `nums`。
- `let left = 0`, `let right = tails.length`: 初始化二分搜尋的左右指針。
- `while (left < right)`: 二分搜尋迴圈。
- `const mid = Math.floor((left + right) / 2)`: 計算中間索引。
- `if (tails[mid] < num)`: 如果中間元素小於當前數字，則在右半部分搜尋。
- `else`: 否則，在左半部分搜尋或當前位置。
- `if (left === tails.length)`: 如果當前數字大於 `tails` 中的所有元素，則添加到末尾。
- `else`: 否則，替換 `tails` 中找到的位置的元素。
- `return tails.length`: 返回 `tails` 陣列的長度，即最長遞增子序列的長度。
*/