def merge(left, right) -> list:
    answer = []
    n = 0
    m = 0
    while n < len(left) and m < len(right):
        if left[n] < right[m]:
            answer.append(left[n])
            n += 1
        else:
            answer.append(right[m])
            m += 1
    while n < len(left):
        answer.append(left[n])
        n += 1
    while m < len(right):
        answer.append(right[m])
        m += 1
    return answer


def random_sort(arr) -> list:
    if len(arr) < 2:
        return arr
    mid = len(arr) // 2
    left = random_sort(arr[:mid])
    right = random_sort(arr[mid:])
    return merge(left, right)


# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", random_sort(arr))

"""
def merge(left, right) -> list:
    # 建立結果陣列，用來存放合併後的排序結果
    answer = []

    # n 指向 left 目前尚未處理的位置
    n = 0

    # m 指向 right 目前尚未處理的位置
    m = 0

    # 當 left 和 right 都還有尚未處理的元素時，
    # 比較兩邊目前指向的元素
    while n < len(left) and m < len(right):

        # 若 left 目前元素較小，
        # 將 left[n] 放入結果陣列
        if left[n] < right[m]:
            answer.append(left[n])

            # left 指標往右移一格
            n += 1

        else:
            # 否則將 right[m] 放入結果陣列
            answer.append(right[m])

            # right 指標往右移一格
            m += 1

    # 若 left 還有剩餘元素，
    # 因為 left 本身已排序好，可以依序全部加入
    while n < len(left):
        answer.append(left[n])
        n += 1

    # 若 right 還有剩餘元素，
    # 同理全部依序加入
    while m < len(right):
        answer.append(right[m])
        m += 1

    # 回傳合併完成的排序陣列
    return answer


def merge_sort(arr) -> list:
    # 若陣列長度小於 2，
    # 代表只有 0 或 1 個元素，本身已經排序完成
    if len(arr) < 2:
        return arr

    # 找出中間位置
    mid = len(arr) // 2

    # 遞迴排序左半部
    left = merge_sort(arr[:mid])

    # 遞迴排序右半部
    right = merge_sort(arr[mid:])

    # 將兩個已排序好的子陣列合併
    return merge(left, right)


# 測試程式碼
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

print("原始陣列：", arr)
print("排序結果：", merge_sort(arr))
"""

"""
def random_sort(arr : list[int] , start , end) -> list:
    if start >= end:
        return arr
    pivot = start
    left = start + 1
    right = end
    while left <= right:
        while left <= end and arr[left] <= arr[pivot]:
            left += 1
        while right > start and arr[right] > arr[pivot]:
            right -= 1
        if left < right:
            arr[left] , arr[right] = arr[right] , arr[left]
    if arr[right] < arr[pivot]:
        arr[right] , arr[pivot] = arr[pivot] , arr[right]
    random_sort(arr , start , right-1)
    random_sort(arr , right + 1 , end)
    return arr
"""
