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

