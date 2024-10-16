from typing import List
import heapq
class Solution:
    def kWeakestRows(self, mat: List[List[int]], k: int) -> List[int]:
        new_list = []
        for i in range(len(mat)):
            new_list.append([mat[i].count(1),i])
        new_list.sort()
        ans = []
        for i in range(k):
            ans.append(new_list[i][1])
        return ans



mat = [[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]]

print(mat[0].count(1))
k = 3
solution = Solution()
print(solution.kWeakestRows(mat,k))
'''
先是計算每一列當中有多少個1
在進行排序
根據排序的結果在計算最少個1的前k排是哪幾排
'''