'''
費氏數列（Fibonacci Sequence）定義為：F(0)=0、F(1)=1，當 n≥2 時 F(n)=F(n−1)+F(n−2)，
即 0, 1, 1, 2, 3, 5, 8, 13, 21…。請回答下列問題：（3 題，共 19 分）

（一）請說明「遞迴（Recursion）」之定義與構成一個正確遞迴函式所需之兩大要素，並以費氏數列說明之。（5 分）

（二）請以遞迴方式撰寫費氏函式 fib(n)，
並說明「單純遞迴解」為何效率不佳（請以 fib(5) 之遞迴呼叫過程說明「重疊子問題」現象，
並指出其時間複雜度）。程式碼須有逐行中文註解，並註明程式語言。（8 分）

（三）請提出一種改善方法將時間複雜度降為 O(n)，撰寫改善後之程式碼並說明其原理。（6 分）
'''

def fib(n):
    if n < 2:
        return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2,n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]


n = 8
print(fib(n))

'''
第三題 dp

# 使用程式語言：Python

def fib(n):
    # 若 n 為 0 或 1，直接依費氏數列定義回傳 n
    if n < 2:
        return n

    # 建立長度為 n + 1 的動態規劃陣列
    # dp[i] 用來儲存第 i 個費氏數 fib(i)
    dp = [0] * (n + 1)

    # fib(0) 已因陣列初始化而等於 0
    # 設定 fib(1) = 1
    dp[1] = 1

    # 從 fib(2) 開始，依序計算到 fib(n)
    for i in range(2, n + 1):
        # 根據費氏數列定義：
        # fib(i) = fib(i - 1) + fib(i - 2)
        dp[i] = dp[i - 1] + dp[i - 2]

    # 回傳第 n 個費氏數
    return dp[n]


# 設定欲計算的費氏數列索引
n = 8

# 呼叫 fib(8) 並輸出結果 21
print(fib(n))
'''

'''
第二題
# 使用程式語言：Python

def fib(n):
    # 若 n 等於 0，依費氏數列定義回傳 0
    # 此處為遞迴終止條件之一
    if n == 0:
        return 0

    # 若 n 等於 1，依費氏數列定義回傳 1
    # 此處為遞迴終止條件之二
    if n == 1:
        return 1

    # 當 n 大於或等於 2 時，
    # 根據 F(n) = F(n - 1) + F(n - 2)
    # 遞迴計算前兩項並將其相加
    return fib(n - 1) + fib(n - 2)


# 設定欲計算的費氏數列索引為 8
n = 8

# 呼叫 fib(8)，並輸出結果 21
print(fib(n))
'''

'''
第三題第一種方法
# 使用程式語言：Python

def fib(n, memo):
    # 費氏數列的基本情況
    if n <= 1:
        return n

    # 若先前已計算過 fib(n)，直接回傳儲存結果
    if n in memo:
        return memo[n]

    # 計算結果並存入備忘錄，避免日後重複計算
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)

    # 回傳 fib(n)
    return memo[n]


memo = {}
print(fib(8, memo))
'''

'''
第三題在變形
# 使用程式語言：Python

# 建立備忘錄，儲存已經計算過的費氏數列結果
memo = {}

# 先放入費氏數列的基本情況
# fib(0) = 0
memo[0] = 0

# fib(1) = 1
memo[1] = 1

def fib(n):
    # 若 fib(n) 已經存在於備忘錄中，
    # 表示先前已經算過，直接回傳即可
    if n in memo:
        return memo[n]

    # 若 fib(n) 尚未計算過，
    # 依費氏數列定義遞迴計算 fib(n-1) 與 fib(n-2)
    # 並將結果存入備忘錄，避免日後重複計算
    memo[n] = fib(n - 1) + fib(n - 2)

    # 回傳 fib(n) 的結果
    return memo[n]

# 設定欲計算的索引值
n = 8

# 呼叫 fib(n) 並輸出結果
print(fib(n))
'''