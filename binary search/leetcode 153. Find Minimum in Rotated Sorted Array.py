from typing import List
class Solution:
    def findMin(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums)==1:
            return nums[0]
        left = 0
        right = len(nums)-1
        
        while left<right:
            mid = left +(right-left)//2
            if nums[mid] > nums[right]:
                left = mid+1
            else:
                right = mid

        return nums[left]

'''
這是一個典型的二分搜索問題。由於陣列是旋轉過的，但仍然部分有序，我們可以利用二分搜索來高效地找到最小值。
二分搜索的條件:
如果 nums[mid]>nums[right]，則最小值在右半部分。
否則，最小值在左半部分（包括 mid）。
終止條件:
當 left == right 時，nums[left] 就是最小值。
'''

nums = [3,4,5,1,2]

solution = Solution()
print(solution.findMin(nums))