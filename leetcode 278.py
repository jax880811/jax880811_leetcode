
def isBadVersion(version: int) -> bool:
    return 0
class Solution:
    def firstBadVersion(self, n: int) -> int:
        left = 1
        right = n
        while left<right:
            mid = left + (right-left)//2
            if isBadVersion(mid):
                right = mid
            else:
                left = mid + 1
        return left
#計算初始的壞版本
#利用二元搜尋法尋找
#如果該版本是壞版本的話,就代表初始的壞版本可能在更早之前就發生了,所以將最右側的定位換成當前的壞版本
#但是一開始搜尋到的版本是好版本,那代表初始的壞版本會在更後面才發生,此時就將最左側的定位換成當前的好版本
#直到左跟右的pointer相交 就能知道最初的壞版本
#回傳left pointer