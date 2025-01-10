from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        #說坦白，這種題目用c++比較好解決，畢竟可以用switch，python沒有switch可是缺點呢
        stack = []
        for character in s:
            if character == "(":  
                stack.append(character)
            elif character == ")":
                if stack :
                    if(stack.pop()) != "(":
                        return False
                    
                else:
                    return False
                    break
            elif character == "[":  
                stack.append(character)
            elif character == "]":
                if stack :
                    if(stack.pop()) != "[":
                        return False
                    
                else:
                    return False
                    break
            elif character == "{":  
                stack.append(character)
            elif character == "}":
                if stack :
                    if(stack.pop()) != "{":
                        return False
                
                else:
                    return False
                    break
        if stack:
            return False
        return True

'''
以前大二的java課程寫過類似題型但是更麻煩的作業
這一題很直覺就是用stack的方式，如果是([{那就push進去stack當中
如果是)}]就把stack的東西pop出來比較看看

不過這題其實用java或者c++會更好寫一點 畢竟有辦法用switch:)
'''
s = "([])"
solution = Solution()
print(solution.isValid(s))