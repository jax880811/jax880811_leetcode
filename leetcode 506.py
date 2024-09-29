from typing import List
class Solution:
    def findRelativeRanks(self, score: List[int]) -> List[str]:
        sc = sorted(score,reverse=True)#先進行排序,從大到小排
        score_set = {}#創造一個集合
        for i in range(len(score)):#根據題目敘事,依據大小給予set值,前三大分別是gold,silver,bronze
            if i == 0:
                score_set[sc[i]] = "Gold Medal"
            elif i == 1:
                score_set[sc[i]] = "Silver Medal"
            elif i==2:
                score_set[sc[i]] = "Bronze Medal"
            else:
                score_set[sc[i]] = str(i+1)
        answer = []
        for i in score:#接著把原本題目中list的元素跟剛剛創建好的set去做比對,並賦予新的陣列一個題目需要的值
            answer.append(score_set[i])
        return answer


score = [1,5,9,3,6,2,8,99,4]
solution = Solution()
print(solution.findRelativeRanks(score))