from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        
        # dp陣列創建
        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        
        # 填充dp陣列
        for i in range(2, len(nums)):
            
            dp[i] = max(dp[i-1], dp[i-2] + nums[i])
            
        
        return dp[len(nums)-1]

'''
對於第i間房屋，有兩種選擇：
搶劫這間房屋，則最大收益為 dp[i-2] + nums[i]
不搶劫這間房屋，則最大收益為 dp[i-1]
利用dp的概念不斷往後迭帶，用dp[i] = max(dp[i-1],dp[i-2]+nums[i]
不斷尋找最佳的方案
'''


nums = [2,100,9,3,100]

solution = Solution()
print(solution.rob(nums))