from typing import List
class Solution:
    def maxRepeating(self, sequence: str, word: str) -> int:
        answer = 0
        
        while word*(answer+1) in sequence:#每一次都把子字串加長，看看有沒有在sequence裡面
            answer += 1 
        return answer



sequence = "aaabaaaabaaabaaaabaaaabaaaabaaaaba"
word = "aaaba"
solution = Solution()

print(solution.maxRepeating(sequence,word))

'''
核心概念為word是否有在sequence
有的話，最多可以連續出現幾次
於是就每次都加長去測試有沒有在sequence，加到長度高於原本的sequence，在做統整
'''