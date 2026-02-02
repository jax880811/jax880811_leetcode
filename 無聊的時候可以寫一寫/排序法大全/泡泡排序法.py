def bubble_sort(arr):
    n = len(arr)
    if n<2:
        return arr
    for i in range(n):
        for j in range(n-i-1):
            if arr[j]>arr[j+1]:
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
        print(arr)
    return arr







arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print(arr)
print(bubble_sort(arr))