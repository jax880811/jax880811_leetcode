from typing import List
from collections import deque

class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        if not grid:
            return 0
        
        queue = deque()
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if grid[row][column] == 1:
                    queue.append((row,column))
                    
        
        sum = 0
        print(queue)
        while queue:
            x,y = queue.popleft()
            for dx,dy in ([1,0],[0,1],[-1,0],[0,-1]):
                nx,ny = x+dx,y+dy
                if nx < 0 or nx >=len(grid) or ny<0 or ny >=len(grid[0]) or grid[nx][ny] !=1: #確認邊界
                    sum += 1
                

        return sum


grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
solution = Solution()
print(solution.islandPerimeter(grid))