class Solution:
    def threeSum(self, nums):
        # 用於存儲結果
        result = []
        
        # 將數組排序
        nums.sort()
        
        # 遍歷數組，固定一個數
        for i in range(len(nums) - 2):
            # 跳過重複的 nums[i]
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            
            # 初始化雙指針
            j = i + 1  # 左指針
            k = len(nums) - 1  # 右指針
            
            # 使用雙指針法尋找三元組
            while j < k:
                total = nums[i] + nums[j] + nums[k]
                
                if total == 0:
                    # 找到符合條件的三元組，加入結果
                    result.append([nums[i], nums[j], nums[k]])
                    
                    # 跳過重複的 nums[j] 和 nums[k]
                    while j < k and nums[j] == nums[j + 1]:
                        j += 1
                    while j < k and nums[k] == nums[k - 1]:
                        k -= 1
                        '''
                        雙指針法尋找三元組:

                        計算 nums[i] + nums[j] + nums[k] 的和。

                        如果和為 0，將三元組加入結果，並跳過重複的 nums[j] 和 nums[k]。

                        如果和小於 0，移動左指針 j。

                        如果和大於 0，移動右指針 k。
                        '''
                    
                    # 移動指針
                    j += 1
                    k -= 1
                elif total < 0:
                    # 如果和小於 0，移動左指針
                    j += 1
                else:
                    # 如果和大於 0，移動右指針
                    k -= 1
        
        return result

# 測試範例
nums = [-1, 0, 1, 2, -1, -4]
solution = Solution()
print(solution.threeSum(nums))  # 輸出: [[-1, -1, 2], [-1, 0, 1]]
'''
三數之和

重點筆記：
1. **排序數組**:
   - 將數組排序，方便後續處理。

2. **固定一個數，使用雙指針法**:
   - 固定一個數 `nums[i]`，然後使用雙指針法在剩餘的數組中尋找兩個數 `nums[j]` 和 `nums[k]`，使得 `nums[i] + nums[j] + nums[k] == 0`。

3. **避免重複**:
   - 在固定 `nums[i]` 和移動指針時，跳過重複的元素，避免重複的三元組。

4. **時間複雜度**:
   - 排序的時間複雜度為 O(N log N)。
   - 雙指針法的時間複雜度為 O(N^2)。
   - 總時間複雜度為 O(N^2)。

5. **空間複雜度**:
   - 結果列表的空間複雜度為 O(N)，其中 N 是結果的數量。

6. **適用場景**:
   - 適合處理中等規模的數組，例如：統計學中的三數之和問題、數據分析中的組合問題等。

範例解析：
- 輸入：nums = [-1, 0, 1, 2, -1, -4]
- 過程：
  - 排序後：nums = [-4, -1, -1, 0, 1, 2]
  - 固定 -4，尋找兩個數使其和為 4。
  - 固定 -1，尋找兩個數使其和為 1。
  - 找到 [-1, -1, 2] 和 [-1, 0, 1]。
- 輸出：[[-1, -1, 2], [-1, 0, 1]]
'''