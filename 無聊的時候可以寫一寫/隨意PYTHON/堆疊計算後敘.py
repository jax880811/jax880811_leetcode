"""
04以堆疊計算後序運算式

後序運算式（Postfix Expression，又稱逆波蘭表示法）將運算子寫在兩個運算元之後。
給定一個合法的字串陣列 tokens，每個元素為整數或 +、-、* 其中之一，
請以堆疊（Stack）實作 evaluatePostfix(tokens)。

說明為何遇到運算子時，必須先彈出右運算元，再彈出左運算元。（3 分）
實作函式，不得呼叫可直接計算字串運算式的函式。（9 分）
分析時間與額外空間複雜度。（3 分）
例：["5", "2", "-", "4", "*"] 表示 (5 - 2) × 4，輸出 12。
"""
def evaluatePostfix(tokens):
    
    stack = []
    for c in tokens:
        if c == "+":
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(op1+op2)
        elif c == "-":
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(op1-op2)
        elif c == "*":
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(op1*op2)
        elif c == "/":
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(int(op1//op2))
        else:
            stack.append(int(c))
        
        
    return stack[0]



tokens = ["5", "2", "-", "4", "*"]
print(evaluatePostfix(tokens))

"""
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # 建立堆疊，存放運算元與中間結果
        stack = []

        # 逐一讀取每個 token
        for c in tokens:

            # 加法
            if c == "+":
                op2 = stack.pop()       # 先取右運算元
                op1 = stack.pop()       # 再取左運算元
                stack.append(op1 + op2)

            # 減法
            elif c == "-":
                op2 = stack.pop()
                op1 = stack.pop()
                stack.append(op1 - op2)

            # 乘法
            elif c == "*":
                op2 = stack.pop()
                op1 = stack.pop()
                stack.append(op1 * op2)

            # 除法
            elif c == "/":
                op2 = stack.pop()
                op1 = stack.pop()

                # LeetCode 要求向 0 截斷
                stack.append(int(op1 / op2))

            else:
                # 不是運算子，代表是整數字串
                stack.append(int(c))

        # 合法後序運算式最後只剩一個結果
        return stack[0]
"""