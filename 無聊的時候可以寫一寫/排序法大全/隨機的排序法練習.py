import math

def heapify(arr , n ,i) ->list[int]:
    if n < 2:
        return arr
    
    return arr
    

def random_sort(arr) -> list[int]:
    if len(arr) < 2:
        return arr
    n = len(arr)
    
    
            

    return arr


# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", random_sort(arr))
print(int(math.pow(2, 31)))

"""
#堆積排序(由大到小，建立min-heap)

def heapify(arr , n ,i) ->list[int]:
    if n < 2:
        return arr
    smallest = i
    left = 2*smallest + 1
    right = 2*smallest + 2
    if left < n and arr[left] < arr[smallest]:
        smallest = left
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    if smallest != i:
        arr[i] , arr[smallest] = arr[smallest] , arr[i]
        heapify(arr , n ,smallest)
    return arr
    

def random_sort(arr) -> list[int]:
    if len(arr) < 2:
        return arr
    n = len(arr)
    for i in range( n//2 - 1 , -1 , -1):
        arr = heapify(arr , n , i)
    for i in range( n - 1, -1 , -1):
        arr[0] , arr[i] = arr[i] , arr[0]
        arr = heapify(arr , i , 0)
    
            

    return arr
"""

"""
#插入排序
def insertion_sort(arr) -> list:
    # 只有 0 或 1 個元素時，本身已排序
    if len(arr) < 2:
        return arr

    # 取得陣列長度
    n = len(arr)

    # 每輪把下一個元素插入前方已排序區域
    for i in range(n - 1):
        # j 指向目前要往左插入的元素
        j = i + 1

        # 只要目前元素比前一個小，就持續往左交換
        while j > 0 and arr[j] < arr[j - 1]:
            # 交換目前元素與前一個元素
            temp = arr[j]
            arr[j] = arr[j - 1]
            arr[j - 1] = temp

            # 繼續往左檢查
            j -= 1

    # 回傳排序完成的陣列
    return arr
"""

"""
#選擇排序(從大到小)

def random_sort(arr) -> list:
    if len(arr) < 2:
        return arr

    n = len(arr)

    for i in range(n):
        # 先假設目前位置就是剩餘區間中的最大值
        maximum = i

        # 從 i+1 開始找真正的最大值
        for j in range(i + 1, n):
            if arr[j] > arr[maximum]:
                maximum = j

        # 若最大值不在目前位置，就交換
        if maximum != i:
            temp = arr[i]
            arr[i] = arr[maximum]
            arr[maximum] = temp

    return arr
"""


"""
泡泡排序法
def random_sort(arr) -> list:
    # 只有 0 或 1 個元素時，本身已排序
    if len(arr) < 2:
        return arr

    # 取得陣列長度
    n = len(arr)

    # 外層控制總共需要幾輪
    for i in range(n):

        # 每完成一輪，右邊會多一個已排序元素
        # 因此後面的部分不需要再次比較
        for j in range(n - i - 1):

            # 若左邊元素大於右邊元素，就交換
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    # 回傳排序完成的陣列
    return arr
"""
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
