from typing import List

class Solution:
    def calculate(self, s: str) -> int:
        stack = []          # 存放所有待加總的數字
        num = 0            # 暫存目前讀取到的多位數數字 (例如把 "12" 轉成 12)
        operand = "+"      # 紀錄「前一個」看到的運算元，預設第一個數字前是加號
        operators = {"+", "-", "*", "/"}

        for i, c in enumerate(s):
            # 1. 如果是數字，就進行進位運算 (例如 '1','2' -> 1*10 + 2 = 12)
            if c.isdigit():
                num = num * 10 + int(c)
            
            # 2. 關鍵判斷：如果遇到運算元，或者是字串的最後一個字元
            # 注意：這裡會跳過空格，直到遇到下一個符號或結尾才處理之前的數字
            if (not c.isdigit() and c != ' ') or i == len(s) - 1:
                
                # 根據「上一個符號 (operand)」來決定如何把「目前的數字 (num)」放進 stack
                if operand == "+":
                    stack.append(num)        # 加法：直接存入正數
                elif operand == "-":
                    stack.append(-num)       # 減法：存入負數，之後統一用 sum 加起來
                elif operand == "*":
                    # 乘法：優先權高！立刻從 stack 彈出前一個數，乘完後再塞回去
                    stack.append(stack.pop() * num)
                elif operand == "/":
                    # 除法：優先權高！立刻彈出前一個數進行除法
                    top = stack.pop()
                    # 使用 int(top / num) 確保正負數除法都能「向零取整」
                    stack.append(int(top / num))
                
                # 運算完畢，更新 operand 為目前的符號，並將 num 歸零準備讀下一個數
                operand = c
                num = 0

        # 3. 最後結算：Stack 裡面剩下的都是加減項，逐一彈出累加
        result = 0
        while stack:
            result += stack.pop()

        return result

# 測試案例實例化
s = " 3+5 / 2 "
solution = Solution()
print(solution.calculate(s))  # 輸出: 5