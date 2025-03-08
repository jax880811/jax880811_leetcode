
class Solution {
    
    isPalindrome = function(s) {
        
        s = s.toLowerCase();
        const sortedS = s.match(/[a-z0-9]/g);
        if (!sortedS){
            return true;
        }
        let i = 0;
        let j = sortedS.length-1;
        while (j>i){
            if (sortedS[i] !== sortedS[j]){
                return false;
            }
            i++;
            j--;
        }
        return true;

    }
} 




let s = "A man, a plan, a canal: Panama";

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.isPalindrome(s));
module.exports = Solution;

/*
驗證回文串

重點筆記：
1. **正則表達式**:
   - 使用 `/[a-z0-9]/g` 匹配所有小寫字母和數字。
   - `match()` 返回一個陣列，包含所有匹配的字元。如果沒有匹配的字元，返回 `null`。

2. **大小寫敏感**:
   - 使用 `toLowerCase()` 將字串轉換為小寫，避免大小寫敏感的問題。

3. **空陣列的處理**:
   - 如果 `sortedS` 為 `null`，表示字串中沒有字母或數字，直接返回 `true`。

4. **雙指針法**:
   - 使用兩個指針從陣列的兩端向中間移動，比較字元是否相等。
   - 時間複雜度為 O(N/2)，其中 N 是匹配字元的數量。

5. **時間複雜度**:
   - 遍歷字串一次，時間複雜度為 O(N)，其中 N 是字串的長度。

6. **空間複雜度**:
   - 使用了一個陣列來存儲匹配的字元，空間複雜度為 O(N)。

7. **適用場景**:
   - 適合處理包含字母和數字的字串，例如：驗證用戶名、處理文本數據等。

範例解析：
- 輸入：s = "A man, a plan, a canal: Panama"
- 過程：
  - 轉換為小寫：s = "a man, a plan, a canal: panama"
  - 匹配字母和數字：sortedS = ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"]
  - 雙指針檢查：
    - 比較 "a" 和 "a"，相等。
    - 比較 "m" 和 "m"，相等。
    - 依此類推，直到所有字元都匹配。
- 輸出：true
*/