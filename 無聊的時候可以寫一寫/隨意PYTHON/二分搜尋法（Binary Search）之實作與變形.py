'''
二分搜尋法（Binary Search）為已排序資料上最有效率之搜尋演算法。
給定一個已由小至大排序之整數陣列 arr（長度為 n，元素可能重複），請回答下列問題：（3 題，共 16 分）

（一）請說明二分搜尋法之運作原理、使用前提，並說明其時間複雜度為 O(log n) 之原因。（4 分）

（二）請撰寫函式 binarySearch(arr, n, key)：於陣列中搜尋 key，找到時回傳其索引（任一符合位置即可），找不到時回傳 −1，
並註明所使用之程式語言。（6 分）

（三）承上，若陣列中 key 可能重複出現，請修改程式使其回傳 key「第一次出現」之索引（即最左側位置），找不到時回傳 −1。（6 分）
'''
def binarySearch(arr, n, key):
    left = 0
    right = n - 1
    while left <= right:
        mid = (right + left) // 2
        if arr[mid] <= key:
            left = mid + 1
        else:
            right = mid - 1
    if right >= 0 and arr[right] == key:
        return right
    return -1


arr = [1, 2, 2, 2, 3, 4, 5]
key = 2
n = len(arr)

print(binarySearch(arr, n, key))



'''
第二題 : 
# 使用程式語言：Python

def binarySearch(arr, n, key):
    # left 表示目前搜尋範圍的最左側索引
    # 陣列第一個元素的索引為 0
    left = 0

    # right 表示目前搜尋範圍的最右側索引
    # 長度為 n 的陣列，最後一個索引為 n - 1
    right = n - 1

    # 當 left 小於或等於 right 時，
    # 代表目前搜尋範圍內至少還有一個元素需要檢查
    while left <= right:

        # 計算目前搜尋範圍的中間索引
        # // 為整數除法，只保留整數部分
        mid = (right + left) // 2

        # 若中間元素剛好等於欲搜尋的 key，
        # 直接回傳該元素的索引
        if arr[mid] == key:
            return mid

        # 若中間元素大於 key，
        # 因為陣列已由小至大排序，
        # key 若存在，只可能位於 mid 左側
        elif arr[mid] > key:

            # 將右邊界移動到 mid 的前一個位置
            right = mid - 1

        # 若中間元素小於 key，
        # key 若存在，只可能位於 mid 右側
        else:

            # 將左邊界移動到 mid 的下一個位置
            left = mid + 1

    # 迴圈結束表示 left 已經大於 right，
    # 搜尋範圍已空，陣列中不存在 key
    return -1


# 建立一個已由小至大排序的整數陣列
arr = [1, 2, 2, 2, 3, 4, 5]

# 設定欲搜尋的值為 6
key = 6

# 取得陣列長度
n = len(arr)

# 呼叫 binarySearch 函式並輸出結果
# 因為陣列中不存在 6，所以輸出 -1
print(binarySearch(arr, n, key))
'''

'''
第三題:
# 使用程式語言：Python

def binarySearch(arr, n, key):
    # left 表示目前搜尋範圍的左邊界
    left = 0

    # right 表示目前搜尋範圍的右邊界
    right = n - 1

    # 搜尋第一個大於或等於 key 的位置
    while left <= right:
        # 計算目前搜尋範圍的中間索引
        mid = left + (right - left) // 2

        # 若中間值大於或等於 key，
        # 則第一次出現的位置可能是 mid，
        # 也可能位於 mid 的左方，因此繼續搜尋左半部
        if arr[mid] >= key:
            right = mid - 1

        # 若中間值小於 key，
        # 則 key 不可能位於 mid 或 mid 左方
        else:
            left = mid + 1

    # 迴圈結束後，left 是第一個大於或等於 key 的位置
    # 必須先確認 left 沒有超出陣列範圍，
    # 並確認該位置的值確實等於 key
    if left < n and arr[left] == key:
        return left

    # 若 left 超出範圍，或 arr[left] 不等於 key，
    # 表示陣列中不存在 key
    return -1
'''

'''
變形成尋找右邊邊界:
# 使用程式語言：Python

def binarySearch(arr, n, key):
    # 設定搜尋範圍的左邊界
    left = 0

    # 設定搜尋範圍的右邊界
    right = n - 1

    # 當搜尋範圍仍存在時，持續進行二分搜尋
    while left <= right:
        # 計算搜尋範圍的中間索引
        mid = (right + left) // 2

        # 若中間值小於或等於 key，
        # 表示 key 最後一次出現的位置可能在 mid 或 mid 右方
        if arr[mid] <= key:
            # 繼續搜尋右半部
            left = mid + 1

        # 若中間值大於 key，
        # 表示 key 不可能位於 mid 或其右方
        else:
            # 繼續搜尋左半部
            right = mid - 1

    # 迴圈結束後，right 指向最後一個小於或等於 key 的位置
    # 必須確認 right 沒有小於 0，且該位置的值確實等於 key
    if right >= 0 and arr[right] == key:
        # 回傳 key 最後一次出現的索引
        return right

    # 找不到 key 時回傳 -1
    return -1

'''