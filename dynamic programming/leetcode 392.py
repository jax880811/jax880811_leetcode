from typing import List
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        j = 0
        while i<len(s) and j<len(t):
            if s[i] == t[j]:
                i = i+1
            j = j+1
            
        return i == len(s)


s = "abc"
t = "ahbgdc"
solution = Solution()

print(solution.isSubsequence(s,t))
'''
此題的本質在於尋找子句型
拆解問題如下，先對想要查詢的子字串第一位以及母字串的第一位開始對比
如果一致的話就子字串往下對比
不一致的話就繼續跟母字串的下一位繼續對比
等到母字串都對完了
發現子字串的對比累積長度比目標還要少，就代表此並非該母字串當中的子字串
'''