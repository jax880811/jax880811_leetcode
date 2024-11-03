from typing import List
import heapq

class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        answer = heapq.nlargest(2,nums)
        return (answer[0]-1)*(answer[1]-1)


solution = Solution()
nums = [3,4,5,2]
print(solution.maxProduct(nums))
'''
用heapq的方式找前面兩個最大值
再減一並相乘
'''