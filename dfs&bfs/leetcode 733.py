from typing import List
from collections import deque
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        start_color = image[sr][sc]
        if start_color == color:#起始顏色點一樣 直接回傳圖片本身
            return image
        queue = deque([(sr,sc)])
        while queue:
            print(queue)
            x,y = queue.popleft()
            if image[x][y] == start_color:
                image[x][y] = color
                for dx,dy in ([1,0],[0,1],[-1,0],[0,-1]): #以標準點為中心，往上下左右開始尋找所有存在的點去做考慮，並小心不要跑到圖外的座標點
                    nx,ny = x+dx,y+dy
                    if 0<=nx<len(image) and 0<=ny<len(image[0]):
                        queue.append((nx,ny))
        return image

'''
此題目的本質在於針對一個區域的色塊進行變色
其本質是在選定其中一個點為基準，並將該點所在區域的點全部變色
如果需要變的顏色跟原本一樣，那整張圖都不用變
如果不一致，就開始尋找這個基準點所在區域內的所有圖，先尋找所有的相鄰點，上[0,1]，下[0,-1]，左[-1,0]，右[1,0]都先放進去考量
如果相鄰點顏色跟起始原色一致，代表這相鄰點也在同一個色區塊，就要進行變色，並以此相鄰點為新基準，繼續列出所有可能存在同一區域的相鄰點
若相鄰點顏色不一致，可能已經經過變色處理，或者是不在同一個區塊，就跳過不管
'''          

image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1
sc = 1
color = 2
solution = Solution()
print(solution.floodFill(image,sr,sc,color))
