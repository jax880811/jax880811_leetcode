from typing import List
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        
        answer = 0
        for i in range(len(nums)):
            if i > answer:
                return False
            answer = max(answer,i+nums[i])
        return True
    

nums = [1,2,3]
solution = Solution()

print(solution.canJump(nums))

'''
題目的本質上是以第一步開始為基準點
後面每個元素就是你能前進的最多步數
如果能夠走到最後一步就回傳true
不能救回傳false
所以說先起始一個基準步數為answer
往後一直走，如果answer小於計算的Index i代表著無法再繼續向前進，那就回傳false
'''