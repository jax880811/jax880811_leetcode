class Solution {


    detectCapitalUse = function (word) {
        const n = word.length;

        // 情況 1：所有字母都是大寫
        if (word.toUpperCase() === word) {
            return true;
        }

        // 情況 2：所有字母都不是大寫（即都是小寫）
        if (word.toLowerCase() === word) {
            return true;
        }

        // 情況 3：只有第一個字母是大寫
        if (n > 0 && word[0] === word[0].toUpperCase() && word.substring(1).toLowerCase() === word.substring(1)) {
            return true;
        }

        // 如果以上三種情況都不符合，則返回 false
        return false;
    }
}


/*
class Solution {
    
    
    detectCapitalUse = function(word) {
        let n = word.length;
        if(word === word.toUpperCase()){
            return true;
        }
        if(word === word.toLowerCase()){
            return true;
        }
        if(n>0&&word[0] === word[0].toUpperCase() && word.substring(1) === word.substring(1).toLowerCase()){
            return true;
        }
        return false;
    }
}
*/


// 測試範例
let word = "FlaG";

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.detectCapitalUse(word));  

/*
LeetCode 520: 偵測大寫字母 (Detect Capital) (Node.js 實現)

題目翻譯：
給定一個單字，你需要判斷這個單字的大寫字母使用是否正確。我們定義，在以下情況下，單字中大寫字母的使用才是正確的：

1. 單字中所有字母都是大寫字母。
2. 單字中所有字母都不是大寫字母。
3. 單字中只有第一個字母是大寫字母。

否則，我們定義為大寫字母使用不正確。

題目需求：
1. 接收一個字串 `word` 作為輸入。
2. 判斷 `word` 中大寫字母的使用是否符合上述三種規則之一。
3. 如果符合，返回 `true`；否則，返回 `false`。

解題思路與拆解：
我們可以針對題目中給出的三種有效的大寫字母使用情況逐一進行判斷。

1. 問題分析：
   - 我們需要檢查給定的單字是否滿足以下條件之一：全部大寫、全部小寫、只有首字母大寫。

2. 解題方法選擇：
   - 直接判斷：我們可以分別檢查單字是否符合這三種情況。

3. 解題步驟：
   - **步驟 1：檢查是否所有字母都是大寫。**
     - 使用字串的 `toUpperCase()` 方法將整個單字轉換為大寫形式，然後與原始單字進行比較。如果兩者相等，則說明所有字母都是大寫，返回 `true`。
   - **步驟 2：檢查是否所有字母都不是大寫（即都是小寫）。**
     - 使用字串的 `toLowerCase()` 方法將整個單字轉換為小寫形式，然後與原始單字進行比較。如果兩者相等，則說明所有字母都不是大寫，返回 `true`。
   - **步驟 3：檢查是否只有第一個字母是大寫。**
     - 首先判斷單字的長度是否大於 0。
     - 檢查單字的第一個字母 (`word[0]`) 是否等於其大寫形式 (`word[0].toUpperCase()`)，這表示第一個字母是大寫的。
     - 然後，獲取從第二個字母開始到單字結尾的子字串 (`word.substring(1)`)，並檢查其小寫形式 (`word.substring(1).toLowerCase()`) 是否等於該子字串本身，這表示後續所有字母都不是大寫（即都是小寫）。
     - 如果以上兩個條件都成立，則說明只有第一個字母是大寫，返回 `true`。
   - **步驟 4：返回 false。**
     - 如果以上三種情況都不符合，則說明單字的大寫字母使用不正確，返回 `false`。

重點筆記：
1. **`toUpperCase()` 方法：** 將字串轉換為大寫。
2. **`toLowerCase()` 方法：** 將字串轉換為小寫。
3. **`substring(startIndex)` 方法：** 返回從指定索引開始到字串末尾的子字串。
4. **字串比較：** 使用嚴格相等運算符 (`===`) 比較字串。
5. **條件判斷順序：** 檢查的順序不影響結果。

時間複雜度：O(n)，其中 n 是單字的長度。我們在每個判斷中都可能需要遍歷整個單字。
空間複雜度：O(1)，我們只使用了常數級別的額外空間。

函數功能說明：
- `detectCapitalUse(word)`: 接收一個字串 `word`，判斷其大寫字母使用是否正確，並返回布林值。
- `word.toUpperCase() === word`: 檢查是否所有字母都是大寫。
- `word.toLowerCase() === word`: 檢查是否所有字母都不是大寫。
- `word[0] === word[0].toUpperCase() && word.substring(1).toLowerCase() === word.substring(1)`: 檢查是否只有第一個字母是大寫。
- 如果滿足以上任一條件，返回 `true`，否則返回 `false`。
*/