class Solution {


    findLengthOfLCIS = function (nums) {
        // 如果輸入陣列為空，則最長連續遞增子序列的長度為 0。
        if (!nums || nums.length === 0) {
            return 0;
        }

        let maxLength = 0; // 初始化最長連續遞增子序列的長度。
        let currentLength = 0; // 初始化當前連續遞增子序列的長度。

        // 遍歷輸入陣列 nums 中的每個數字。
        for (let i = 0; i < nums.length; i++) {
            // 如果是第一個元素，或者當前元素大於前一個元素，則表示當前元素可以延續之前的遞增子序列。
            if (i === 0 || nums[i] > nums[i - 1]) {
                currentLength++; // 增加當前連續遞增子序列的長度。
            } else {
                // 如果當前元素不比前一個元素大，則表示之前的連續遞增子序列已經結束。
                // 我們需要將當前連續遞增子序列的長度重置為 1，因為當前元素本身可以作為一個長度為 1 的新的連續遞增子序列的開始。
                currentLength = 1;
            }

            // 在每次迭代中，我們都需要更新 maxLength，以確保它始終儲存著到目前為止找到的最長連續遞增子序列的長度。
            maxLength = Math.max(maxLength, currentLength);
        }

        // 遍歷完成後，maxLength 中儲存的就是最長連續遞增子序列的長度。
        return maxLength;
    }
}



/*
class Solution {


    findLengthOfLCIS = function (nums) {
        if (!nums) {
            return 0;
        }
        let answer = 0;
        let count = 0;
        for (let i=0;i<nums.length;i++) {
            if(i===0 || nums[i]>nums[i-1]){
                count += 1;
            }
            else{
                count = 1;
            }
            answer = Math.max(answer, count);
        }
        return answer;
    }
}
*/





// 測試範例
let nums = [1, 3, 5, 4, 7];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.findLengthOfLCIS(nums));  

/*
LeetCode 674: 最長連續遞增子序列 (Longest Continuous Increasing Subsequence) (Node.js 實現)

題目翻譯：
給定一個未排序的整數陣列 `nums`，找出最長連續遞增子序列的長度。
連續遞增子序列是指子序列中的相鄰元素嚴格遞增，並且這個子序列在原始陣列中是連續的。

題目需求：
1. 接收一個整數陣列 `nums` 作為輸入。
2. 找出 `nums` 中最長連續遞增子序列的長度。
3. 連續遞增子序列的定義是：子序列中的相鄰元素必須嚴格遞增（後一個元素大於前一個元素），並且這些元素在原始陣列中是連續排列的。

解題思路與拆解：
1. 問題分析：
   - 我們需要找到陣列中連續的一段，這段中的數字是嚴格遞增的。
   - 我們要找出所有這樣的連續遞增子序列中長度最長的那一個，並返回其長度。

2. 解題方法選擇：
   - 迭代遍歷：我們可以遍歷整個陣列，同時追蹤當前的連續遞增子序列的長度。當遇到不滿足遞增條件的元素時，我們就重置當前長度，並在遍歷過程中記錄遇到的最大長度。

3. 解題步驟：
   - **步驟 1：處理邊緣情況。**
     - 如果輸入陣列 `nums` 為空，則最長連續遞增子序列的長度為 0，直接返回 0。
   - **步驟 2：初始化變數。**
     - `maxLength`: 用於儲存到目前為止找到的最長連續遞增子序列的長度，初始化為 0。
     - `currentLength`: 用於儲存當前正在檢查的連續遞增子序列的長度，初始化為 0。
   - **步驟 3：遍歷陣列。**
     - 使用一個 `for` 迴圈遍歷輸入陣列 `nums` 中的每個元素，索引 `i` 從 0 到 `nums.length - 1`。
   - **步驟 4：判斷是否延續遞增子序列。**
     - 在迴圈的每次迭代中，檢查當前元素是否可以延續之前的連續遞增子序列：
       - 如果是第一個元素 (`i === 0`)，或者當前元素 `nums[i]` 嚴格大於前一個元素 `nums[i - 1]`，則表示當前元素可以加入到當前的連續遞增子序列中，將 `currentLength` 增加 1。
       - 否則（如果當前元素不比前一個元素大，或者等於前一個元素），則表示之前的連續遞增子序列已經結束。我們需要將 `currentLength` 重置為 1，因為當前元素本身可以作為一個新的長度為 1 的連續遞增子序列的開始。
   - **步驟 5：更新最大長度。**
     - 在每次更新 `currentLength` 後，我們需要將其與 `maxLength` 進行比較，並將 `maxLength` 更新為兩者中的較大值。這樣可以確保 `maxLength` 始終儲存著到目前為止找到的最長連續遞增子序列的長度。
   - **步驟 6：返回結果。**
     - 在遍歷完整個陣列後，`maxLength` 中儲存的就是最長連續遞增子序列的長度，將其返回。

重點筆記：
1. **連續性：** 子序列中的元素在原始陣列中必須是連續的。
2. **嚴格遞增：** 相鄰的元素必須滿足 `nums[i] > nums[i - 1]` 的條件。
3. **初始化：** `maxLength` 和 `currentLength` 都需要初始化為 0。
4. **邊界條件：** 需要特別處理陣列的第一個元素。
5. **重置當前長度：** 當遇到不滿足遞增條件的元素時，需要將 `currentLength` 重置為 1。
6. **更新最大長度：** 在每次迭代中都要更新 `maxLength`。

時間複雜度：O(n)，其中 n 是輸入陣列 `nums` 的長度。我們只需要遍歷陣列一次。
空間複雜度：O(1)，我們只使用了常數級別的額外空間來儲存 `maxLength` 和 `currentLength`。

函數功能說明：
- `findLengthOfLCIS(nums)`: 接收一個整數陣列 `nums`，返回其最長連續遞增子序列的長度。
- `if (!nums || nums.length === 0)`: 處理輸入為空陣列的情況。
- `let maxLength = 0`: 初始化最長長度。
- `let currentLength = 0`: 初始化當前長度。
- `for (let i = 0; i < nums.length; i++)`: 遍歷輸入陣列。
- `if (i === 0 || nums[i] > nums[i - 1])`: 檢查是否延續遞增子序列。
- `currentLength++`: 增加當前長度。
- `else`: 如果不延續，重置當前長度為 1。
- `maxLength = Math.max(maxLength, currentLength)`: 更新最大長度。
- `return maxLength`: 返回最長連續遞增子序列的長度。
*/