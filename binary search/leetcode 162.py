from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        left = 0 
        right = len(nums) - 1
        while left < right:
            mid = (left+right)//2
            if nums[mid]<nums[mid+1]:
                left = mid + 1
            else:
                right = mid
        return left

nums = [1,2,3,1]
solution = Solution()
print(solution.findPeakElement(nums))
'''
本題主旨在尋找一個數字
只要該數值的左右鄰居值沒有比自己大就可回傳所在的索引值
因此答案為複數
本題自己所使用的方法是尋找索引中間值
若該值小於右邊的鄰居,代表右邊鄰居一定有更大的值,所以向右尋找
倘若小於或者等於左鄰居,那就代表左邊鄰居也會有更大的值,所以向左尋找
'''