def selection_sort(arr : list[int]) -> list:
    # 【安全檢查】：如果陣列長度小於 2，代表已經排好或沒東西排，直接回傳
    if len(arr) < 2:
        return arr
    
    # 取得陣列的總長度
    length = len(arr)
    
    # 【外層迴圈】：控制「掃描的次數」以及「目前要填入最小數的位置 i」
    for i in range(length):
        # 假設目前掃描範圍的最左邊位置 i 就是最小值的索引 (Index)
        min_index = i
        
        # 【內層迴圈】：從位置 i 往後搜尋到最後，尋找是否有更小的數
        # range(i, length, 1) 表示從 i 開始，到 length-1 結束，每次跳 1 步
        for j in range(i, length, 1):
            # 如果發現位置 j 的數值比目前記錄的最小值還要小
            if arr[j] < arr[min_index]:
                # 更新最小值的索引為 j
                min_index = j
        
        # 【交換邏輯】：如果找到的最小索引 min_index 不是原本假設的 i
        if min_index != i:
            # 將位置 i 的數與找到的最小數進行「原地交換」
            arr[i], arr[min_index] = arr[min_index], arr[i]
        
        # 每一輪交換完後列印出目前陣列狀態，觀察排序進度
        print(arr)
        
    # 所有迴圈結束，回傳排序完成的陣列
    return arr

# --- 測試程式碼 ---
arr = [8, 42, 15, 77, 3, 91, 56, 24, 68, 30]
print("原始陣列：", arr)
print("排序結果：", selection_sort(arr))