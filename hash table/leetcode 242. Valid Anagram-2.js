class Solution {
    // 定義一個方法 isAnagram，用於判斷兩個字串是否為字母異位詞
    isAnagram(s, t) {
        // 如果兩個字串的長度不同，直接返回 false
        if (s.length !== t.length) {
            return false;
        }

        // 創建一個長度為 26 的陣列，用於記錄每個字母的出現次數
        const count = new Array(26).fill(0);

        // 遍歷字串 s，記錄每個字母的出現次數
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        }

        // 遍歷字串 t，減少每個字母的出現次數
        for (let i = 0; i < t.length; i++) {
            count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
        }

        // 檢查所有字母的計數是否為 0
        for (let i = 0; i < 26; i++) {
            if (count[i] !== 0) {
                return false;
            }
        }

        return true;
    }
}

// 測試範例
let s = "anagram";
let t = "nagaram";

// 創建 Solution 的實例
let solution = new Solution();

// 調用 isAnagram 方法並輸出結果
console.log(solution.isAnagram(s, t));

/*
重點筆記：
1. **count 陣列**:
   - 用於記錄每個字母的出現次數。
   - 長度為 26，對應英文字母 a-z。

2. **charCodeAt(i) - 'a'.charCodeAt(0)**:
   - 將字母轉換為索引，例如 'a' -> 0，'b' -> 1，依此類推。

3. **時間複雜度**:
   - 遍歷兩個字串的時間複雜度為 O(N)，其中 N 是字串的長度。
   - 檢查計數陣列的時間複雜度為 O(1)（因為陣列長度固定為 26）。
   - 總時間複雜度為 O(N)。

4. **空間複雜度**:
   - 使用了一個長度為 26 的陣列，因此空間複雜度為 O(1)。

5. **適用場景**:
   - 這種方法適合字串長度較大的情況，因為時間複雜度較低。
*/