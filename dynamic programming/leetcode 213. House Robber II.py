from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        if len(nums) == 2:
            return max(nums[0],nums[1])
        max_1 =self.rob_solution(nums,0,len(nums)-2) #不偷最後一間屋子
        max_2 = self.rob_solution(nums,1,len(nums)-1) #不偷第一間屋子
            
        
        return max(max_1,max_2)
    def rob_solution(self,nums: List[int],start,end):
        dp = [0] * (end - start + 1)
        # 初始化dp[0]和dp[1]
        dp[0] = nums[start]
        dp[1] = max(nums[start], nums[start + 1])
        
        # 填充dp陣列
        for i in range(2, end - start + 1):
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[start + i])
        
        # 返回dp陣列的最後一個元素
        return dp[-1]
    
        

'''
這題跟198的差別在
這是環形的結構
那麼就把問題切割成兩個小塊
一塊是今天就不偷最後一家
另一塊是今天就不偷第一家
取兩個子問題的最大值
子問題的最大值那就是慢慢對照，如果偷了這屋子 以及不偷這屋子 哪個是最好選擇
並以此建立dp表
'''


nums = [2,3,2]

solution = Solution()
print(solution.rob(nums))