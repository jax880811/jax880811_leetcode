from collections import *
from typing import *
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        counts = Counter(nums1)
        result = []
        for num in nums2:
            if counts[num] > 0:
                result.append(num)
                counts[num] -= 1
        return result



nums1 = [1,2,2,1]
nums2 = [2,2]

solution = Solution()
print(solution.intersect(nums1, nums2))

'''
先計算第一個陣列每一種元素個存在幾個
接著再跟第二組一個個進行比對
如果有重複的就一個個列舉出來
'''