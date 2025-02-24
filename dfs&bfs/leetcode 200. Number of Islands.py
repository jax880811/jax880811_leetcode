from typing import Optional
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        
        def dfs(i, j):
            # 若超出邊界或該點已經是水就返回不計算
            if i < 0 or i >= rows or j < 0 or j >= cols or grid[i][j] == '0':
                return
            
            grid[i][j] = '0'  #已經計算過的陸地填0，變成海洋
            
            dfs(i+1, j)  #下
            dfs(i-1, j)  #上
            dfs(i, j+1)  #右
            dfs(i, j-1)  #左

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':  #找到島嶼
                    count += 1
                    dfs(i, j)  #找到的島嶼都填0，避免重複計算
        
        return count

'''
1為陸地，0為海洋
解題思路是如果碰到1，就先當成島嶼的一塊，count + 1
接著將相鄰的陸地視為同一個島嶼，將這島嶼通通改成0，當成淹沒這島嶼
接著繼續往下找，重複上述的行為直到最後
'''



grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
solution = Solution()
print(solution.numIslands(grid))