from typing import List
from collections import Counter

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        ransomNote_count = Counter(ransomNote)
        magazine_count = Counter(magazine)
        for char,count in ransomNote_count.items():
            if magazine_count[char] < count:
                return False

        return True

ransomNote = "aa"
magazine = "aab"
solution = Solution()
print(solution.canConstruct(ransomNote,magazine))



