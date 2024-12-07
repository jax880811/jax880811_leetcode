from typing import List

class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        if len(s) < 2:
            return ""
        
        # 檢查字串是否為優美字串
        for i, c in enumerate(s):
            if c.lower() not in s or c.upper() not in s:
                # 若發現不符合條件的字母，進行分割
                left = self.longestNiceSubstring(s[:i])
                right = self.longestNiceSubstring(s[i+1:])
                return left if len(left) >= len(right) else right
        
        # 若整個字串均為優美字串，直接返回
        return s


s = "YazaAay"
solution = Solution()
print(solution.longestNiceSubstring(s))