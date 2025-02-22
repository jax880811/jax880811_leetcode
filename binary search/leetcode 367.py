class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num == 1:
            return True
        left, right = 1, num
        
        while left <= right:
            mid = (left + right) // 2
            square = mid * mid
            
            if square == num:
                return True
            elif square < num:
                left = mid + 1
            else:
                right = mid - 1
        
        return False


num = 9
solution = Solution()
print(solution.isPerfectSquare(num))

'''
取1跟num的中間值開始去相乘
基本上就是用二元搜尋的方式開始去找哪個數字可以跟自己互乘==num
找不到就回傳false
'''