import heapq
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # 將所有石頭的重量變為負數，這樣最小堆就能模擬最大堆
        stones = [-stone for stone in stones]
        heapq.heapify(stones)  # 將列表轉換為堆

        while len(stones) > 1:
            # 取出最重的兩個石頭
            stone1 = -heapq.heappop(stones)  # 取出最重的石頭，並轉回正數
            stone2 = -heapq.heappop(stones)  # 取出次重的石頭，並轉回正數

            if stone1 != stone2:
                # 如果兩石頭重量不同，把剩下的重量放回堆中
                heapq.heappush(stones, -(stone1 - stone2))

        # 如果堆裡還有石頭，返回其重量，否則返回0
        return -stones[0] if stones else 0
    


stones = [2,7,4,1,8,1]
solution = Solution()
print(solution.lastStoneWeight(stones))