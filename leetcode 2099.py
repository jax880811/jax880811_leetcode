from typing import List
import heapq
class Solution:
    def maxSubsequence(self, nums: List[int], k: int) -> List[int]:
        new_heap = []
        for i ,num in enumerate(nums):
            heapq.heappush(new_heap,(num,i))
            if len(new_heap)>k:
                heapq.heappop(new_heap)
        result = sorted(new_heap,key =lambda x:x[1])
        return [x[0] for x in result]
    
nums = [-1,-2,3,4]

k = 3
solution = Solution()
print(solution.maxSubsequence(nums,k))

