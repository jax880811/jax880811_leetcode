from typing import List
class Solution:
    def answer(self, data1, data2):
        
        result = {}
        for num2 in data2:
            count = 0
            for num1 in data1:
                if num1 == num2:
                    count += 1
            result[num2] = count
        return result

data1 = [1, 1, 1, 6, 3, 5, 4, 8, 7, 6, 3]
data2 = [1, 6, 8, 4]
solution = Solution()

print(solution.answer(data1, data2))
