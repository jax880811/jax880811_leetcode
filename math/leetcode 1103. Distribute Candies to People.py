from typing import List


class Solution:
    def distributeCandies(self, candies: int, num_people: int) -> List[int]:
        """
        把 `candies` 顆糖果依題目規則分配給 `num_people` 個人，
        每輪分配的糖果數從 1 開始、每次遞增 1，依序分配給 0..num_people-1，
        然後繼續從 0 人開始分配下一個遞增的數字。當剩餘糖果不足時，
        將剩餘糖果全部分給當前人並結束。

        回傳：長度為 `num_people` 的列表，表示每個人最後拿到的糖果數量。
        """

        # 異常或邊界處理：若沒有糖果或沒有要分配的人，直接回傳合理的結果
        # 題庫通常不會給 num_people == 0，但這裡保險處理，回傳 [0]
        if candies == 0 or num_people == 0:
            return [0]

        # 建立答案陣列，預先填滿 0
        answer = [0] * num_people

        # i -> 當前分配對象的索引（0-based），從 0 開始
        i = 0

        # candy -> 本次要分配的糖果數，從 1 開始遞增
        candy = 1

        # 只要還有糖果就持續分配
        while candies > 0:
            # 如果剩餘糖果足夠給完整的 candy 顆，則給予 candy 顆
            if candy <= candies:
                answer[i] += candy  # 將 candy 加到第 i 個人的累計上
            else:
                # 若剩餘不夠，將剩下的糖果全部給當前人，並在下次迴圈結束
                answer[i] += candies

            # 扣除剛剛分配出去的糖果數
            # 注意：當 candy > candies 時，candies 會變成負數，下一次 while 檢查時會結束
            candies -= candy

            # 指向下一個人
            i += 1

            # 本次分配數字遞增 1
            candy += 1

            # 若已超過最後一個人，回到第 0 個人（輪詢）
            if i >= num_people:
                i = 0

        # 回傳最終結果
        return answer


if __name__ == "__main__":
    # 範例測試：
    candies = 7
    num_people = 4
    solution = Solution()
    print(solution.distributeCandies(candies, num_people))


"""
詳細筆記 - LeetCode 1103: Distribute Candies to People

題目翻譯：
給定整數 `candies`（糖果總數）與 `num_people`（人數），依序分配遞增的糖果數列給每個人，
當剩餘糖果不足以給完整數量時，將剩下的糖果全部給當前人並結束。

解題重點：
- 這題是模擬（simulation）類型，直接模擬題目描述即可。
- 用一個長度為 `num_people` 的陣列 `answer` 儲存結果，
  使用兩個變數 `i`（目前人）與 `candy`（本輪要發的數量）維護狀態。

時間與空間複雜度：
- 時間複雜度：O(k)，其中 k 為迴圈執行次數，滿足 1 + 2 + ... + k >= 初始 candies，
  因此 k = O(sqrt(candies))，每次迴圈 O(1) 操作。
- 空間複雜度：O(num_people)，用於結果陣列。

可優化方向（非必要）：
- 若 candies 很大，可用數學方法先計算能完整發到第 k 顆糖果（求解 k 使 1+2+...+k <= candies），
  再用整體輪數推導每個人的總和，最後處理剩餘的糖果分配，達到 O(num_people) 或更好複雜度。

範例（candies=7, num_people=4）：
- 第 0 人拿 1（剩 6） => [1,0,0,0]
- 第 1 人拿 2（剩 4） => [1,2,0,0]
- 第 2 人拿 3（剩 1） => [1,2,3,0]
- 第 3 人欲拿 4，但只剩 1 => 給第 3 人 1 => [1,2,3,1]

註：本檔案已加入逐行中文註解，若你要我把註解改為更精簡或改寫成英文註解，請告訴我。
"""