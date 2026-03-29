from typing import List
# typing.List 是 Python 的型別提示（Type Hint）
# 作用：
#   告訴閱讀程式的人：這個函式參數或回傳值是 List
#   這不會影響程式執行，只是「型別提示」
# 在大型專案、IDE、自動檢查工具（mypy）中非常重要


def merge(left: List, right: List) -> List:
    """
    merge 函式負責「合併兩個已經排序好的陣列」

    重要前提：
        left  已經排序
        right 已經排序

    任務：
        合併成一個新的排序陣列
    """

    answer = []
    # answer 用來存放最後合併後的結果

    i, j = 0, 0
    # i 指向 left 的目前索引
    # j 指向 right 的目前索引

    # while 條件使用 AND
    # 表示「只有兩邊都還沒用完時才比較」
    while i < len(left) and j < len(right):

        # 比較兩邊目前的元素
        if left[i] <= right[j]:

            answer.append(left[i])
            # append 是 list 的方法
            # 作用：把元素加入 list 尾端

            i += 1
            # i += 1 是 Python 的語法糖
            # 等價於
            # i = i + 1

        elif right[j] < left[i]:

            answer.append(right[j])
            j += 1

        # 這裡沒有寫 else
        # 因為上面兩個條件已經完全涵蓋所有情況


    # 如果 left 還有剩餘元素
    # 直接全部加入 answer
    while i < len(left):

        answer.append(left[i])
        i += 1


    # 如果 right 還有剩餘元素
    while j < len(right):

        answer.append(right[j])
        j += 1


    return answer
    # 回傳合併後的新陣列



def mergesort(arr: List) -> List:
    """
    mergesort 是一個「分治法演算法」

    流程：
        1. 把陣列切成兩半
        2. 對左右兩半各自排序
        3. merge 合併
    """

    # Base Case（遞迴終止條件）
    if len(arr) < 2:
        return arr
        # 長度 0 或 1 的陣列已經是排序好的


    mid = len(arr) // 2
    # // 是「整數除法」
    # 例如
    # 10 // 2 = 5
    # 9 // 2 = 4


    # arr[:mid]
    # Python slicing（切片語法）

    left = mergesort(arr[:mid])
    # arr[:mid] 代表
    # index 0 ~ mid-1

    right = mergesort(arr[mid:])
    # arr[mid:] 代表
    # mid ~ 最後一個元素


    return merge(left, right)
    # 將排序好的左右子陣列合併



# ------------------ 主程式區 ------------------

# 建立一個尚未排序的整數陣列
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

# 印出排序前的原始陣列
print(arr)

# 呼叫 mergesort 函式進行排序
# 並印出排序後的結果
print(mergesort(arr))



"""
===========================================================
Merge Sort 超完整筆記
===========================================================

一、Merge Sort 是什麼？

Merge Sort 是一種「Divide and Conquer（分治法）」排序演算法

核心思想：

    把問題拆小 → 解決小問題 → 再合併


流程：

        原始陣列
            |
      分成兩半
            |
      各自排序
            |
        merge
            |
      得到排序結果


===========================================================

二、Merge Sort 遞迴過程


例子：

    [8,42,15,77,3,91,56]

第一層

    [8,42,15]      [77,3,91,56]

第二層

    [8] [42,15]    [77] [3,91,56]

第三層

    [42] [15]      [3] [91,56]

第四層

    [91] [56]



===========================================================

三、Merge 過程


假設：

left  = [2,5,9]
right = [1,6,10]

比較過程

2 vs 1 → 1
2 vs 6 → 2
5 vs 6 → 5
9 vs 6 → 6
9 vs 10 → 9

最後

[1,2,5,6,9,10]


===========================================================

四、時間複雜度


Merge Sort 的遞迴關係式：

    T(n) = 2T(n/2) + O(n)

解出來：

    O(n log n)


排序複雜度比較：

Bubble Sort     O(n²)
Insertion Sort  O(n²)
Quick Sort      O(n log n) 平均
Merge Sort      O(n log n)



===========================================================

五、空間複雜度

Merge Sort 需要額外陣列

Space Complexity：

    O(n)



===========================================================

六、Merge Sort 特性

特性：

1️⃣ 穩定排序（Stable Sort）
2️⃣ 保證 O(n log n)
3️⃣ 適合大量資料
4️⃣ 非原地排序（需要額外記憶體）


===========================================================

七、為什麼 while 用 AND


錯誤寫法

    while i < len(left) OR j < len(right)

如果 right 已經用完

    right[j]

會 IndexError


正確

    while i < len(left) AND j < len(right)



===========================================================

八、Python 語法糖


1️⃣ i += 1

等價

    i = i + 1


2️⃣ slicing

arr[:mid]

等價

    arr[0:mid]


3️⃣ append

list.append(x)

把 x 加到 list 尾端


===========================================================

九、Merge Sort 的遞迴深度

每次切半

    n → n/2 → n/4 → n/8

深度：

    log₂ n


===========================================================

十、為什麼 Merge Sort 穩定

因為

    if left[i] <= right[j]

當元素相同

    left 先加入

所以順序不變


===========================================================

十一、Merge Sort vs Quick Sort


Merge Sort

優點
    穩定
    最壞 O(n log n)

缺點
    需要額外記憶體


Quick Sort

優點
    原地排序
    快取友善

缺點
    最壞 O(n²)


===========================================================

十二、Python 內建排序


Python list.sort()

使用

    Timsort

時間複雜度

    O(n log n)


===========================================================

"""