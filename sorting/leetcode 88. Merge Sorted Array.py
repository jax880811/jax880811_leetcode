from typing import List

class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p1 = m-1
        p2 = n-1
        pointer = m+n-1
        while p2>=0:
            if p1>=0 and nums1[p1]>nums2[p2]:
                nums1[pointer] = nums1[p1]
                p1 -= 1
            else:
                nums1[pointer] = nums2[p2]
                p2 -= 1
            pointer -= 1

        return nums1
    

nums1 = [1,2,3,0,0,0]
m = 3
nums2 = [2,5,6]
n = 3
solution = Solution()
print(solution.merge(nums1,m,nums2,n))