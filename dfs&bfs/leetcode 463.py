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
                if nx < 0 or nx >=len(grid) or ny<0 or ny >=len(grid[0]) or grid[nx][ny] !=1: #確認邊界，確認周遭是否為陸地，若相鄰邊已經在邊界或者並非陸地，就計算邊
                    sum += 1
                
        return sum

'''
此題要找出該陸地區域當中相鄰海域的邊角數為多少
我這邊是先找出所有的陸地範圍
接著在把每個陸地範圍的邊角都數出來
'''


grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
solution = Solution()
print(solution.islandPerimeter(grid))