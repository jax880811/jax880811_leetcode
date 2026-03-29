from typing import List

def merge( left : List, right :List) -> List:
    answer = []
    i , j = 0 , 0
    while i< len(left) and j< len(right):
        if left[i] <= right[j]:
            answer.append(left[i])
            i += 1
        elif right[j] < left[i]:
            answer.append(right[j])
            j += 1
        
    while i <len(left):
        answer.append(left[i])
        i += 1
    while j< len(right):
        answer.append(right[j])
        j += 1
    
    return answer


def mergesort(arr):
    if len(arr)<2:
        return arr
    mid = len(arr) // 2
    left = mergesort(arr[:mid])
    right = mergesort (arr[mid:])
    return merge(left,right)
    


# ------------------ 主程式區 ------------------

# 建立一個尚未排序的整數陣列
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

# 印出排序前的原始陣列
print(arr)

# 呼叫 mergesort 函式進行排序
# 並印出排序後的結果
print(mergesort(arr))