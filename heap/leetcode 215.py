from typing import List
import heapq
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        new_heap = heapq.nlargest(k,nums)
        return new_heap[k-1]
    


nums = [3,2,3,1,2,4,5,5,6]
k = 4
solution = Solution()
print(solution.findKthLargest(nums,k))

'''
尋找前k大的元素
並取出最後一個元素
'''