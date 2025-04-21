class Solution {
    
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNumber = function(nums) {
        // 如果輸入陣列的長度為 1，那麼該元素就是唯一出現的數字，直接返回。
        if(nums.length === 1){
            return nums[0];
        }
        // 創建一個新的 Set 物件。Set 是一種資料結構，它只儲存唯一的值。
        const set = new Set();
        // 遍歷輸入陣列 nums 中的每個數字。
        for(let num of nums){
            // 檢查當前數字 num 是否已經存在於 Set 中。
            if(!set.has(num)){
                // 如果 num 不在 Set 中，則將其添加到 Set 中。
                set.add(num);
                // 使用 continue 跳過當前迭代的剩餘部分，直接進入下一次迭代。
                continue;
            }
            // 如果 num 已經存在於 Set 中（表示我們之前已經遇到過這個數字）。
            if(set.has(num)){
                // 則將 num 從 Set 中刪除。這樣做的效果是，出現兩次的數字最終會從 Set 中被移除。
                set.delete(num);
                // 使用 continue 跳過當前迭代的剩餘部分，直接進入下一次迭代。
                continue;
            }
        }
        // 在遍歷完所有數字後，Set 中剩下的唯一元素就是只出現一次的數字。
        // 將 Set 轉換為一個陣列。由於 Set 只包含一個元素，所以這個陣列的長度將為 1。
        const answer = Array.from(set);
        // 返回陣列中的第一個（也是唯一的）元素，這就是只出現一次的數字。
        return answer[0];
    }
}

//自己有做出來

// 測試範例
let nums = [4,1,2,1,2];


// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.singleNumber(nums));  

/*
LeetCode 136: 單一數字 (Single Number) (Node.js 實現)

題目翻譯：
給定一個非空整數陣列 nums，除了某個元素只出現一次以外，其餘每個元素都恰好出現兩次。請找出那個只出現一次的元素。

題目需求：
1. 接收一個非空整數陣列 `nums` 作為輸入。
2. 陣列中除了某一個數字外，其他所有數字都出現了兩次。
3. 找出並返回那個只出現一次的數字。

解題思路與拆解：
本解法使用了一個 Set 資料結構來追蹤數字的出現情況。

1. 問題分析：
   - 陣列中只有一個數字出現一次，其他數字都出現兩次。
   - 我們需要找出這個唯一的數字。

2. 解題方法選擇：
   - 方法一：使用 Set (本解法採用) - 遍歷陣列，如果數字不在 Set 中則加入，如果在 Set 中則刪除。最終 Set 中剩下的就是只出現一次的數字。
   - 方法二：使用 XOR 運算 - 由於 XOR 運算具有 `x ^ x = 0` 和 `x ^ 0 = x` 的特性，將陣列中所有數字進行 XOR 運算，最終結果就是只出現一次的數字。這個方法更有效率，時間複雜度為 O(n)，空間複雜度為 O(1)。

3. 解題步驟 (使用 Set)：
   - **步驟 1：處理邊緣情況。**
     - 如果輸入陣列 `nums` 的長度為 1，則該元素就是唯一出現的數字，直接返回。
   - **步驟 2：創建 Set。**
     - 創建一個空的 `Set` 物件。Set 用於儲存唯一的元素。
   - **步驟 3：遍歷陣列。**
     - 使用 `for...of` 迴圈遍歷輸入陣列 `nums` 中的每個數字 `num`。
   - **步驟 4：檢查數字是否在 Set 中。**
     - 對於每個 `num`，檢查它是否已經存在於 `set` 中 (`!set.has(num)` 或 `set.has(num)`)。
   - **步驟 5：加入或刪除數字。**
     - 如果 `num` 不在 `set` 中 (`!set.has(num)` 為真)，則將 `num` 添加到 `set` 中 (`set.add(num)`)。
     - 如果 `num` 已經在 `set` 中 (`set.has(num)` 為真)，則將 `num` 從 `set` 中刪除 (`set.delete(num)`)。
   - **步驟 6：轉換 Set 為陣列並返回結果。**
     - 在遍歷完所有數字後，`set` 中只會剩下那個只出現一次的數字。
     - 使用 `Array.from(set)` 將 `set` 轉換為一個包含單個元素的陣列。
     - 返回陣列中的第一個元素 (`answer[0]`)，這就是我們要找的單一數字。

重點筆記：
1. **Set 的特性：** Set 只能儲存唯一的值。利用這個特性，我們可以追蹤每個數字的出現次數。
2. **出現兩次的數字會被移除：** 當一個數字第一次出現時，它被添加到 Set 中。當它第二次出現時，它被從 Set 中刪除。
3. **只出現一次的數字會保留：** 只出現一次的數字在遍歷結束後仍然會留在 Set 中。
4. **時間複雜度：** O(n)，因為我們需要遍歷整個陣列一次。Set 的 `has`、`add` 和 `delete` 操作的平均時間複雜度是 O(1)。
5. **空間複雜度：** O(k)，其中 k 是只出現一次的數字的個數。在這個問題中，k 總是 1，所以空間複雜度可以視為 O(1)。然而，在遍歷過程中，Set 的大小可能會達到 n/2（如果所有數字都出現兩次，只有一個出現一次）。因此，更精確地說，空間複雜度是 O(n) 在最壞情況下。

函數功能說明：
- `singleNumber(nums)`: 接收一個整數陣列 `nums`，返回其中只出現一次的數字。
- `if(nums.length === 1)`: 處理陣列長度為 1 的邊緣情況。
- `const set = new Set()`: 創建一個新的 Set 物件。
- `for(let num of nums)`: 遍歷輸入陣列。
- `if(!set.has(num))`: 檢查數字是否不在 Set 中。
- `set.add(num)`: 將數字添加到 Set 中。
- `if(set.has(num))`: 檢查數字是否在 Set 中。
- `set.delete(num)`: 將數字從 Set 中刪除。
- `const answer = Array.from(set)`: 將 Set 轉換為陣列。
- `return answer[0]`: 返回陣列中的第一個元素。
*/