def bubble_sort(arr):
    
    if len(arr) < 2:
        return arr
        
    index = len(arr) - 1
    
    for i in range(index):
        for j in range(index, i, -1):
            if arr[j] < arr[j-1]:
                arr[j], arr[j-1] = arr[j-1], arr[j]
                
    
    return arr


# 建立一個尚未排序的整數陣列
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]

# 印出排序前的原始陣列
print(arr)

# 呼叫 bubble_sort 函式進行排序
# 並印出排序後的結果
print(bubble_sort(arr))

'''
def bubble_sort(arr):
    # 1. 邊界條件防守：如果陣列是空的，或者只有 1 個元素，那它天生就是排好的，直接原封不動回傳
    if len(arr) < 2:
        return arr
        
    # 2. 計算陣列最後一個元素的索引（Index）位置
    # 假設陣列長度是 10，最後一格的索引就是 9
    index = len(arr) - 1
    
    # 3. 【外層迴圈】：控制總共要跑幾輪，同時 i 也代表「左邊已經排好序的數字個數」
    # i 會從 0 慢慢遞增到 index - 1
    for i in range(index):
        
        # 4. 【內層迴圈】：指針 j 從陣列最尾巴（index）開始，一路「倒退嚕」（-1）往左邊比回來
        # 💡 終點設在 i：因為前幾輪已經有 i 個「最小的數字」穩穩坐在最左邊了（0 到 i-1 都是正確答案）
        # 所以 j 只要一路上比到 i 就可以準時收工，後面不需要再進去打擾已經排好的老大哥們
        for j in range(index, i, -1):
            
            # 5. 【兩兩對決】：如果右邊的數字（arr[j]）比左邊的數字（arr[j-1]）還要小
            if arr[j] < arr[j-1]:
                # 神奇氣泡交換：把小的數字往前（左）挪
                arr[j], arr[j-1] = arr[j-1], arr[j]
                
    # 6. 當外層迴圈全部跑完，代表所有的泡泡都已經定位，回傳排序完成的陣列
    return arr
'''