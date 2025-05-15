class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    reverse = function(x) {
        // 定義 32 位元有符號整數的最大值和最小值常量。
        // 這是題目要求的整數範圍邊界。
        const INT_MAX = 2147483647; // 2^31 - 1
        const INT_MIN = -2147483648; // -2^31

        let reversedInt = 0; // 初始化一個變數來儲存反轉後的數字。初始值為 0。

        // 使用 while 迴圈，只要輸入數字 x 不為 0，就繼續處理。
        // 迴圈會重複執行，每次處理 x 的一位數字。
        while (x !== 0) {
            // 提取 x 的最後一位數字。
            // 使用取餘運算符 (%) 獲取個位數。
            // Math.trunc() 用於截斷小數部分，對於正數和負數都適用，確保得到整數位數。
            const digit = Math.trunc(x % 10);

            // --- 溢位檢查 ---
            // 在將當前提取的 digit 加到 reversedInt 之前，檢查是否會發生溢位。
            // 這是避免溢位發生的關鍵步驟。

            // 檢查正向溢位：
            // 如果 reversedInt 已經大於 INT_MAX / 10，那麼再乘以 10 就肯定會溢位。
            // 如果 reversedInt 等於 INT_MAX / 10，那麼只有當當前位數 digit 大於 7 時才會溢位 (INT_MAX 的最後一位是 7)。
            if (reversedInt > Math.trunc(INT_MAX / 10) || (reversedInt === Math.trunc(INT_MAX / 10) && digit > 7)) {
                return 0; // 檢測到正向溢位，根據題目要求返回 0。
            }

            // 檢查負向溢位（下溢）：
            // 如果 reversedInt 已經小於 INT_MIN / 10，那麼再乘以 10 就肯定會下溢。
            // 如果 reversedInt 等於 INT_MIN / 10，那麼只有當當前位數 digit 小於 -8 時才會下溢 (INT_MIN 的最後一位是 -8)。
            if (reversedInt < Math.trunc(INT_MIN / 10) || (reversedInt === Math.trunc(INT_MIN / 10) && digit < -8)) {
                return 0; // 檢測到負向溢位（下溢），返回 0。
            }
            // --- 溢位檢查結束 ---

            // 構建反轉後的數字。
            // 將目前的 reversedInt 乘以 10（為下一位騰出位置），然後加上剛剛提取的 digit。
            reversedInt = reversedInt * 10 + digit;

            // 更新 x，移除已經處理過的最後一位數字。
            // 使用 Math.trunc() 結合除法，確保正確地移除個位數並截斷小數部分。
            x = Math.trunc(x / 10);
        }

        // 當 while 迴圈結束時 (x 變為 0)，表示所有位數都已處理完畢。
        // reversedInt 中儲存的就是反轉後的數字（且已經過溢位檢查）。
        return reversedInt; // 返回最終反轉後的數字。
    };
}

// 測試範例
// 這些測試範例用於驗證函數的功能。
const solution = new Solution(); // 創建 Solution 類別的實例。

const x1 = 123;
console.log(`Input: ${x1}, Output: ${solution.reverse(x1)}`); // 預期輸出：321

const x2 = -123;
console.log(`Input: ${x2}, Output: ${solution.reverse(x2)}`); // 預期輸出：-321

const x3 = 120;
console.log(`Input: ${x3}, Output: ${solution.reverse(x3)}`); // 預期輸出：21

const x4 = 0;
console.log(`Input: ${x4}, Output: ${solution.reverse(x4)}`); // 預期輸出：0

const x5 = 1534236469; // 反轉後會超出 32 位元範圍
console.log(`Input: ${x5}, Output: ${solution.reverse(x5)}`); // 預期輸出：0

const x6 = -2147483648; // 32 位元有符號整數最小值
console.log(`Input: ${x6}, Output: ${solution.reverse(x6)}`); // 預期輸出：0 (反轉後超出範圍)

const x7 = 2147483647; // 32 位元有符號整數最大值
console.log(`Input: ${x7}, Output: ${solution.reverse(x7)}`); // 預期輸出：0 (反轉後超出範圍)


/*
LeetCode 7: 反轉整數 (Reverse Integer) (Node.js 實現)

題目翻譯：
給你一個 32 位元有符號整數 x，返回 x 的位數反轉後的結果。
如果反轉 x 的結果超出 32 位元有符號整數的範圍 [-2^31, 2^31 - 1]，就返回 0。

假設環境不允許儲存 64 位元整數（有符號或無符號）。

題目需求：
1. 接收一個 32 位元有符號整數 `x` 作為輸入。
2. 反轉 `x` 的所有位數。
3. 如果反轉後的數字超出 32 位元有符號整數的範圍，返回 0。
4. 需要考慮負數的情況。

解題思路與拆解：
本解法採用逐位提取數字並構建反轉後的數字的方法。在構建過程中，我們會在將新位數加入到結果之前，進行溢位檢查，以確保最終結果在 32 位元有符號整數的範圍內。

1. 問題分析：
   - 需要逐位地處理整數的位數。
   - 需要正確處理正數和負數的反轉過程。
   - 最為關鍵和重要的一點是，必須在反轉過程中，**在可能發生溢位之前**進行檢查，而不是在整個反轉完成後才檢查最終結果，因為中間結果可能已經溢位了。

2. 解題方法選擇：
   - 逐位數學運算並在每一步檢查溢位 (本解法採用) - 這是解決此問題的標準且穩健的方法，能夠直接處理整數的數學特性和邊界情況。

3. 解題步驟 (逐位數學運算與溢位檢查)：
   - **步驟 1：定義範圍常量。**
     - 定義 `INT_MAX` 和 `INT_MIN` 兩個常量，分別代表 32 位元有符號整數的最大值 ($2^{31} - 1$) 和最小值 ($-2^{31}$)。
   - **步驟 2：初始化結果變數。**
     - 創建一個變數 `reversedInt` 並初始化為 0。這個變數將用於儲存反轉過程中逐步構建的反轉後數字。
   - **步驟 3：循環處理位數。**
     - 使用 `while` 迴圈，條件是 `x !== 0`。只要 `x` 不為 0，表示還有位數需要處理。
   - **步驟 4：提取最後一位數字。**
     - 在迴圈內部，使用 `Math.trunc(x % 10)` 來提取 `x` 的最後一位數字 `digit`。`x % 10` 得到最後一位（可能帶有符號），`Math.trunc` 用於確保截斷小數部分，得到純粹的整數位。
   - **步驟 5：檢查溢位（關鍵步驟）。**
     - 在將 `digit` 加到 `reversedInt * 10` 這一操作**發生之前**，執行溢位檢查。
     - 檢查 `reversedInt` 是否大於 `Math.trunc(INT_MAX / 10)`。如果為真，則下一步乘以 10 必定會溢位。
     - 如果 `reversedInt` 等於 `Math.trunc(INT_MAX / 10)`，則檢查 `digit` 是否大於 7 (INT_MAX 的個位)。如果為真，則下一步乘以 10 再加 `digit` 會溢位。
     - 檢查 `reversedInt` 是否小於 `Math.trunc(INT_MIN / 10)`。如果為真，則下一步乘以 10 必定會下溢。
     - 如果 `reversedInt` 等於 `Math.trunc(INT_MIN / 10)`，則檢查 `digit` 是否小於 -8 (INT_MIN 的個位)。如果為真，則下一步乘以 10 再加 `digit` 會下溢。
     - 如果任何溢位或下溢條件成立，立即根據題目要求返回 0。
   - **步驟 6：構建反轉後的數字。**
     - 如果沒有檢測到溢位，更新 `reversedInt`：`reversedInt = reversedInt * 10 + digit`。
   - **步驟 7：移除已處理的位數。**
     - 更新 `x`：`x = Math.trunc(x / 10)`，通過整數除法移除 `x` 的最後一位。
   - **步驟 8：返回最終結果。**
     - 當 `while` 迴圈終止時，`reversedInt` 儲存的就是反轉後的數字，且已經過溢位檢查。返回 `reversedInt`。

重點筆記：
1.  **核心操作：** 利用模運算符 (%) 和整數除法來逐個處理數字的位數。
2.  **溢位檢查的必要性：** 由於結果必須 fit in 一個 32 位元整數，且輸入範圍是 32 位元，反轉後數字的量值可能超出這個範圍。必須在構建反轉數字的過程中進行檢查。
3.  **檢查時機：** 溢位檢查需要在 `reversedInt * 10 + digit` 這一操作**發生之前**進行，通過比較 `reversedInt` 與 `INT_MAX / 10` 或 `INT_MIN / 10` 來判斷潛在的溢位。
4.  **`Math.trunc()`：** 在 JavaScript 中處理負數的除法和取餘時，`Math.trunc()` 可以幫助確保得到正確的整數部分，避免浮點數問題。
5.  **處理 0：** 當 `x` 最終變為 0 時，迴圈終止。輸入為 0 時，迴圈不執行，直接返回初始的 `reversedInt` (0)，這是正確的。

時間複雜度：O(log |x|)，其中 |x| 是輸入數字 `x` 的絕對值。程式的執行時間與數字的位數成正比，而位數大約是 log10(|x|)。
空間複雜度：O(1)，我們只使用了常數個變數來儲存結果和臨時值。

函數功能說明：
- `reverse(x)` (作為 Solution 類別的一個方法): 接收一個 32 位元有符號整數 `x`，返回其位數反轉後的整數。
- `INT_MAX`, `INT_MIN`: 定義 32 位元整數範圍常量。
- `let reversedInt = 0`: 儲存反轉結果。
- `while (x !== 0)`: 循環處理每位數字。
- `const digit = Math.trunc(x % 10)`: 提取最後一位。
- `if (...) return 0`: 溢位檢查邏輯。
- `reversedInt = reversedInt * 10 + digit`: 構建反轉數字。
- `x = Math.trunc(x / 10)`: 移除已處理位數。
- `return reversedInt`: 返回最終結果。
*/