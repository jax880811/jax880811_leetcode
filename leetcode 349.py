class Solution:
    def intersection(self, nums, nums2):
        set1 = set(nums1)
        set2 = set(nums2)
        result = set1.intersection(set2)
        return list(result)
    
nums1 = [4,9,5]
nums2 = [4,5,9,4,9]
solution = Solution()
print(solution.intersection(nums1,nums2))
"""直接進行set intersection
就能得到答案"""


