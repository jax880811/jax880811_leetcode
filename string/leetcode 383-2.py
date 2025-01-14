from typing import List


class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        count = {}
        for char in magazine:
            count[char] = count.get(char,0) + 1

        for char in ransomNote:
            if count.get(char,0) ==0 : #確認有無足夠字母裝填ransomNote，不夠就回報false
                return False
            count[char] -= 1

        return True

'''

這題是期待magazine這字串裡面的字元種類跟含量可不可以重新組出ransomnote的字串
另外一個方法則是分別計算magazine有沒有足夠字母數去填滿ransomNote
如果字元數不夠填滿ransomNote，回報錯誤

時間複雜度: O(m + n)，其中m等於ransomnote數量，n等於magazine的字元數
'''

ransomNote = "aa"
magazine = "aab"
solution = Solution()
print(solution.canConstruct(ransomNote,magazine))