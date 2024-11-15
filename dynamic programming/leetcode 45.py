from typing import List
class Solution:
    def jump(self, nums: List[int]) -> int:
        jump = 0
        farthest = 0
        current_step = 0
        for i in range(len(nums)-1):
            farthest = max(farthest,i+nums[i])
            if i == current_step:
                jump+=1
                current_step = farthest

        return jump




nums = [2,3,1,1,4]
solution = Solution()

print(solution.jump(nums))