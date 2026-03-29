import math
class Solution:
    def isPrime(self ,n):
        if n<2:
            return False
        i = 2
        while i*i<= n:
            if n% i == 0:
                return False
            i += 1
        return True
    
    def isUgly(self, n: int) -> bool:
        if n<=0 :
            return False
        
        i = 2
        while i<= n:
            if n%i == 0 and i != 2 and i != 3 and i != 5 and self.isPrime(i):
                return False
            i  = i+1
        return True









n = int(input())

solution = Solution()


print(solution.isUgly(n))