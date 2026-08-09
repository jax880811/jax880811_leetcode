
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
        
        





# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", random_sort(arr , 0 , len(arr)-1))