from typing import List

class Solution:
    def isPalindrome(self, s: str) -> bool:
        left = 0
        right = len(s)-1

        while left<right:
            while left<right and not s[left].isalnum(): #isalnum() 檢查字符是否是字母或數字
                left += 1
            while left<right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():#全轉小寫，避免因為大小寫的問題而出錯
                return False
            left += 1
            right -= 1
        return True

'''
這題是判斷是否為迴文
我的想法是那就從左邊跟右邊開始看，只看數字跟文字，標點符號不看
並將所有的字統一小寫，避免大小寫不一致導致錯誤
最終收斂 時間複雜度: O(n)，其中 n 是字串長度
'''


s = "A man, a plan, a canal: Panama"
solution = Solution()
print(solution.isPalindrome(s))
