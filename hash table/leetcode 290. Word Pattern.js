class Solution {
    wordPattern = function (pattern, s) {
        // 將輸入字串 s 按空格分割成單字陣列。
        const words = s.split(' ');

        // 如果 pattern 的長度與單字陣列的長度不相等，則無法形成一一對應的關係，直接返回 false。
        if (pattern.length !== words.length) {
            return false;
        }

        // 創建兩個 Map 物件來儲存 pattern 中的字元到 words 中的單字的映射，以及 words 中的單字到 pattern 中的字元的映射。
        const patternToWord = new Map();
        const wordToPattern = new Map();

        // 遍歷 pattern 中的每個字元和 words 中對應的單字。
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            const word = words[i];
            
            // 檢查 pattern 中的字元是否已經存在於 patternToWord 的映射中。
            if (patternToWord.has(char)) {
                // 如果存在，則檢查其映射的單字是否與當前的單字相同。如果不同，則模式不匹配，返回 false。
                if (patternToWord.get(char) !== word) {
                    return false;
                }
            } else {
                // 如果 pattern 中的字元還沒有映射，則將其與當前的單字建立映射。
                patternToWord.set(char, word);
            }

            // 同樣地，檢查 words 中的單字是否已經存在於 wordToPattern 的映射中。
            if (wordToPattern.has(word)) {
                // 如果存在，則檢查其映射的字元是否與當前的 pattern 中的字元相同。如果不同，則模式不匹配，返回 false。
                if (wordToPattern.get(word) !== char) {
                    return false;
                }
            } else {
                // 如果 words 中的單字還沒有映射，則將其與當前的 pattern 中的字元建立映射。
                wordToPattern.set(word, char);
            }
            
        }

        // 如果遍歷完所有字元和單字後都沒有發現不匹配的情況，則說明 pattern 與字串 s 匹配，返回 true。
        return true;
    }
}



// 測試範例
let pattern = "abba"
let s = "dog cat cat fish";


// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.wordPattern(pattern, s));  