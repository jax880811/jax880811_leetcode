from typing import List
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums)-1
        while left<=right:
            mid = (left+right)//2
            if nums[mid] == target:
                return mid
            elif nums[mid]>=nums[left]:
                if nums[mid]>=target >= nums[left]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid]<=target<=nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        
        return -1

nums = [4,5,6,7,0,1,2]
target = 0
solution = Solution()
print(solution.search(nums,target))
'''
此題是比較特別的有序陣列
0-7分割成4-7以及0-3,大的序列放到右邊去小的序列放到左邊
也就是說利用二元搜尋法還必須要再加個條件
若中間>target又大於最左邊元素值
代表target在左半邊,於是讓right變成mid - 1
若中間>target
但是小於target,就是在右半邊
left變成mid + 1
已題目範例一為例
Input: nums = [4,5,6,7,0,1,2], target = 0
'''