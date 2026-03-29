
from typing import List
class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # 1. 透過 set(nums) 去除重複數字
        # 2. 透過 sorted() 進行排序，得到一個從小到大的清單
        nums = sorted(set(nums))
        
        # 3. 如果清單長度大於等於 3，回傳倒數第 3 個 (index -3)
        # 4. 否則回傳最大值 (清單最後一個 index -1)
        if len(nums) >= 3:
            return nums[-3]
        return nums[-1]
    
nums = [3, 2, 1]
solution = Solution()
print(f"陣列 {nums} 中第三大的數是: {solution.thirdMax(nums)}")