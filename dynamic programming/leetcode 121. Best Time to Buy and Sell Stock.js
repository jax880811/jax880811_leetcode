class Solution {
    
    maxProfit = function(prices) {
        let answer = 0;
        let temp = 100000;
        for (let i=0;i<prices.length;i++){
            if (prices[i] < temp){
                temp = prices[i];
            }
            answer = Math.max(prices[i]-temp , answer);
            
        }
        return answer;
    }
}

// 測試範例
let prices = [7,1,5,3,6,4];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.maxProfit(prices));
/*
LeetCode 121: 買賣股票的最佳時機 (Node.js 實現)

題目翻譯：
給定一個數組 `prices`，其中 `prices[i]` 是某支給定股票第 `i` 天的價格。你只能選擇 **某一天** 買入這支股票，並在 **未來某一天** 賣出股票。設計一個算法來找出你可以獲得的最大利潤。如果你不能獲得任何利潤，則返回 `0`。

題目需求：
1.  在股價數組 `prices` 中，找出買入和賣出的最佳時機，以最大化利潤。
2.  只能在某一天買入，且必須在買入日之後的某一天賣出。
3.  如果無法獲利，則返回 `0`。
4.  需要考慮時間和空間複雜度。

解題思路與拆解：
1. 問題分析：
    - 核心問題是在股價數組中找到一對買入和賣出價格，使得賣出價格減去買入價格的差值最大。
    - 買入價格必須在賣出價格之前（或同一天，但同一天買賣無法獲利）。
    - 需要遍歷股價數組，並記錄過程中遇到的最低買入價格，以及計算當前價格賣出時的利潤。

2. 解題方法選擇：
    - 方法一：一次遍歷（本解法採用）- 時間 O(n)，空間 O(1)
    - 方法二：暴力枚舉所有可能的買入賣出組合 - 時間 O(n^2)，效率較差

3. 解題步驟：
    - 初始化變數 `answer` 為 `0`，用於記錄最大利潤。
    - 初始化變數 `temp` 為一個較大的數值 (例如 `100000`)，用於記錄遍歷過程中遇到的最低買入價格。
    - 遍歷股價數組 `prices` 中的每個元素 (代表每天的股價)：
        - 如果當前股價 `prices[i]` 小於 `temp` (目前最低買入價)，則更新 `temp` 為當前股價，表示找到更低的買入點。
        - 計算當前價格賣出的利潤，即 `prices[i] - temp`。
        - 將當前利潤與 `answer` (最大利潤) 比較，並將較大的值賦值給 `answer`，更新最大利潤。
    - 遍歷結束後，`answer` 即為最大利潤，返回 `answer`。

重點筆記：
1. **變數 `temp` 的作用**:
    - `temp` 變數用於追蹤遍歷過程中遇到的最低股價，可以視為潛在的「最佳買入價格」。
    - 初始值設定為一個較大的數值，確保數組中的第一個價格可以成為初始的最低買入價格。

2. **`Math.max()` 的使用 (Node.js)**:
    - `Math.max(value1, value2)`：JavaScript 的 `Math.max()` 函數用於返回兩個或多個數值中較大的那個值。
    - 在程式碼中，`Math.max(prices[i]-temp , answer)` 用於比較當前賣出利潤 (`prices[i]-temp`) 和目前已知的最大利潤 (`answer`)，並更新 `answer` 為較大的值。

3. **時間複雜度**:
    - 程式碼只遍歷了股價數組一次，時間複雜度為 O(N)，其中 N 是數組 `prices` 的長度。

4. **空間複雜度**:
    - 程式碼只使用了常數個變數 (`answer`, `temp`, `i`)，空間複雜度為 O(1)。

5. **適用場景**:
    - 適用於單次股票買賣，尋找最大利潤的場景。
    - 這種一次遍歷的解法非常高效，適合處理大型股價數據。

範例解析：
- 輸入：`prices = [7,1,5,3,6,4]`
- 過程：
    - 初始化 `answer = 0`, `temp = 100000`
    - i = 0, `prices[0] = 7`，`7 < 100000`，`temp = 7`，`answer = Math.max(7-7, 0) = 0`
    - i = 1, `prices[1] = 1`，`1 < 7`，`temp = 1`，`answer = Math.max(1-1, 0) = 0`
    - i = 2, `prices[2] = 5`，`5 >= 1`，`answer = Math.max(5-1, 0) = 4`
    - i = 3, `prices[3] = 3`，`3 >= 1`，`answer = Math.max(3-1, 4) = 4`
    - i = 4, `prices[4] = 6`，`6 >= 1`，`answer = Math.max(6-1, 4) = 5`
    - i = 5, `prices[5] = 4`，`4 >= 1`，`answer = Math.max(4-1, 5) = 5`
- 輸出：`5`

函式功能說明：
- `class Solution`：定義一個解決方案類別，用於封裝問題的解決方法。
- `maxProfit = function(prices)`：定義一個方法，用於計算買賣股票的最大利潤。
- `let answer = 0;`：宣告變數 `answer`，用於儲存最大利潤，初始值為 0。
- `let temp = 100000;`：宣告變數 `temp`，用於儲存最低買入價格，初始值設定為一個較大的數值。
- `for (let i=0; i<prices.length; i++) { ... }`：`for` 迴圈，遍歷輸入數組 `prices` 中的每個股價。
- `if (prices[i] < temp) { temp = prices[i]; }`：`if` 條件判斷，如果當前股價小於 `temp`，則更新 `temp` 為當前股價。
- `answer = Math.max(prices[i]-temp , answer);`：計算當前賣出利潤，並更新 `answer` 為較大的值。
- `return answer;`：返回計算得到的最大利潤。
- `console.log(solution.maxProfit(prices));`：調用 `maxProfit` 方法並將結果輸出到控制台。
*/