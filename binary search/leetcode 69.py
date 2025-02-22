class Solution:
    def mySqrt(self, x: int) -> int:
        if x==0:
            return x
        first = 1
        last = x
        while first<=last:
            mid = first+(last-first)//2
            if mid==(x//mid):
                return mid
            elif mid > x//mid:
                last = mid-1
            else:
                first = mid + 1
        return last
solution = Solution()
x = 4
print(solution.mySqrt(x))