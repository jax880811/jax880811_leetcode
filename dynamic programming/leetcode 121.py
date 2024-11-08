from typing import List
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) == 1:
            return 0
        temp = 100000
        answer = 0
        for i in prices:
            if i<temp:
                temp = i
            if (i-temp)>answer:
                answer = i-temp
        return answer
    



prices = [1]
solution = Solution()
print(solution.maxProfit(prices))

    