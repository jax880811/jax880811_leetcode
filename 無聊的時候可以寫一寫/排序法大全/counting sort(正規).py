def counting_sort(arr):
    if len(arr) < 2:
        return arr
    low = min(arr)
    high = max(arr)
    length = high - low
    count_array = [0] * (length+1)
    for n in arr:
        count_array[n-low] += 1
    result = []
    for i in range(len(count_array)):
        while count_array[i] > 0:
            result.append(i+low)
            count_array[i] -= 1
    return result






# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", counting_sort(arr))

'''
def counting_sort(arr):
    # 如果陣列長度小於 2，本身已經排序好
    if len(arr) < 2:
        return arr

    # 找出陣列中的最小值
    low = min(arr)

    # 找出陣列中的最大值
    high = max(arr)

    # 計算數值範圍大小
    # 例如：-3 ~ 5，共有 9 個不同數值
    length = high - low

    # 建立計數陣列
    # index 0 對應到數值 low
    count_array = [0] * (length + 1)

    # 統計每個數值出現的次數
    for n in arr:
        # 利用 offset(偏移量) 將數值轉成 index
        count_array[n - low] += 1

    # 建立排序後的結果陣列
    result = []

    # 依照數值由小到大輸出
    for i in range(len(count_array)):

        # 如果目前數值出現多次，就加入多次
        while count_array[i] > 0:

            # 將 index 還原回真正的數值
            result.append(i + low)

            # 已輸出一次，次數減一
            count_array[i] -= 1

    # 回傳排序完成的結果
    return result
'''