class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # 1. 安全檢查：如果輸入為空，直接回傳 0
        if not tokens:
            return 0
        
        stack = []  # 準備一個堆疊來存放數字
        # 定義哪些字串被視為「運算子」
        operators = {"+", "-", "*", "/"}
        
        for token in tokens:
            # 2. 判斷是否為數字：
            # 你的寫法很聰明，只要不是在 operators 裡的，就當作數字處理
            # 這也完美解決了 "-11" 這種負數的問題
            if token not in operators:
                stack.append(token)
            else:
                # 3. 遇到運算子：從堆疊取出「兩個」數字進行運算
                # 這裡的 pop 順序非常關鍵：
                # value_1 是後進來的，代表它是「右運算數」
                # value_2 是先進入的，代表它是「左運算數」
                value_1 = int(stack.pop())
                value_2 = int(stack.pop())
                
                if token == "+":
                    stack.append(value_2 + value_1)
                elif token == "-":
                    # 注意順序：左邊減去右邊 (value_2 - value_1)
                    stack.append(value_2 - value_1)
                elif token == "*":
                    stack.append(value_2 * value_1)
                elif token == "/":
                    # 注意：Python 的 // 是向下取整，但題目要求向零取整
                    # 使用 int(a / b) 可以達到 10/6=1, -10/6=-1 的效果
                    stack.append(int(value_2 / value_1))
        
        # 4. 迴圈結束後，堆疊中只會剩下最後一個數字，即為答案
        result = int(stack.pop())
        return result
    
