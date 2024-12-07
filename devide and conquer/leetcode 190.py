from typing import List
import math

class Solution:
    def reverseBits(self, n: int) -> int:
        sum = 0
        for i in range(32):
            
            bit = n&1
            sum = (sum<<1) | bit
            n >>=1
        return sum

'''
題目要將一個固定32bit的二進位數反轉
每次看一個位置就要乘2，需不需要加1那就看本來的位置是否為一
(sum<<1) | bit就是指整個數字*2，然後最後一位跟1做and運算
若為0就單純乘2，反之則為乘2後加1
'''



n = 0b00000010100101000001111010011100
solution = Solution()
print(solution.reverseBits(n))