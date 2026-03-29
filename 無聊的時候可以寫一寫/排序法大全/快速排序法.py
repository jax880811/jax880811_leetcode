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