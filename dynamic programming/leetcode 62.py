from typing import List
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        answer = [[1]*n for i in range(m)]
        for i in range(1,m):
            for j in range(1,n):
                answer[i][j] = answer[i-1][j] + answer[i][j-1]
        
        return answer[m-1][n-1]



m = 3
n = 7

solution = Solution()
print(solution.uniquePaths(m,n))

'''
從最左上走到最右下有多少種方法，已知只能走下或者右，不能倒回
就代表下一格能累積到的方法就是左邊一格+上面一格的總和
因此就用迭代的方式進行，不斷更新最新的格數總和

不過這題其實也是排列組合的經典問題
使用公式C(M+N-2,N-1) = (M+N-2)!/(M-1)!(N-1)! 就能夠直接得到答案
'''
