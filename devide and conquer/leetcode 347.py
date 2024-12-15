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

'''
這題要取出該序列中出現最頻繁的值
那麼先用記數的方式記錄每一筆元素的出現次數
接著再用heap的方式尋找，使用-freq以及nsmallest則是為了運用最小堆的特性，元素會集中在前面幾格，省去往後找的麻煩
取出最常出現的前k筆元素後再取出
'''


nums = [1,1,1,2,2,3]
k = 2
solution = Solution()
print(solution.topKFrequent(nums,k))