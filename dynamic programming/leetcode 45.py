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
'''
此題是要找需要最少跳幾次能到最後
那就紀錄目前跳了幾步可以到的最遠距離
如果索引指到當前能抵達得最遠距離，那就代表還需要多跳最少一次，那麼跳躍次數就增加
直到最後
'''