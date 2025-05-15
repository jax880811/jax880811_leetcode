class Solution {

    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram = function(s, t) {
        // 如果兩個字串長度不同，不可能是異位詞，直接回傳 false
        if (s.length !== t.length) {
            return false;
        }

        // 建立一個 Map 用來統計 s 中每個字母的出現次數
        const countMap = new Map();

        // 遍歷 s 中的每個字元
        for (let char of s) {
            // 如果該字元已經存在於 Map 中，將其數量 +1，否則設為 1
            countMap.set(char, (countMap.get(char) || 0) + 1);
        }

        // 遍歷 t 中的每個字元，用來抵消 Map 中的對應字元數量
        for (let char of t) {
            // 如果字元不存在於 Map 中，代表多出新的字母 → 非異位詞
            if (!countMap.has(char)) {
                return false;
            }

            // 將字元的計數減 1
            countMap.set(char, countMap.get(char) - 1);

            // 如果某個字元的計數變為 0，從 Map 中移除它
            if (countMap.get(char) === 0) {
                countMap.delete(char);
            }
        }

        // 如果 Map 最終為空，代表所有字母都被完全匹配 → 是異位詞
        return countMap.size === 0;
    }
}

// 測試範例
const solution = new Solution();

console.log(solution.isAnagram("anagram", "nagaram")); // 輸出：true
console.log(solution.isAnagram("rat", "car"));         // 輸出：false


/*
LeetCode 242: 有效的字母異位詞 (Valid Anagram) (Node.js 實現)

題目翻譯：
給定兩個字串 s 與 t，請判斷 t 是否為 s 的字母異位詞（即包含完全相同的字母與出現次數）。

題目需求：
1. 接收兩個字串 s 和 t。
2. 確認這兩個字串是否由相同字母構成，且每個字母出現次數也完全一致。
3. 若是異位詞，回傳 true；否則回傳 false。

解題思路與拆解：
本解法採用哈希表（Map）來記錄字母出現的頻率。

1. 問題分析：
   - 如果兩個字串長度不同，必然不是異位詞。
   - 對第一個字串 s 建立字母統計表。
   - 遍歷第二個字串 t，逐一減少對應字母的計數。
   - 若某個字母不存在或數量對不上，即可判斷不是異位詞。

2. 解題方法選擇：
   - 方法一：哈希表（Map）統計字元頻率 ✅ 本解法
   - 方法二：將兩個字串排序後比較 → 效率較差（O(n log n)）

3. 解題步驟（哈希表）：
   - **步驟 1：比較字串長度。**
   - **步驟 2：建立 Map 記錄 s 中字元頻率。**
   - **步驟 3：遍歷 t，逐一減少字元頻率。**
   - **步驟 4：檢查 Map 是否為空。若是，代表所有字元完全匹配。**

重點筆記：
1. **異位詞特性：** 兩字串中所有字母及出現次數完全一致。
2. **Map 的使用：** 用於快速查詢字母是否存在與其出現次數。
3. **優化：** 可使用陣列代替 Map，若僅限小寫英文字母。
4. **時間複雜度：** O(n)，其中 n 為字串長度。
5. **空間複雜度：** O(1)，因為英文字母最多 26 種（固定大小）。

函數功能說明：
- `isAnagram(s, t)`: 判斷字串 s 與 t 是否為有效的字母異位詞。
- `countMap.set(...)`: 建立字母頻率表。
- `if (!countMap.has(...))`: 異位詞檢查邏輯。
- `countMap.get(...) - 1`: 動態遞減對應字元的計數。
- `countMap.size === 0`: 最終檢查是否完全匹配。
*/