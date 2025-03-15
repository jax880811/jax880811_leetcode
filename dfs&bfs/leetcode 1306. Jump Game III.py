from typing import List

class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        """
        檢查是否可以從 start 索引跳到值為 0 的位置
        :param arr: 整數數組，表示每個位置可以跳躍的步數
        :param start: 起始索引
        :return: 是否可以跳到值為 0 的位置
        """
        n = len(arr)
        # 使用深度優先搜索（DFS）來檢查是否可以跳到值為 0 的位置
        def dfs(index):
            # 如果超出數組範圍，返回 False
            if index < 0 or index >= n:
                return False
            # 如果已經訪問過當前位置，返回 False（避免重複訪問）
            if arr[index] == -1:
                return False
            # 如果當前位置的值為 0，返回 True
            if arr[index] == 0:
                return True
            # 標記當前位置為已訪問
            temp = arr[index]
            arr[index] = -1
            # 遞歸檢查向左跳和向右跳
            can_reach = dfs(index + temp) or dfs(index - temp)
            # 恢復當前位置的值（可選，因為問題不需要還原數組）
            arr[index] = temp
            return can_reach

        return dfs(start)


# 測試範例
if __name__ == "__main__":
    solution = Solution()
    arr = [4, 2, 3, 0, 3, 1, 2]
    start = 5
    print(solution.canReach(arr, start))  # 輸出 True

    arr = [4, 2, 3, 0, 3, 1, 2]
    start = 0
    print(solution.canReach(arr, start))  # 輸出 True

    arr = [3, 0, 2, 1, 2]
    start = 2
    print(solution.canReach(arr, start))  # 輸出 False

'''
LeetCode 1306: 跳躍遊戲 III

題目翻譯：
給你一個非負整數數組 arr，你最初位於 start 索引處。當你位於索引 i 處時，你可以跳到 i + arr[i] 或 i - arr[i]。
請檢查是否可以跳到值為 0 的位置。注意，你不能跳出數組的範圍。

題目需求：
1. 檢查是否可以從 start 索引跳到值為 0 的位置。
2. 每次跳躍可以選擇向左或向右跳 arr[i] 步。
3. 返回是否可以跳到值為 0 的位置。

原始代碼的問題：
1. 如果直接使用暴力搜索，可能會導致重複訪問和無限循環。
2. 需要一種高效的方式來避免重複訪問。

解題思路與拆解：
1. 問題分析：
   - 從 start 索引開始，每次可以向左或向右跳 arr[i] 步。
   - 需要檢查是否可以跳到值為 0 的位置。
   - 這是一個典型的圖搜索問題，可以使用深度優先搜索（DFS）或廣度優先搜索（BFS）。

2. 解題方法選擇：
   - 使用深度優先搜索（DFS）來遍歷所有可能的跳躍路徑。
   - 使用標記來避免重複訪問。

3. 解題步驟：
   - 從 start 索引開始，遞歸檢查向左跳和向右跳。
   - 如果跳到值為 0 的位置，返回 True。
   - 如果超出數組範圍或已經訪問過當前位置，返回 False。
   - 使用標記來避免重複訪問。

重點筆記：
1. **深度優先搜索（DFS）的使用**:
   - 使用遞歸來實現 DFS，檢查所有可能的跳躍路徑。
   - 使用標記來避免重複訪問。

2. **時間複雜度**:
   - O(n)，其中 n 是數組的長度。
   - 每個位置最多被訪問一次。

3. **空間複雜度**:
   - O(n)，用於遞歸調用棧。
   - 如果使用 BFS，空間複雜度也是 O(n)。

4. **適用場景**:
   - 適用於需要遍歷所有可能路徑的問題。
   - 例如跳躍遊戲、圖的遍歷等。

範例解析：
- 輸入：arr = [4, 2, 3, 0, 3, 1, 2], start = 5
- 過程：
  - 從索引 5 開始，值為 1。
  - 跳到索引 4（5 - 1），值為 3。
  - 跳到索引 1（4 - 3），值為 2。
  - 跳到索引 3（1 + 2），值為 0。
  - 找到值為 0 的位置，返回 True。
- 輸出：True

函式功能說明：
- `class Solution`：封裝解決方案的類。
- `canReach(self, arr, start)`：檢查是否可以從 start 索引跳到值為 0 的位置。
- `dfs(index)`：深度優先搜索的輔助函數，用於遞歸檢查跳躍路徑。
- `arr[index] = -1`：標記當前位置為已訪問。
- `arr[index] = temp`：恢復當前位置的值（可選）。
'''