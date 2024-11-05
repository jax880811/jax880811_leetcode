import heapq
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        while stones:
            stones=sorted(stones,reverse=False)
            s1 = stones.pop()
            if not stones:
                return s1
            s2 = stones.pop()
            if s1>s2:
                stones.insert(len(stones),s1-s2)
        return 0
    


stones = [2,7,4,1,8,1]
solution = Solution()
print(solution.lastStoneWeight(stones))

