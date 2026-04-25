from typing import List

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        # 建立一個字典 check
        # 用來記錄 magazine 中每個字元出現的次數
        check = {}

        # 先走訪 magazine 的每一個字元
        for m in magazine:
            # 如果這個字元第一次出現
            if m not in check:
                print(m)
                # 就把它加入字典，次數設為 1
                check[m] = 1
            else:
                # 如果這個字元已經存在於字典中
                # 代表之前看過，就把次數加 1
                check[m] += 1

        # 再走訪 ransomNote 的每一個字元
        for r in ransomNote:
            # 如果這個字元根本不在 check 中
            # 或者雖然在 check 中，但次數已經被扣到 0
            # 代表 magazine 不足以提供這個字元
            if r not in check or check[r] == 0:
                return False
            else:
                # 如果這個字元還有剩餘次數
                # 就把它扣掉 1，表示拿去組成 ransomNote
                check[r] -= 1

        # 如果 ransomNote 所有字元都能順利取得
        # 就回傳 True
        return True

ransomNote = "aa"
magazine = "aab"
solution = Solution()
print(solution.canConstruct(ransomNote, magazine))