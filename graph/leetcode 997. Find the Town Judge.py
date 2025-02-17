from typing import List

class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        
        
        if n==1 and not trust:
            return 1
        trust_else = [0]*(n+1) #相信別人的矩陣
        trusted = [0]*(n+1) #被相信的矩陣
        for i,j in trust:
            trust_else[i] += 1 #如果有相信別人，就+1
            trusted[j] +=1 #統計被幾個人相信了
        for i in range(1,n+1):
            if trusted[i] == n-1 and trust_else[i] ==0: #回到題目所想要，成為法官的話必須要被除了自己以外所有人相信，而且不能相信任何一人
                return i
        
        return -1
        
'''
題目的法官，必須被自己以外所有人相信，且不能相信任何人
那麼就根據題目的INPUT，創造一個是否有相信別人的矩陣，以及是否被相信的矩陣
條件寫成 被相信的矩陣元素數值必須是所有人-1(扣除自己)，以及相信人的部分必須為0
'''

n = 3
trust = [[1,3],[2,3],[3,1]]
solution = Solution()
print(solution.findJudge(n,trust))