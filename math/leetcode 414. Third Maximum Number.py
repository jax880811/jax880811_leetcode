from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # 【筆記】初始化三個變數，分別代表第一大、第二大、第三大的數。
        # 初始值設為「負無窮大」，確保任何清單中的數字都能比它們大。
        first = second = third = float('-inf')
        
        for num in nums:
            # 第一步：篩選掉已經重複出現的數字
            # 如果目前這個數比第三名大，且它不是第一名也不是第二名（避免重複計數）
            if num > third and num != second and num != first:
                third = num
            
            # 第二步：氣泡式排序（把大的數字往「第一名」推）
            # 如果第三名現在比第二名大，兩者交換位置
            if third > second:
                third, second = second, third
                
            # 如果第二名現在比第一名大，兩者交換位置
            if second > first:
                second, first = first, second 
        
        # 第三步：判斷結果
        # 題目通常規定：如果「第三大的數」不存在，則回傳「第一大的數」。
        # 這裡檢查 third 是否還是初始的負無窮大。
        # (註：你的程式碼中有個小手誤寫成 float('inf')，應為 float('-inf'))
        if first == float('-inf') or second == float('-inf') or third == float('-inf'):
            return int(first)

        return int(third)

# 測試部分
nums = [3, 2, 1]
solution = Solution()
print(f"陣列 {nums} 中第三大的數是: {solution.thirdMax(nums)}")
