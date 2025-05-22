export {};
class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens: string[]): number {
        // 創建一個堆疊（使用 TypeScript 的數組類型 `number[]`），用於儲存運算元（數字）。
        const stack: number[] = [];

        // 遍歷輸入的 Reverse Polish Notation (RPN) 表達式令牌陣列。
        for (const token of tokens) {
            // 檢查當前令牌 token 是否是四個基本運算符 (+, -, *, /) 之一。
            if (token === '+' || token === '-' || token === '*' || token === '/') {
                // 如果令牌是運算符：
                // 從堆疊中彈出最上面的兩個運算元。
                // 注意：在 RPN 中，運算元順序很重要。先彈出的是第二個運算元，後彈出的是第一個運算元。
                const operand2: number = stack.pop()!; // 後面的數字，使用 `!` 斷言其非空
                const operand1: number = stack.pop()!; // 前面的數字，使用 `!` 斷言其非空

                let result: number; // 用於儲存運算結果的變數。

                // 根據不同的運算符執行對應的運算。
                switch (token) {
                    case '+':
                        result = operand1 + operand2; // 加法
                        break;
                    case '-':
                        result = operand1 - operand2; // 減法 (前一個數字減後一個數字)
                        break;
                    case '*':
                        result = operand1 * operand2; // 乘法
                        break;
                    case '/':
                        // 除法。題目要求向零截斷。
                        // Math.trunc() 函數用於截斷數字的小數部分，無論正負都向零取整。
                        result = Math.trunc(operand1 / operand2);
                        break;
                    default:
                        // 理論上不會執行到這裡，因為輸入保證是有效運算符或數字
                        throw new Error("Invalid operator");
                }

                // 將運算結果壓回堆疊，供後續運算使用。
                stack.push(result);

            } else {
                // 如果令牌不是運算符，它就應該是一個數字（運算元）。
                // 將字串形式的數字轉換為整數。
                const num: number = parseInt(token);
                // 將轉換後的整數壓入堆疊。
                stack.push(num);
            }
        }

        // 遍歷完所有令牌後，堆疊中應該只剩下一個元素，這個元素就是整個表達式的最終結果。
        // 彈出並返回堆疊頂部的最終結果。由於題目保證是有效表達式，堆疊不會為空。
        return stack.pop()!; // 使用 `!` 斷言其非空
    }
}

// 測試範例
// 創建 Solution 類別的實例。
const solution = new Solution();

let tokens:string[] = ["2","1","+","3","*"];
console.log(solution.evalRPN(tokens)); // 9



/*
LeetCode 150: 評估逆波蘭表達式 (Evaluate Reverse Polish Notation) (TypeScript 實現)

題目翻譯：
根據逆波蘭表示法 (Reverse Polish Notation, RPN)，評估一個算術表達式的值。
有效運算符包括 +、-、*、/。每個運算元可以是整數或另一個表達式。

逆波蘭表示法（RPN）是一種不需要括號的數學表達法。在 RPN 中，運算符跟隨其所有運算元之後。例如，2 + 3 用 RPN 表示就是 2 3 +。

給定一個字串陣列 `tokens`，表示一個 RPN 表達式。請評估其值。

題目需求：
1. 接收一個字串陣列 `tokens`，其中包含整數（字串形式）和運算符 (+, -, *, /)。
2. 評估這個 RPN 表達式的值。
3. 運算符包括加法、減法、乘法、除法。
4. 除法應向零截斷（例如，10 / 3 = 3，-1 / 2 = 0）。
5. 保證給定的 RPN 表達式是有效的，並且可以求值。不會有除以零的情況。

解題思路與拆解：
評估逆波蘭表達式最自然且標準的方法是使用堆疊（Stack）。

1. 問題分析：
   - RPN 的特性是運算符總是在其運算元之後。
   - 當遇到數字時，它是一個運算元，需要儲存起來等待後面的運算符。
   - 當遇到運算符時，它需要作用於其前面最近的兩個運算元。
   - 堆疊的後進先出 (LIFO) 特性正好符合 RPN 的需求。

2. 解題方法選擇：
   - 使用堆疊 (Stack) (本解法採用) - 遍歷令牌，遇到數字壓入堆疊，遇到運算符彈出兩個數字進行運算並將結果壓回堆疊。

3. 解題步驟 (使用堆疊)：
   - **步驟 1：創建堆疊。**
     - 創建一個空的堆疊（使用 TypeScript 的 `number[]` 陣列作為堆疊）。這個堆疊將用於儲存運算過程中的數字（運算元）。
   - **步驟 2：遍歷令牌。**
     - 遍歷輸入的字串陣列 `tokens` 中的每一個令牌 `token`。
   - **步驟 3：判斷令牌類型。**
     - 對於每個 `token`，判斷它是一個數字還是一個運算符。
   - **步驟 4：處理數字。**
     - 如果 `token` 是一個數字（即它不是 '+', '-', '*', '/' 之一）：
       - 使用 `parseInt()` 將字串形式的數字轉換為整數。
       - 將轉換後的整數壓入堆疊。
   - **步驟 5：處理運算符。**
     - 如果 `token` 是一個運算符：
       - 從堆疊中**彈出**頂部的兩個數字。注意彈出的順序：先彈出的是運算符的第二個運算元 (right operand)，後彈出的是第一個運算元 (left operand)。由於題目保證輸入是有效的，彈出操作不會導致堆疊為空。
       - 根據運算符的類型，對這兩個數字執行對應的運算（加、減、乘、除）。特別注意除法需要向零截斷 (`Math.trunc()`)。
       - 將運算得到的結果**壓回**堆疊。這個結果將作為後續運算的一個運算元。
   - **步驟 6：獲取最終結果。**
     - 遍歷完所有的令牌後，有效的 RPN 表達式應該會使得堆疊中只剩下一個元素。這個元素就是整個表達式的最終計算結果。
   - **步驟 7：返回結果。**
     - 彈出堆疊中最後剩下的元素，並返回它。

重點筆記：
1.  **堆疊的使用：** 堆疊是處理 RPN 的核心工具，用於儲存等待運算的數字。
2.  **運算符觸發計算：** 只有遇到運算符時，才會從堆疊中取出數字進行計算。
3.  **彈出順序：** 彈出堆疊時，先彈出的是第二個運算元，後彈出的是第一個運算元。這對於非交換運算（減法和除法）至關重要。
4.  **除法截斷：** 對於除法 (`/`)，需要確保結果是向零截斷的整數，使用 `Math.trunc()`。
5.  **類型安全 (TypeScript)：**
    - `stack: number[]` 明確定義堆疊中只儲存數字。
    - `stack.pop()!` 使用非空斷言符 `!`，因為根據題目保證，在需要彈出運算元時堆疊不會為空。
    - 函數參數和返回值的類型註解 (`tokens: string[]`, `number`) 提高了程式碼的可讀性和健壯性。

時間複雜度：O(n)，其中 n 是輸入令牌陣列 `tokens` 的長度。我們需要遍歷每個令牌一次。堆疊的 `push` 和 `pop` 操作的平均時間複雜度為 O(1)。
空間複雜度：O(n)，在最壞情況下（例如，很多數字後面跟一個運算符），堆疊的大小可能接近令牌陣列的長度。

函數功能說明：
- `evalRPN(tokens: string[]): number` (作為 Solution 類別的一個方法): 接收一個字串陣列 `tokens` 表示 RPN 表達式，返回其計算結果（整數）。
- `const stack: number[] = []`: 創建用於儲存運算元的堆疊，並明確指定其類型。
- `for (const token of tokens)`: 遍歷所有令牌。
- `if (token === '+' || ...)`: 判斷令牌是否為運算符。
- `const operand2: number = stack.pop()!`, `const operand1: number = stack.pop()!`: 彈出運算元，帶有類型註解和非空斷言。
- `let result: number; switch (token) { ... }`: 根據運算符執行計算，使用 `switch` 語句處理不同操作，並確保 `result` 有類型。
- `stack.push(result)`: 將結果壓回堆疊。
- `else { const num: number = parseInt(token); stack.push(num); }`: 處理數字，轉換為整數並壓入堆疊。
- `return stack.pop()!`: 返回堆疊中最後的結果，帶有非空斷言。
*/