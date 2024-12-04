from typing import List
from collections import Counter

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        counts = Counter(nums)
        for num,count in counts.items():
            if count > len(nums)//2:
                return num
        
'''
此題是要找出該序列當中哪個元素過半
那就把每個元素出現次數都做一次整理
接著再找出出現的次數超過序列一辦長度的即可
'''

nums = [3,2,3]
solution = Solution()
print(solution.majorityElement(nums))