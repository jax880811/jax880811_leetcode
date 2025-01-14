from typing import List

class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        if columnNumber<=26:
            return chr(columnNumber-1+ord('A'))
        columnNumber -= 1 #如果不減一，整除後跑出0的話會出現錯誤
        return self.convertToTitle(columnNumber//26) + chr(columnNumber%26+ord('A'))

'''
題目需要把excel的欄位從數字轉換成從英文顯示
這邊是用遞迴的方式，慢慢地將數字推出來

其實還有一個方法是使用整除取餘數的方式放到一個list當中
只是最後要記得把這個List進行reverse的操作
實作方法放到168-2去
'''        



columnNumber = 701
solution = Solution()
print(solution.convertToTitle(columnNumber))