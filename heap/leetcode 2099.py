from typing import List
import heapq
class Solution:
    def maxSubsequence(self, nums: List[int], k: int) -> List[int]:
        new_heap = []#先創建一個heap
        for i ,num in enumerate(nums):#製作成一個索引序列
            heapq.heappush(new_heap,(num,i))#做成二元陣列，第一個元素對應到題目list的元素，第二個i是索引值
            if len(new_heap)>k:#如果超過k值，就pop出最小值
                heapq.heappop(new_heap)
        result = sorted(new_heap,key =lambda x:x[1])#整理完之後在排序，以x[1]，也就是索引值來進行排序
        return [x[0] for x in result]#根據索引值，在回傳對應到的list元素值
    
nums = [-1,-2,3,4]

k = 3
solution = Solution()
print(solution.maxSubsequence(nums,k))

'''
先創建一個heap做排序與整理
做成二元陣列，第一個元素代表著原本list的元素數值，第二個代表索引值
先找出前k大的元素數值後，再根據索引值進行排序整理
最後回傳排序後的heap元素數值
'''