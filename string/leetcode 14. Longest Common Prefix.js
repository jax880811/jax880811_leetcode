class Solution {

    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    longestCommonPrefix = function (strs) {
        // 如果輸入的字串陣列為空，則沒有共同前綴，返回空字串。
        if (!strs || strs.length === 0) {
            return "";
        }

        // 如果陣列中只有一個字串，那麼它本身就是最長共同前綴。
        if (strs.length === 1) {
            return strs[0];
        }

        // 我們將第一個字串作為比較的基準。
        const firstStr = strs[0];
        const numStrs = strs.length;

        // 迭代第一個字串的每個字元。
        for (let i = 0; i < firstStr.length; i++) {
            const char = firstStr[i]; // 取得第一個字串在當前索引 i 的字元。

            // 迭代陣列中的其他字串（從第二個字串開始）。
            for (let j = 1; j < numStrs; j++) {
                const currentStr = strs[j];

                // 檢查當前字串是否比第一個字串短，或者當前字串在索引 i 的字元是否與第一個字串在索引 i 的字元不同。
                if (i === currentStr.length || currentStr[i] !== char) {
                    // 如果條件成立，表示我們已經找到了共同前綴的末尾。
                    // 返回第一個字串從開頭到當前索引 i 的子字串。
                    return firstStr.substring(0, i);
                }
            }
        }

        // 如果迴圈完整執行完畢，表示第一個字串的所有字元都是所有其他字串的前綴。
        // 因此，第一個字串本身就是最長共同前綴。
        return firstStr;

    }
}
//有自己做出來

// 測試範例
let strs = ["flower", "flow", "flight"];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.longestCommonPrefix(strs));  

/*
LeetCode 14: 最長共同前綴 (Longest Common Prefix) (Node.js 實現)

題目翻譯：
編寫一個函數來查找字串陣列中最長的共同前綴字串。
如果沒有共同前綴，則返回一個空字串 ""。

題目需求：
1. 接收一個字串陣列作為輸入。
2. 找出陣列中所有字串共有的最長前綴。
3. 如果沒有共同前綴，返回空字串。

解題思路與拆解：
1. 問題分析：
   - 我們需要比較陣列中的所有字串，找出它們從頭開始相同的字元序列。
   - 如果陣列為空，或者沒有任何共同的起始字元，則結果應該是空字串。

2. 解題方法選擇：
   - 方法一：水平掃描 (本解法採用) - 逐個字串比較，不斷縮小共同前綴的範圍。
   - 方法二：垂直掃描 - 逐個字元比較所有字串在相同位置的字元。
   - 方法三：分治法 - 將字串陣列分成兩半，遞迴地找到兩部分的共同前綴，然後再找到這兩個前綴的共同前綴。
   - 方法四：排序法 - 將字串陣列排序後，只需要比較第一個和最後一個字串的共同前綴。

3. 解題步驟 (水平掃描 - 本解法實際採用的是垂直掃描的思想)：
   - **步驟 1：處理邊緣情況。**
     - 如果輸入的字串陣列 `strs` 為空 (`!strs || strs.length === 0`)，則直接返回空字串 `""`，因為沒有字串可以比較。
     - 如果陣列中只有一個字串 (`strs.length === 1`)，那麼這個字串本身就是最長的共同前綴，直接返回 `strs[0]`。
   - **步驟 2：選擇基準字串。**
     - 我們選擇陣列中的第一個字串 `strs[0]` 作為比較的基準。我們將逐個字元地與其他字串進行比較。
   - **步驟 3：迭代基準字串的字元。**
     - 使用一個 `for` 迴圈，從索引 `i = 0` 開始，遍歷基準字串 `firstStr` 的每個字元。
   - **步驟 4：比較當前字元與其他字串的相同位置的字元。**
     - 在外層迴圈的每一次迭代中，我們取得基準字串在當前索引 `i` 的字元 `char = firstStr[i]`。
     - 然後，我們使用另一個 `for` 迴圈，從陣列的第二個字串開始 (`j = 1`)，遍歷剩餘的字串。
   - **步驟 5：檢查是否找到共同前綴的末尾。**
     - 對於每個剩餘的字串 `currentStr = strs[j]`，我們進行兩個檢查：
       - `i === currentStr.length`: 檢查當前索引 `i` 是否已經等於當前字串的長度。如果是，表示當前字串比基準字串短，且基準字串到目前為止的部分是共同前綴。因此，共同前綴的長度到索引 `i` 為止。
       - `currentStr[i] !== char`: 檢查當前字串在索引 `i` 的字元是否與基準字串在索引 `i` 的字元 `char` 不同。如果是，表示在當前索引處，字元不相同，共同前綴到索引 `i` 為止。
     - 如果上述任一條件成立，我們使用 `firstStr.substring(0, i)` 返回基準字串從開頭到索引 `i` 的子字串。這就是我們找到的最長共同前綴。
   - **步驟 6：如果所有字串都匹配到基準字串的末尾。**
     - 如果外層迴圈完整執行完畢，沒有在任何時候返回，這表示基準字串的所有字元都是所有其他字串的前綴。在這種情況下，最長的共同前綴就是基準字串本身，我們返回 `firstStr`。

重點筆記：
1. **空陣列處理：** 輸入為空陣列時，應返回空字串。
2. **單字串處理：** 輸入陣列只有一個字串時，該字串就是最長共同前綴。
3. **基準字串選擇：** 選擇第一個字串作為基準進行比較是常見的做法。
4. **垂直比較：** 實際上，我們的比較方式是垂直的，即比較所有字串在相同索引位置的字元。
5. **提前返回：** 一旦發現不匹配的字元或某個字串的長度不足，我們就可以立即返回當前找到的共同前綴。
6. **完整匹配：** 如果基準字串的所有字元都與其他字串在相同位置的字元匹配，則基準字串本身就是最長共同前綴。

時間複雜度：O(S)，其中 S 是所有字串中字元的總數。在最壞情況下，所有字串都相同，我們需要比較所有字串的所有字元。
空間複雜度：O(1)，我們只使用了常數級別的額外空間。

函數功能說明：
- `longestCommonPrefix(strs)`: 接收一個字串陣列 `strs`，返回它們之間的最長共同前綴字串。
- `if (!strs || strs.length === 0)`: 檢查輸入陣列是否為空。
- `if (strs.length === 1)`: 檢查輸入陣列是否只有一個字串。
- `const firstStr = strs[0]`: 將陣列中的第一個字串作為基準。
- `const numStrs = strs.length`: 取得字串陣列的長度。
- `for (let i = 0; i < firstStr.length; i++)`: 迭代基準字串的每個字元。
- `const char = firstStr[i]`: 取得基準字串在當前索引的字元。
- `for (let j = 1; j < numStrs; j++)`: 迭代陣列中的其他字串。
- `const currentStr = strs[j]`: 取得當前比較的字串。
- `if (i === currentStr.length || currentStr[i] !== char)`: 檢查是否超出當前字串長度或字元不匹配。
- `return firstStr.substring(0, i)`: 返回共同前綴。
- `return firstStr`: 如果迴圈完成，表示第一個字串是共同前綴。
*/