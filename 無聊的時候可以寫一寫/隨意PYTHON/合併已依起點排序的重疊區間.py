"""
設備停機時段以閉區間 [start, end] 表示。給定已依 start 由小到大排序的區間陣列 intervals，
請合併所有重疊或端點相接的區間並回傳結果。輸入可為空，不得再次呼叫排序函式。

說明目前區間應與結果陣列最後一個區間合併或分開的判斷條件。（4 分）
實作 mergeIntervals(intervals)。（9 分）
分析時間與額外空間複雜度。（3 分）
例：[[1,3],[2,6],[8,10],[10,12]]，輸出 [[1,6],[8,12]]。
"""
def mergeIntervals(intervals: list[list[int]]) -> list[list[int]]:
    # 只有 0 或 1 個區間時，不需要合併
    if len(intervals) < 2:
        return intervals

    # 第一個區間先放入答案
    answer = [intervals[0]]

    # 從第二個區間開始逐一檢查
    for i in range(1, len(intervals)):
        current = intervals[i]

        # 若目前起點 <= 最後區間終點，
        # 代表重疊或端點相接，可以合併
        if current[0] <= answer[-1][1]:
            # 合併後右端點取兩者較大值
            answer[-1][1] = max(answer[-1][1], current[1])

        else:
            # 完全分開，直接加入新的區間
            answer.append(current)

    return answer


intervals = [[1, 3], [2, 6], [8, 10], [10, 12]]
print(mergeIntervals(intervals))
"""
def mergeIntervals(intervals: list[list[int]]) -> list[list[int]]:
    # 輸入為空時直接回傳
    if not intervals:
        return []

    answer = []

    # 先用第一個區間初始化目前合併範圍
    left = intervals[0][0]
    right = intervals[0][1]

    # 從第二個區間開始檢查
    for i in range(1, len(intervals)):

        # 若前一組已經完成，
        # 目前區間成為新的合併起點
        if left == -1:
            left = intervals[i][0]
            right = intervals[i][1]

        else:
            # 若目前仍屬於同一組合併區間，
            # 右界只能擴大，不能縮小
            right = max(right, intervals[i][1])

        # 若目前右界小於下一區間的起點，
        # 表示下一區間與目前區間完全分離
        if i + 1 < len(intervals) and right < intervals[i + 1][0]:
            answer.append([left, right])

            # 標記目前這組已經完成
            left = -1

    # 迴圈結束後，最後一組尚未加入答案
    if left != -1:
        answer.append([left, right])

    return answer
"""
"""
def mergeIntervals(intervals: list[list[int]]) -> list[list[int]]:
    # 若輸入為空，直接回傳空陣列
    if not intervals:
        return []

    answer = []

    # 目前正在合併的區間
    left = intervals[0][0]
    right = intervals[0][1]

    # 從第二個區間開始檢查
    for i in range(1, len(intervals)):
        # 取得目前區間的左右端點
        current_left = intervals[i][0]
        current_right = intervals[i][1]

        # 若目前區間起點 <= 前一合併區間終點，
        # 代表兩者重疊或端點相接
        if current_left <= right:
            # 擴大目前合併區間的右端點
            right = max(right, current_right)

        else:
            # 無法合併，先保存前一個完成的區間
            answer.append([left, right])

            # 重新開始一個新的合併區間
            left = current_left
            right = current_right

    # 迴圈結束後，最後一組區間尚未加入
    answer.append([left, right])

    return answer
"""