from typing import List
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        if not nums:
            return 0
        sum = -float('inf')
        temp = 0
        for i in nums:
            sum = max(sum,i,temp+i)
            if i>(temp+i):
                temp = i
            else:
                temp = temp+i
        return sum
    
nums = [-2,1,-3,4,-1,2,1,-5,4]
solution = Solution()

print(solution.maxSubArray(nums))
'''
找出最大的子字串加起來的總合
先以陣列中的第一個元素作為錨點，開始往後疊加，先用一個暫時陣列來去做變動計算總和
另一個答案的陣列則是計算最大的暫時陣列總和數字
暫時總和計算則是取當前總和與當前元素作做加總在對比當前元素
若當前元素明顯比較大，則改變基準點，從當前元素繼續往後做總和運算，取最大值
'''