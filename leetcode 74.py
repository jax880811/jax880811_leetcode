from typing import List


class Solution:
    def mid_matrix(self,matrix, target):
        left = 0
        right = len(matrix)-1
        while left<=right:
            mid = (left+right)//2
            if matrix[mid] == target:
                return True
                break
            elif matrix[mid]>target:
                right = mid-1
            else :
                left = mid + 1
        return False
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        left = 0
        right = len(matrix)-1
        while left<=right:
            mid = (left+right)//2
            if matrix[mid][0]>target:
                right = mid-1
            elif matrix[mid][len(matrix[mid])-1]<target:
                left = mid + 1
            else:
                return self.mid_matrix(matrix[mid],target)
                break
        return False


matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
target = 3

solution = Solution()
print(solution.searchMatrix(matrix,target))