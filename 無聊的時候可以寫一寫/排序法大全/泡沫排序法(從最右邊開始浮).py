def is_inverse(isAsc , x , y):
    if isAsc:
        return x < y
    else:
        return x > y



def bubble_sort(arr):

    if len(arr) < 2:
        return arr
    isAsc = False
    index = len(arr)-1
    for i in range(index):
        for j in range(index , 0 , -1):
            if is_inverse(isAsc , arr[j-1] , arr[j]):
                arr[j] , arr[j-1] = arr[j-1] , arr[j]
        print(arr)


    return arr


# 建立一個尚未排序的整數陣列
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

# 印出排序前的原始陣列
print(arr)

# 呼叫 bubble_sort 函式進行排序
# 並印出排序後的結果
print(bubble_sort(arr))