
from typing import List

class Solution:
    def quicksort(self , nums , start , end):
        if start >= end:
            return nums
        pivot = start
        left = pivot + 1
        right = end
        while left <= right:
            while left <= end and nums[left] <= nums[pivot] :
                left += 1
            while right > start and nums[right] > nums[pivot]:
                right -= 1
            if left < right:
                temp = nums[right]
                nums[right] = nums[left]
                nums[left] = temp
        if nums[left] > nums[pivot]:
            temp = nums[pivot]
            nums[pivot] = nums[right]
            nums[right] = temp
        self.quicksort(nums , start , right - 1)
        self.quicksort(nums , right + 1 , end)
        return nums
                 

    def findKthLargest(self, nums: List[int], k: int) -> int:
        sort_num = self.quicksort(nums,0 ,len(nums)-1)


        return sort_num[len(nums) -k]







nums = [3,2,3,1,2,4,5,5,6]
k = 4
solution = Solution()
print(solution.findKthLargest(nums,k))