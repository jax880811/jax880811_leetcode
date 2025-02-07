from typing import List
from collections import Counter

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        ransomNote_count = Counter(ransomNote)#記錄次串當中每個字元的出現次數
        magazine_count = Counter(magazine)
        for char,count in ransomNote_count.items():
            if magazine_count[char] < count: #如果magazine當中有任何一種字母數量少於ransomNote，代表無法從中組建出ransomNote，回報錯誤
                return False

        return True

'''
這題是期待magazine這字串裡面的字元種類跟含量可不可以重新組出ransomnote的字串
那麼其中一種方法就是利用counter的方式，計算兩個字串的字元種類跟總數
如果magazine有特定字母數少於ransomnote，就代表無法使用magazine來去重新組出ransomnote
回報錯誤

時間複雜度: O(m + n)，其中m等於ransomnote數量，n等於magazine的字元數
'''

ransomNote = "aa"
magazine = "aab"
solution = Solution()
print(solution.canConstruct(ransomNote,magazine))



