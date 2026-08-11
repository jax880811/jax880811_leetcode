

class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        
        check = sorted(intervals)
        answer = [check[0]]
        
        for i in range(1,len(check),1):
            current = check[i]
            if current[0] <= answer[-1][1]:
                answer[-1][1] = max(answer[-1][1] , current[1])
            else:
                answer.append(current)

            
        return answer





solution = Solution()
intervals = [[4,7],[1,4],[16,18] , [8,16]]
print(solution.merge(intervals))  # Output: [[1,6],[8,10],[15,18]]