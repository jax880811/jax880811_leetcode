from typing import List
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        word1_length = len(word1)
        word2_length = len(word2)
        answer = [[1]*(word2_length+1) for i in range(word1_length+1)]
        for i in range(word1_length):
            answer[i][0] = i
        for j in range(word2_length):
            answer[0][j] = j
        for i in range(word1_length):
            for j in range(word2_length):
                if word1[i-1] == word2[j-1]:
                    answer[i][j] = answer[i-1][j-1]
                else:
                    answer[i][j] = min(answer[i-1][j],answer[i][j-1],answer[i-1][j-1])+1
        

        return answer[word1_length-1][word2_length-1]


word1 = "horse"
word2 = "ros"

solution = Solution()
print(solution.minDistance(word1,word2))