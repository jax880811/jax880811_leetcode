class Solution:
    def containsNearbyDuplicate(self, nums: list[int], k: int) -> bool:
        """
        檢查數組中是否存在兩個不同的索引 i 和 j，
        使得 nums[i] = nums[j] 且 abs(i - j) <= k
        :param nums: 整數數組
        :param k: 索引最大允許距離
        :return: 是否存在滿足條件的重複元素
        """
        num_dict = {}  # 使用字典記錄元素最近出現的索引
        
        for i, num in enumerate(nums):
            # 如果當前元素已存在於字典中，且索引差 ≤ k
            if num in num_dict and i - num_dict[num] <= k:
                return True
            # 更新當前元素的索引（無論是否滿足條件都要更新）
            num_dict[num] = i
        
        return False


# 測試範例
if __name__ == "__main__":
    solution = Solution()
    
    # 範例 1
    nums1 = [1, 2, 3, 1]
    k1 = 3
    print(solution.containsNearbyDuplicate(nums1, k1))  # 輸出: True
    
    # 範例 2
    nums2 = [1, 0, 1, 1]
    k2 = 1
    print(solution.containsNearbyDuplicate(nums2, k2))  # 輸出: True
    
    # 範例 3
    nums3 = [1, 2, 3, 1, 2, 3]
    k3 = 2
    print(solution.containsNearbyDuplicate(nums3, k3))  # 輸出: False

'''
LeetCode 219: 存在重複元素 II

題目翻譯：
給定一個整數數組 nums 和一個整數 k，判斷是否存在兩個不同的索引 i 和 j，
使得 nums[i] == nums[j] 且 abs(i - j) <= k。

題目需求：
1. 檢查是否存在重複元素，且重複元素的索引差 ≤ k
2. 返回布林值表示是否存在

解題思路與拆解：
1. 問題分析：
   - 需要快速查找元素是否在最近 k 個位置出現過
   - 需要記錄元素的最新索引

2. 解題方法選擇：
   - 哈希表法：使用字典記錄元素最近出現的索引
   - 滑動窗口法：維護一個大小為 k 的窗口（空間更優）

3. 解題步驟：
   - 遍歷數組，用字典記錄每個元素的最近索引
   - 遇到重複元素時檢查索引差
   - 若滿足條件立即返回 true

重點筆記：
1. **哈希表法**:
   - 時間複雜度：O(n)，只需一次遍歷
   - 空間複雜度：O(min(n,k))，最多存儲 k 個元素

2. **滑動窗口優化**:
   - 可改為只維護最近 k 個元素的集合
   - 當窗口大小 > k 時刪除最舊元素
   - 空間複雜度降至 O(k)

3. **邊界條件**:
   - k = 0 時直接返回 false
   - 空數組返回 false

範例解析：
- 輸入：nums = [1,2,3,1], k = 3
  - i=0: 字典 = {1:0}
  - i=1: 字典 = {1:0, 2:1}
  - i=2: 字典 = {1:0, 2:1, 3:2}
  - i=3: 發現 1 已存在，lastIndex=0，3-0=3 ≤ k → 返回 true

函式功能說明：
- `num_dict`：記錄元素最近出現的索引
- `num in num_dict`：檢查元素是否已存在
- `num_dict[num]`：獲取元素上次出現的索引
- `num_dict[num] = i`：更新元素的最新索引
'''