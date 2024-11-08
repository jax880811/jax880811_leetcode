class Solution:
    def climbStairs(self, n: int) -> int:
        if n<3: #如果階梯數小於3，直接回傳n
            return n
        dp = [0]*(n+1) #先創造n+1個元素的list來存放答案
        dp[1] = 1
        dp[2] = 2
        for i in range(3,n+1):#此題方法需要用到費式數列的方式，因此第i階的數值，來自於i-1再加上i-2的數值
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]

n=10
solution = Solution()
print(solution.climbStairs(n))

'''
此題爬階的方法總計算方式，解決的原理為費式數列
'''

