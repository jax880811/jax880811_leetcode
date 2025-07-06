
class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams = function (strs) {
        // 創建一個 Map 來儲存字謎分組。
        // Map 的鍵將是經過排序的字串（作為字謎的規範形式），
        // Map 的值將是一個陣列，包含所有原始字元排序後得到這個鍵的字串。
        const anagramGroups = new Map();

        // 遍歷輸入字串陣列中的每一個字串。
        for (const str of strs) {
            // 對當前字串的字元進行排序，以得到其字謎的規範形式。
            // 步驟：將字串分割成字元陣列 -> 對字元陣列進行排序 -> 將排序後的字元陣列重新連接成字串。
            const sortedStr = str.split('').sort().join('');

            // 檢查這個排序後的字串 (sortedStr) 是否已經存在於 anagramGroups 的鍵中。
            if (anagramGroups.has(sortedStr)) {
                // 如果 sortedStr 已經存在，表示我們之前已經遇到過它的字謎。
                // 獲取與 sortedStr 鍵相關聯的陣列，並將當前的原始字串 str 添加到這個陣列中。
                anagramGroups.get(sortedStr).push(str);
            } else {
                // 如果 sortedStr 還不存在，表示我們第一次遇到這個字謎組。
                // 在 anagramGroups 中創建一個新的條目，以 sortedStr 為鍵，
                // 值為一個新陣列，其中包含當前的原始字串 str 作為第一個元素。
                anagramGroups.set(sortedStr, [str]);
            }
        }

        // 遍歷完成後，anagramGroups Map 的值就是所有字謎的分組。
        // 提取 Map 中所有的值（它們是字串陣列）並將其作為結果返回。
        // 使用 Array.from(map.values()) 或 [...map.values()] 可以將 Map 的值轉換為陣列。
        return Array.from(anagramGroups.values());
    };
}



// 測試範例
let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];


// 創建 Solution 的實例
let solution = new Solution();

// 調用 reverseStr 方法並輸出結果
console.log(solution.groupAnagrams(strs));

/*
LeetCode 49: 字母異位詞分組 (Group Anagrams) (Node.js 實現)

題目翻譯：
給你一個字串陣列 `strs`，請你將 字母異位詞 組合在一起。可以按任意順序返回結果。
字母異位詞 是由重新排列相同字母不同順序的單詞或短語組成的詞語。

題目需求：
1. 接收一個字串陣列 `strs` 作為輸入。
2. 將 `strs` 中互為字母異位詞的字串分組。
3. 返回一個包含這些分組的陣列，每個分組本身也是一個字串陣列。
4. 返回結果的順序不重要。

解題思路與拆解：
字母異位詞的核心特徵是它們包含的字元種類和數量是完全相同的。如果我們能為所有互為字母異位詞的字串找到一個「規範形式」 (canonical form)，就可以用這個規範形式作為鍵，將原始字串儲存在一個雜湊表（Hash Map / Map）中進行分組。

1. 問題分析：
   - 如何判斷兩個字串是否互為字母異位詞？它們必須有相同的字元，且每個字元出現的頻率也必須相同。
   - 如何找到字謎的規範形式？對字串的字元進行排序是一個簡單有效的方法。

2. 解題方法選擇：
   - 使用 Hash Map (或 JavaScript 中的 Map)，以排序後的字串作為鍵，將原始字串分組 (本解法採用)。

3. 解題步驟 (使用 Map 以排序字串為鍵進行分組)：
   - **步驟 1：創建 Map。**
     - 創建一個空的 `Map` 物件 `anagramGroups`。這個 Map 將用於儲存字謎組。鍵是字謎的規範形式（排序後的字串），值是包含原始字串的陣列。
   - **步驟 2：遍歷輸入陣列。**
     - 使用 `for...of` 迴圈遍歷輸入字串陣列 `strs` 中的每一個字串 `str`。
   - **步驟 3：生成規範形式（排序字串）。**
     - 對當前的原始字串 `str`，進行以下操作：
       - 使用 `str.split('')` 將字串分割成單個字元的陣列。
       - 使用陣列的 `sort()` 方法對字元陣列進行排序（預設按字母順序）。
       - 使用陣列的 `join('')` 方法將排序後的字元陣列重新連接成一個字串 `sortedStr`。`sortedStr` 就是 `str` 的規範形式。
   - **步驟 4：根據規範形式分組。**
     - 檢查 `anagramGroups` Map 是否已經包含 `sortedStr` 這個鍵 (`anagramGroups.has(sortedStr)`)。
     - 如果 `anagramGroups.has(sortedStr)` 為 `true`：表示之前已經有與 `str` 互為字謎的字串被處理過，它們的分組已經存在。獲取 `sortedStr` 對應的值（一個陣列），並將當前的原始字串 `str` 添加到這個陣列中 (`anagramGroups.get(sortedStr).push(str)`)。
     - 如果 `anagramGroups.has(sortedStr)` 為 `false`：表示這是我們第一次遇到這個字謎組。在 `anagramGroups` 中設置一個新的條目，鍵為 `sortedStr`，值為一個新陣列，這個新陣列的唯一元素就是當前的原始字串 `str` (`anagramGroups.set(sortedStr, [str])`)。
   - **步驟 5：提取並返回結果。**
     - 遍歷完所有原始字串後，`anagramGroups` Map 的所有值（values()）就是所有字謎的分組。
     - 使用 `Array.from(anagramGroups.values())` 或展開運算符 `[...anagramGroups.values()]` 將 Map 的值轉換為一個陣列，並返回這個包含所有分組的陣列。

重點筆記：
1.  **規範形式：** 通過對字串的字元進行排序，可以得到所有互為字謎的字串的唯一表示形式。
2.  **使用 Map：** Map (或 Hash Map) 是實現這種分組邏輯的理想資料結構，它通過鍵來快速查找和儲存對應的值。
3.  **Map 的鍵/值：** 鍵是排序後的字串，值是包含原始字串的陣列。
4.  **處理新組：** 當遇到新的排序字串時，需要創建一個新的陣列作為值。
5.  **處理已有組：** 當遇到已有的排序字串時，將原始字串添加到對應的陣列中。

時間複雜度：O(N * K log K)，其中 N 是輸入字串陣列 `strs` 的長度，K 是陣列中最長字串的長度。我們需要遍歷 N 個字串，對於每個字串，我們進行排序操作，排序一個長度為 K 的字串需要 O(K log K) 的時間。Map 的平均操作是 O(K)，所以排序成為主導的時間複雜度。
空間複雜度：O(N * K)，在最壞情況下，所有字串都是唯一的字謎組（例如，每個字串只有一個字元且都不相同），Map 中會儲存 N 個鍵，每個鍵是長度最多為 K 的排序字串，並且每個值陣列也會儲存原始字串。

函數功能說明：
- `groupAnagrams(strs)` (作為 Solution 類別的一個方法): 接收一個字串陣列 `strs`，將互為字母異位詞的字串分組，返回一個包含分組的陣列。
- `const anagramGroups = new Map()`: 創建用於分組的 Map。
- `for (const str of strs)`: 遍歷輸入字串陣列。
- `const sortedStr = str.split('').sort().join('')`: 生成字謎的規範形式（排序字串）。
- `if (anagramGroups.has(sortedStr))`: 檢查規範形式是否已存在為鍵。
- `anagramGroups.get(sortedStr).push(str)`: 添加原始字串到現有組。
- `else { anagramGroups.set(sortedStr, [str]); }`: 創建新組。
- `return Array.from(anagramGroups.values())`: 返回所有分組的陣列。
*/