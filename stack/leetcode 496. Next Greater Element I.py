from typing import List

class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # 1. 初始化工具
        # stack: 用來存放暫時還沒找到「右邊第一個大數」的數字
        # res_map: 用來儲存對應關係，Key = 數字, Value = 該數字右邊第一個更大的數字
        stack = []
        res_map = {}
        
        # 2. 遍歷 nums2 (這是尋找答案的核心步驟)
        for num in nums2:
            # 當 stack 不為空，且當前的數字 num 比 stack 頂端的數字大時：
            # 這代表我們幫 stack 頂端的那個數字找到了它的「下一個更大元素」
            while stack and num > stack[-1]:
                # 彈出 stack 頂端的較小數字
                smaller_num = stack.pop()
                # 在雜湊表中紀錄：這個較小數字的下一個大數就是當前的 num
                res_map[smaller_num] = num
            
            # 將當前數字壓入 stack 中
            # 如果它沒觸發上面的 while，代表它還在等右邊出現比它大的數字
            stack.append(num)
            
        # 3. 準備結果清單
        result = []
        
        # 4. 根據 nums1 的順序來查表
        for num in nums1:
            # 檢查這個數字是否在我們剛剛建立的 res_map 答案簿中
            if num in res_map:
                # 如果有記錄，就把對應的更大元素放入結果
                result.append(res_map[num])
            else:
                # 如果沒有記錄（代表在 nums2 中它右邊沒有比它大的數），放入 -1
                result.append(-1)
        
        # 5. 回傳最終結果清單
        return result

# 測試範例
nums1 = [4, 1, 3]
nums2 = [1, 3, 4, 2]
solution = Solution()
print(solution.nextGreaterElement(nums1, nums2))