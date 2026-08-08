# 使用程式語言：Python

def counting_sort(arr, exp):
    # 取得陣列長度
    n = len(arr)

    # 建立輸出陣列
    output = [0] * n

    # 因為十進位每一位只可能是 0～9，
    # 所以建立長度為 10 的計數陣列
    count = [0] * 10

    # 統計目前這一位數字出現幾次
    for i in range(n):
        # 取出目前要比較的那一位
        digit = (arr[i] // exp) % 10

        # 對應位置的次數加 1
        count[digit] += 1

    # 將 count 改造成累積次數
    # 這樣就能知道某個數字最後應放到哪個位置
    for i in range(1, 10):
        count[i] = count[i] + count[i - 1]

    # 從右往左掃描原陣列
    # 這樣才能維持穩定排序
    i = n - 1

    while i >= 0:
        # 取出目前這個數字在 exp 位上的數字
        digit = (arr[i] // exp) % 10

        # 找到這個元素應放的位置
        output[count[digit] - 1] = arr[i]

        # 此數字已經放入一個元素，所以位置往前移
        count[digit] -= 1

        # 繼續處理前一個元素
        i -= 1

    # 將排序結果複製回原陣列
    for i in range(n):
        arr[i] = output[i]


def radix_sort(arr):
    # 若陣列為空，直接返回
    if len(arr) == 0:
        return arr

    # 找出陣列中的最大值
    # 用來判斷總共有幾位數需要處理
    max_value = max(arr)

    # exp = 1 代表個位數
    # exp = 10 代表十位數
    # exp = 100 代表百位數
    exp = 1

    # 只要最大值在目前位數仍有數字，
    # 就繼續進行排序
    while max_value // exp > 0:
        # 依照目前位數進行一次穩定計數排序
        counting_sort(arr, exp)

        # 移動到下一個位數
        exp *= 10

    # 回傳排序完成的陣列
    return arr


arr = [170, 45, 75, 90, 802, 24, 2, 66]

radix_sort(arr)

print(arr)