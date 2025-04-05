class Solution {

    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    lengthOfLastWord = function (s) {
        // 使用 trim() 方法移除字串頭尾的空格，以避免空字串被錯誤地計算。
        const trimmedString = s.trim();

        // 使用 split(' ') 方法將字串按空格分割成一個單字陣列。
        // 注意：如果有多個連續空格，split() 會產生空字串元素，我們需要處理這種情況。
        const words = trimmedString.split(' ');

        // 過濾掉分割後陣列中的空字串元素，這些可能是由多個連續空格產生的。
        const nonEmptyWords = words.filter(word => word.length > 0);

        // 如果過濾後的單字陣列為空，表示原始字串中沒有任何單字（可能只有空格），返回 0。
        if (nonEmptyWords.length === 0) {
            return 0;
        }

        // 最後一個單字是陣列的最後一個元素，我們返回它的長度。
        return nonEmptyWords[nonEmptyWords.length - 1].length;
    }
}


// 測試範例
let s = "   fly me   to   the moon  ";

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.lengthOfLastWord(s));

/*
LeetCode 58: 最後一個單字的長度 (Length of Last Word) (Node.js 實現 - 使用字串分割)

題目翻譯：
給定一個字串 s，返回字串中最後一個單字的長度。
單字被定義為僅由非空格字元組成的最大連續子字串。

題目需求：
1. 接收一個字串 `s` 作為輸入。
2. 找到字串 `s` 中最後一個出現的單字。
3. 返回該單字的長度。
4. 單字的定義是不包含空格的連續字元序列。

解題思路與拆解：
1. 問題分析：
   - 我們需要找到字串的最後一個單字。
   - 單字是由非空格字元組成的。
   - 字串可能包含前導空格、尾隨空格以及單字之間的多個空格。

2. 解題方法選擇：
   - 方法一：從字串末尾開始掃描 (已在之前的解答中提供)。
   - 方法二：使用字串分割 (本解法採用) - 將字串按空格分割成單字陣列，然後取最後一個非空元素的長度。

3. 解題步驟 (使用字串分割)：
   - **步驟 1：移除頭尾空格。**
     - 使用字串的 `trim()` 方法創建一個新的字串 `trimmedString`，該字串不包含原始字串 `s` 開頭和結尾的任何空格。這一步很重要，可以避免在分割後產生不必要的空字串元素。
   - **步驟 2：分割字串成單字陣列。**
     - 使用 `trimmedString.split(' ')` 方法將修剪後的字串按空格字元分割成一個單字陣列 `words`。如果原始字串中有多個連續的空格，`split()` 方法會產生空字串元素。
   - **步驟 3：過濾掉空字串。**
     - 使用陣列的 `filter()` 方法遍歷 `words` 陣列，並創建一個新的陣列 `nonEmptyWords`，其中只包含長度大於 0 的字串。這樣可以去除由於多個連續空格而產生的空字串元素。
   - **步驟 4：處理沒有單字的情況。**
     - 如果 `nonEmptyWords` 陣列的長度為 0，表示原始字串中沒有任何實際的單字（可能只是空格），則返回 0。
   - **步驟 5：取得最後一個單字的長度。**
     - 如果 `nonEmptyWords` 陣列不為空，則最後一個單字就是該陣列的最後一個元素。我們使用索引 `nonEmptyWords.length - 1` 訪問它，並返回其長度 (`.length`)。

重點筆記：
1. **`trim()` 方法：** 用於移除字串開頭和結尾的空格，是處理字串分割前的重要步驟。
2. **`split(' ')` 方法：** 用於將字串按空格分割成陣列。需要注意多個連續空格會產生空字串元素。
3. **`filter()` 方法：** 用於根據條件過濾陣列中的元素，這裡我們用它來移除空字串。
4. **處理空單字陣列：** 需要考慮原始字串只包含空格或為空的情況。
5. **取得最後一個元素：** 陣列的最後一個元素的索引是 `length - 1`。

時間複雜度：O(N)，其中 N 是字串 `s` 的長度。`trim()` 和 `split()` 方法在最壞情況下都需要遍歷整個字串。`filter()` 方法也需要遍歷分割後的陣列，其長度不會超過 N。
空間複雜度：O(N)，在最壞情況下（例如，字串中有很多單字），`split()` 方法可能會創建一個大小為 O(N) 的陣列。

函數功能說明：
- `lengthOfLastWord(s)`: 接收一個字串 `s`，返回其最後一個單字的長度。
- `const trimmedString = s.trim()`: 移除字串頭尾的空格。
- `const words = trimmedString.split(' ')`: 將修剪後的字串按空格分割成單字陣列。
- `const nonEmptyWords = words.filter(word => word.length > 0)`: 過濾掉空字串元素。
- `if (nonEmptyWords.length === 0)`: 檢查是否沒有單字。
- `return 0`: 如果沒有單字，返回 0。
- `return nonEmptyWords[nonEmptyWords.length - 1].length`: 返回最後一個單字的長度。
*/

