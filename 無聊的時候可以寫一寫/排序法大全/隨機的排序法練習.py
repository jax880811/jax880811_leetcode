import math

def random_sort(arr):
    if len(arr) < 2:
        return arr  # 0 或 1 個元素不用排序
    for i in range(len(arr) - 1):
        smallest = i
        for j in range(i , len(arr) , 1):
            if arr[j] < arr[smallest]:
                smallest = j
        arr[i] , arr[smallest] = arr[smallest] , arr[i]
    return arr
    



# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", random_sort(arr))

"""
radix sort
def counting_sort(arr, exp):
    n = len(arr)  # 陣列長度
    output = [0] * n  # 儲存這一輪排序結果
    count = [0] * 10  # 數字只會有 0~9 十種

    for i in range(n):
        digit = (arr[i] // exp) % 10  # 取出目前位數
        count[digit] += 1  # 統計這個位數出現次數

    for i in range(1, 10):
        count[i] += count[i - 1]  # 轉成累積位置

    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10  # 再取得目前位數
        output[count[digit] - 1] = arr[i]  # 放到正確位置
        count[digit] -= 1  # 該位置往前移一格

    for i in range(n):
        arr[i] = output[i]  # 將排序結果寫回原陣列

def radix_sort(arr):
    if len(arr) < 2:
        return arr  # 0 或 1 個元素不用排序

    max_value = max(arr)  # 找最大值，決定要處理幾位數
    exp = 1  # 從個位數開始

    while max_value // exp > 0:
        counting_sort(arr, exp)  # 依目前位數做穩定排序
        exp *= 10  # 個位 → 十位 → 百位 → 千位

    return arr
"""

"""
記數排序法
def random_sort(arr) -> list[int]:
    check = {}  # 記錄每個數值出現的次數
    answer = []  # 儲存排序後的結果

    for a in arr:  # 逐一統計每個數值的出現次數
        if a in check:
            check[a] += 1  # 已經出現過，次數加 1
        else:
            check[a] = 1  # 第一次出現，次數設為 1

    low = min(arr)  # 找出陣列中的最小值
    high = max(arr)  # 找出陣列中的最大值

    while low <= high:  # 從最小值一路掃到最大值
        while low in check and check[low] > 0:
            answer.append(low)  # 將目前數值加入排序結果
            check[low] -= 1  # 該數值剩餘次數減 1

        low += 1  # 繼續檢查下一個數值

    return answer  # 回傳排序後結果


arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", random_sort(arr))
"""


"""
def random_sort(arr) -> list[int]:
    check = {}  # 記錄每個數字出現的次數

    for n in arr:  # 逐一讀取陣列中的數字
        if n in check:
            check[n] += 1  # 已出現過，次數加 1
        else:
            check[n] = 1  # 第一次出現，次數設為 1

    low = min(arr)  # 找出最小值
    high = max(arr)  # 找出最大值

    if low == high:
        return arr  # 如果全部數字都相同，直接回傳

    answer = []  # 儲存排序結果

    while low <= high:  # 從最小值一路檢查到最大值
        while low in check and check[low] >= 1:
            answer.append(low)  # 將目前數字加入答案
            check[low] -= 1  # 該數字剩餘次數減 1

        low += 1  # 檢查下一個數字

    return answer  # 回傳排序完成的結果
"""

"""
radix sort(不用集合)
def random_sort(arr) -> list[int]:
    low = min(arr)  # 找出陣列中的最小值
    high = max(arr)  # 找出陣列中的最大值

    if low == high:
        return arr  # 如果最大值等於最小值，代表所有元素都相同，直接回傳

    index = high - low + 1  # 計算從最小值到最大值總共有多少種可能數值

    check = [0] * index  # 建立計數陣列，用來記錄每個數值出現的次數

    for n in arr:
        check[n - low] += 1  # 將數值平移後，記錄該數字出現次數

    answer = []  # 建立結果陣列，用來存放排序後的資料

    for i in range(index):
        while check[i] > 0:  # 如果目前這個數值還有出現次數
            answer.append(i + low)  # 將索引轉回原本的數值並加入答案
            check[i] -= 1  # 該數值剩餘次數減 1

    return answer  # 回傳排序完成的陣列


# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]  # 建立測試陣列

print("原始陣列：", arr)  # 印出排序前陣列
print("排序結果：", random_sort(arr))  # 呼叫排序函式並印出結果
"""
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
