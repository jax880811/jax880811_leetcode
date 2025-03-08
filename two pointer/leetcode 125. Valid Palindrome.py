import re  # 導入正則表達式模組

class Solution:
    def isPalindrome(self, s: str) -> bool:
        # 將字串轉換為小寫
        s = s.lower()
        
        # 使用正則表達式匹配字母和數字
        sorted_s = re.findall('[a-z0-9]', s)
        
        # 如果 sorted_s 為空（沒有字母或數字），返回 True
        if not sorted_s:
            return True
        
        # 使用雙指針檢查是否為回文串
        i = 0
        j = len(sorted_s) - 1
        while j > i:
            if sorted_s[i] != sorted_s[j]:
                return False
            i += 1
            j -= 1
        return True

# 測試範例
s = "A man, a plan, a canal: Panama"
solution = Solution()
print(solution.isPalindrome(s))  # 輸出: True

'''
驗證回文串

重點筆記：
1. **正則表達式**:
   - 使用 `re.findall('[a-z0-9]', s)` 匹配所有小寫字母和數字。
   - `findall()` 返回一個列表，包含所有匹配的字元。如果沒有匹配的字元，返回空列表。

2. **大小寫敏感**:
   - 使用 `lower()` 將字串轉換為小寫，避免大小寫敏感的問題。

3. **空列表的處理**:
   - 如果 `sorted_s` 為空，表示字串中沒有字母或數字，直接返回 `True`。

4. **雙指針法**:
   - 使用兩個指針從列表的兩端向中間移動，比較字元是否相等。
   - 時間複雜度為 O(N/2)，其中 N 是匹配字元的數量。

5. **時間複雜度**:
   - 遍歷字串一次，時間複雜度為 O(N)，其中 N 是字串的長度。

6. **空間複雜度**:
   - 使用了一個列表來存儲匹配的字元，空間複雜度為 O(N)。

7. **適用場景**:
   - 適合處理包含字母和數字的字串，例如：驗證用戶名、處理文本數據等。

範例解析：
- 輸入：s = "A man, a plan, a canal: Panama"
- 過程：
  - 轉換為小寫：s = "a man, a plan, a canal: panama"
  - 匹配字母和數字：sorted_s = ['a', 'm', 'a', 'n', 'a', 'p', 'l', 'a', 'n', 'a', 'c', 'a', 'n', 'a', 'l', 'p', 'a', 'n', 'a', 'm', 'a']
  - 雙指針檢查：
    - 比較 'a' 和 'a'，相等。
    - 比較 'm' 和 'm'，相等。
    - 依此類推，直到所有字元都匹配。
- 輸出：True
'''