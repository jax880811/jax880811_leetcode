"""
某發電廠記錄連續 n 日之每日淨損益（正數表示盈餘、負數表示虧損），以整數陣列 profit[0..n−1] 表示（1 ≤ n ≤ 106）。請找出「連續若干日（至少一日）」之淨損益總和的最大值。

例如 profit = {−2, 3, −1, 4, −5, 2} 時，連續之最大總和為 6（第 2 日至第 4 日：3 + (−1) + 4 = 6）。

請回答下列問題，並註明所使用之程式語言：（3 題，共 16 分）

（一）請以最直觀之方式撰寫函式 maxSumBrute(int profit[], int n)，回傳上述最大總和，並說明其時間複雜度。（5 分）

（二）承上，請改寫為時間複雜度為 O(n) 之函式 maxSum(int profit[], int n)，並說明其設計原理。（8 分）

（三）承（二），若需同時回傳最大總和之起始日與結束日索引，請說明程式應如何修改。（3 分）
"""

def maxSumBrute(profit : list,  n : int):
    if n == 1:
        return profit[0]
    answer = -1000001
    temp = -1000001
    for p in profit:
        temp += p
        if p > temp:
            temp = p
        answer = max(answer , temp)
    return answer

def maxSumBrute2(profit : list,  n : int):
    if n == 1:
        return 0
    check = -1000001
    temp = -1000001
    low_answer = 0
    high_answer = 0
    left = 0
    right = 0
    for i in range(n):
        temp += profit[i]
        right += 1
        if profit[i] > temp:
            temp = profit[i]
            left = right = i
        if temp > check:
            low_answer = left
            high_answer = right
            check = temp
    return (low_answer , high_answer)


profit = [ -2, 3, -1, 4, -5, 2]
n = len(profit)
print(maxSumBrute(profit , n))
print(maxSumBrute2(profit , n))

"""
def maxSum(profit: list[int], n: int):
    temp = profit[0]  # 目前「一定以目前位置結尾」的最大連續總和
    answer = profit[0]  # 整體找到的最大連續總和

    for i in range(1, n):
        temp = max(profit[i], temp + profit[i])
        # 選擇：
        # 1. 從 profit[i] 重新開始
        # 2. 接在前面的連續區間後面

        answer = max(answer, temp)  # 更新整體最大值

    return answer

    
def maxSumWithIndex(profit: list[int], n: int):
    temp = profit[0]  # 目前連續區間總和
    answer = profit[0]  # 全域最大總和

    current_start = 0  # 目前區間的起點
    best_start = 0  # 最佳區間起點
    best_end = 0  # 最佳區間終點

    for i in range(1, n):
        if profit[i] > temp + profit[i]:
            temp = profit[i]  # 前面會造成拖累，從目前位置重新開始
            current_start = i  # 更新目前區間起點
        else:
            temp += profit[i]  # 繼續延伸原本區間

        if temp > answer:
            answer = temp  # 更新最大總和
            best_start = current_start  # 記錄最佳起點
            best_end = i  # 記錄最佳終點

    return answer, best_start, best_end
最標準的觀念是：

當決定「從目前 i 重新開始」時，就設定 current_start = i；當 temp 創下新的最大值時，再把 current_start 與目前的 i 存成最佳起訖索引。
"""