from typing import List

def heapify(arr , n , index):
    left = 2 * index + 1
    right = 2 * index + 2
    largest = index
    if left<n and arr[largest] < arr[left]:
        largest = left
    if right<n and arr[largest] < arr[right]:
        largest = right
    if largest != index:
        arr[index] , arr[largest] = arr[largest] , arr[index]
        heapify(arr , n , largest)
    return arr




def heapsort(arr) -> List[int]:
    if len(arr)<2:
        return arr
    n = len(arr)
    for i in range(n//2 - 1,-1,-1):
        heapify(arr , n , i)
    for j in range(n-1 ,0 ,-1):
        arr[0] , arr[j] = arr[j] , arr[0]
        heapify(arr ,j , 0)
    return arr








data = [12, 11, 13, 5, 6, 7, 3, 20, 1]


print(heapsort(data))
