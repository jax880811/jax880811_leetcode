from typing import List

class Solution:
    def hammingWeight(self, n: int) -> int:
        if n==0:
            return 0
        count = 0
        while n>0:
            
            if n&1==1:
                count+=1
            n = n>>1
            
        return count

'''
計算該十進位數字轉成二進位有幾個1
那麼就把從最底部開始跟1做and運算，若為1就增加記數
並不斷右移整個數字，直到歸0
'''





n = 11
solution = Solution()
print(solution.hammingWeight(n))