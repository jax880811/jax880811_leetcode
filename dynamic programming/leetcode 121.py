from typing import List
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) == 1: #如果只有一個元素，直接回傳0
            return 0
        temp = 100000
        answer = 0 #先預設答案為0，如果從一開始的prices從大到小，就是回傳0
        for i in prices:#遍布每一天的prices
            if i<temp:#去找出當下最小的prices，並以此作為基準點
                temp = i
            if (i-temp)>answer:#計算出題目所需要的最大差值，不斷的更新
                answer = i-temp
        return answer
    



prices = [7,1,5,3,6,4]
solution = Solution()
print(solution.maxProfit(prices))


'''
此題的本質上就是要找出逢最低的時候買入，最高的時候賣出，最大效益為何
於是要先找出一個最低的基準值，在跟後面的價格作比較，找出最大的效益
'''    

