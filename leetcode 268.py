from typing import List
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        temp = 0
        nums_length = len(nums)
        for i in range(nums_length):
            temp = temp^nums[i]
            temp = temp^i
        return temp^nums_length

nums = [3,0,1]
solution = Solution()
print(solution.missingNumber(nums))
#利用 A XOR A = 0 這點，把 0 ~ n 都 XOR 起來之後，再與陣列中每個數 XOR。
#同樣的數字互相 XOR 都會不見，留下的數字即為答案
