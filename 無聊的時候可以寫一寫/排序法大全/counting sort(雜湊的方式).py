def counting_sort(arr):
    if len(arr) < 2:
        return arr
    check = {}
    for n in arr:
        if n not in check:
            check[n] = 1
        else:
            check[n] += 1
    result = []
    left = min(arr)
    right = max(arr)
    while left <= right:
        while left in check and check[left] >= 1:
            result.append(left)
            check[left] -= 1
        left += 1

    return result






# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", counting_sort(arr))

'''
def counting_sort(arr):
    # 定義 counting_sort 函式
    # 輸入 arr：要排序的整數陣列
    # 回傳值：由小到大排序完成的新陣列

    if len(arr) < 2:
        # 如果陣列長度小於 2
        # 代表陣列為空，或只有一個元素
        # 這兩種情況本身就已經是排序好的

        return arr
        # 直接回傳原陣列

    check = {}
    # 建立一個空字典 check
    # 用來記錄每一個數字出現的次數
    #
    # 字典格式會是：
    # 數值 -> 出現次數
    #
    # 例如：
    # arr = [3, 1, 3, 2]
    #
    # check 最後會是：
    # {
    #     3: 2,
    #     1: 1,
    #     2: 1
    # }

    for n in arr:
        # 逐一走訪 arr 中的每一個數字
        # 每一圈中，n 代表目前讀到的數字

        if n not in check:
            # 如果 n 尚未出現在 check 中
            # 代表這是第一次看到這個數字

            check[n] = 1
            # 將這個數字加入字典
            # 並把出現次數設為 1

        else:
            # 如果 n 已經存在於 check 中
            # 代表這個數字之前已經出現過

            check[n] += 1
            # 將這個數字的出現次數加 1

    result = []
    # 建立空陣列 result
    # 用來存放最後排序完成的結果

    left = min(arr)
    # 找出 arr 中的最小值
    # left 代表目前準備檢查的數值
    #
    # 例如：
    # arr = [8, 42, 15, 3]
    # left = 3

    right = max(arr)
    # 找出 arr 中的最大值
    # right 代表掃描範圍的終點
    #
    # 例如：
    # arr = [8, 42, 15, 3]
    # right = 42

    while left <= right:
        # 從最小值 left 開始
        # 一直掃描到最大值 right
        #
        # 每次都檢查目前的 left
        # 是否曾經出現在原陣列中

        while left in check and check[left] >= 1:
            # 只有在以下兩個條件都成立時才進入：
            #
            # 1. left 存在於 check 中
            # 2. left 尚有剩餘次數未輸出
            #
            # 例如：
            # check[3] = 2
            #
            # 代表數字 3 要放進 result 兩次

            result.append(left)
            # 將目前數值 left 加入排序結果

            check[left] -= 1
            # 將 left 尚未輸出的次數減 1
            #
            # 例如：
            # check[3] 原本是 2
            # 第一次輸出後變成 1
            # 第二次輸出後變成 0

        left += 1
        # 目前數值處理完成後
        # 往下一個整數繼續檢查
        #
        # 例如：
        # 3 -> 4 -> 5 -> 6 ...

    return result
    # 所有從最小值到最大值的數字都檢查完後
    # 回傳排序完成的新陣列


# --- 測試程式碼 ---

arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
# 建立一個尚未排序的測試陣列

print("原始陣列：", arr)
# 印出原始陣列內容

print("排序結果：", counting_sort(arr))
# 呼叫 counting_sort(arr)
# 並印出排序後的結果
'''