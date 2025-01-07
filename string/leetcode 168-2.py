from typing import List

class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        result = []
        while columnNumber > 0:
            columnNumber -= 1  #每次將 columnNumber 減 1，這是因為字母從 1 開始而非 0。
            remainder = columnNumber % 26
            result.append(chr(remainder + ord('A')))  #找到對應字母
            columnNumber //= 26  #移動到更高一位
        return ''.join(result[::-1])  #[start:end:step] 是 Python 的切片操作，表示從 result 中提取子序列：

#start: 子序列的起始索引（包含）。
#end: 子序列的結束索引（不包含）。
#step: 子序列的步長（間隔）。





columnNumber = 701
solution = Solution()
print(solution.convertToTitle(columnNumber))