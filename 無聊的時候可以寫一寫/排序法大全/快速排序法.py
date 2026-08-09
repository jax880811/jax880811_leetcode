from typing import List

def quick_sort(arr : List , start , end) -> List:
    if start >= end:
        return arr
    pivot = start
    left = start+1
    right = end
    while left <= right:
        while left <= end and arr[left] <= arr[pivot]:
            left += 1
        while right > start and arr[right] > arr[pivot]:
            right -= 1
        if left < right:
            temp = arr[right]
            arr[right] = arr[left]
            arr[left] = temp
    if arr[right] < arr[pivot]:
        arr[right] , arr[pivot] = arr[pivot] , arr[right]
    quick_sort(arr , start , right-1)
    quick_sort(arr , right+1 , end ) 
    return arr

    
# 建立一個尚未排序的整數陣列
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

# 印出排序前的原始陣列
print(arr)


# 印出排序後的結果
print(quick_sort(arr , 0 , len(arr)-1))

'''
def quick_sort(arr: list[int], start, end) -> list:

    # 如果目前區間只剩 0 個或 1 個元素，
    # 代表這一段已經不需要排序
    if start >= end:
        return arr

    # 選擇目前區間第一個元素作為 pivot（樞紐值）
    pivot = start

    # left 從 pivot 右邊第一個元素開始往右找
    left = start + 1

    # right 從目前區間最後一個元素開始往左找
    right = end

    # 只要左右指標還沒有交錯，就持續進行分割
    while left <= right:

        # left 往右移動，
        # 尋找第一個「大於 pivot」的元素
        while left <= end and arr[left] <= arr[pivot]:
            left += 1

        # right 往左移動，
        # 尋找第一個「小於或等於 pivot」的元素
        # right > start 是為了避免跑到 pivot 左邊
        while right > start and arr[right] > arr[pivot]:
            right -= 1

        # 如果左右指標尚未交錯，
        # 表示左邊找到一個太大的元素，
        # 右邊找到一個太小的元素，
        # 因此將兩者交換
        if left < right:
            arr[left], arr[right] = arr[right], arr[left]

    # 左右指標交錯後，
    # right 所在位置就是 pivot 最後應放的位置
    arr[pivot], arr[right] = arr[right], arr[pivot]

    # 遞迴排序 pivot 左半部
    quick_sort(arr, start, right - 1)

    # 遞迴排序 pivot 右半部
    quick_sort(arr, right + 1, end)

    # 回傳排序完成的陣列
    return arr
'''