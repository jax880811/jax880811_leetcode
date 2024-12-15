from typing import List
import heapq
from collections import Counter

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        list_set = Counter(nums)
        
        heap = [(-freq, num) for num, freq in list_set.items()]
        heapq.heapify(heap)
        
        heap = heapq.nsmallest(k,heap)
        
        answer = []
        for i,j in heap:
            answer.append(j)

        return answer


nums = [1,1,1,2,2,3]
k = 2
solution = Solution()
print(solution.topKFrequent(nums,k))