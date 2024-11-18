from typing import List
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        word1_length = len(word1)
        word2_length = len(word2)
        answer = [[0]*(word2_length+1) for i in range(word1_length+1)]
        for i in range(word1_length+1):
            answer[i][0] = i
        for j in range(word2_length+1):
            answer[0][j] = j
        for i in range(1,word1_length+1):
            for j in range(1,word2_length+1):
                if word1[i-1] == word2[j-1]:
                    answer[i][j] = answer[i-1][j-1]
                else:
                    answer[i][j] = min(answer[i-1][j],answer[i][j-1],answer[i-1][j-1])+1
        #answer[i-1][j]表示刪除一個字
        #answer[i][j-1]表示新增一個字
        #answer[i-1][j-1]表示替換一個字

        return answer[word1_length][word2_length]
        
        


word1 = "horse"
word2 = "ros"

solution = Solution()
print(solution.minDistance(word1,word2))

'''
此題的本質是在把第一組字串變成第二組字串
選擇最少步驟的方式完成，方法有:刪除一個字，新增一個字，替換一個字
此題可用dp的方式，先填充一組二元陣列，並且開始對字串作對比，如果索引值一致就不用做任何動作
如果不一致就考慮看看用刪除，新增，替換 哪種方式比較值得
'''