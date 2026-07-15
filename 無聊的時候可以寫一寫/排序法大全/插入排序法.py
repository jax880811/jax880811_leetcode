def insertion_sort(arr):

    if len(arr) < 2:
        return arr

    for i in range(1, len(arr)):

        j = i

        while j > 0 and arr[j] < arr[j - 1]:

            arr[j], arr[j - 1] = arr[j - 1], arr[j]

            j -= 1

    return arr


# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", insertion_sort(arr))