class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        # 長度不同不可能旋轉得到
        if len(s) != len(goal):
            return False

        n = len(s)

        # 空字串
        if n == 0:
            return True

        # 嘗試每一個可能的旋轉起點
        for start in range(n):

            # 若起點的第一個字元都不同，
            # 就沒必要繼續比較
            if s[start] != goal[0]:
                continue

            # 假設目前起點可以成功
            match = True

            # 從 goal[0] 開始逐一比較
            for g_idx in range(n):

                # s 的位置可能走到尾端後繞回 0
                s_idx = (start + g_idx) % n

                # 若有任何一個字元不同，
                # 這個起點就失敗
                if s[s_idx] != goal[g_idx]:
                    match = False
                    break

            # 若全部字元都吻合
            if match:
                return True

        return False

solution = Solution()
s = "abcde"
goal = "cdeab"
print(solution.rotateString(s, goal))