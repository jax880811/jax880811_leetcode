from typing import List


class Solution:
    def longestPalindrome(self, s: str) -> int:
        check = {}
        for i in range(len(s)):
            if s[i] in check:
                check[s[i]] += 1
            else:
                check[s[i]] = 1
        count = 0
        is_odd = False    

        for value in check.values():
            if value%2 == 0 :
                count += value
            else:
                count += (value-1)
                is_odd = True
        if is_odd:
            count += 1

        return count




s = "abccccdd"
solution = Solution()
print(solution.longestPalindrome(s))  # Output: 7