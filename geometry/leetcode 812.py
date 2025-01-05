from typing import List

class Solution:
    def largestTriangleArea(self, points: List[List[int]]) -> float:
        def cross_product(p1, p2, p3):
            return abs((p2[0] - p1[0]) * (p3[1] - p1[1]) - (p3[0] - p1[0]) * (p2[1] - p1[1])) / 2
        
        max_area = 0
        for i in range(len(points)):
            for j in range(i + 1, len(points)):
                for k in range(j + 1, len(points)):
                    max_area = max(max_area, cross_product(points[i], points[j], points[k]))
        return max_area
        
'''
使用向量叉積計算三角形的面積
面積等於(ab向量*ac向量)/2 
使用雙層迴圈選擇三點組合。
計算每組點的叉積，得到三角形面積。
更新最大面積。

'''
        

points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
solution = Solution()
print(solution.largestTriangleArea(points))