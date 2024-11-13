from typing import List
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        current_sum = nums[0]
        answer = nums[0]
        for num in nums[1:]:
            current_sum = max(num,current_sum+num)
            answer = max(answer,current_sum)
        return answer
    
nums = [-2,1,-3,4,-1,2,1,-5,4]
solution = Solution()

print(solution.maxSubArray(nums))