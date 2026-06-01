'''
某維修人員需從廠區左上角座標 (0,0) 移動到右下角座標 (m-1,n-1)。每次只能向右或向下移動一格。若某格為障礙物，不能經過。
給定二維陣列 grid，其中 0 表示可通行，1 表示障礙物。

(一) 請寫出遞迴關係式與停止條件。（5 分）
(二) 請以遞迴加記憶化方式撰寫函式 count_paths(grid)。（7 分）
(三) 請改以非遞迴動態規劃方式撰寫，並說明時間複雜度。（5 分）
'''

def dp(grid):
    # m 是列數，也就是有幾橫列
    m = len(grid)

    # n 是欄數，也就是每列有幾個格子
    n = len(grid[0])

    # 建立 m x n 的 dp 表，全部初始化為 0
    dp = []
    for i in range(m):
        dp.append([0] * n)

    # 如果起點本身是障礙物，根本無法出發
    if grid[0][0] == 1:
        return 0

    # 起點可通行，所以走到起點本身有 1 種方法
    dp[0][0] = 1

    # 逐格填表
    for row in range(m):
        for column in range(n):

            # 起點已經設定過，跳過
            if row == 0 and column == 0:
                continue

            # 如果目前格子是障礙物
            # 則到達此格的方法數為 0
            if grid[row][column] == 1:
                dp[row][column] = 0
                continue

            # 如果不是第一列，就可以從上方走下來
            if row > 0:
                dp[row][column] += dp[row - 1][column]

            # 如果不是第一欄，就可以從左方走過來
            if column > 0:
                dp[row][column] += dp[row][column - 1]

    # 回傳右下角的路徑數
    return dp[m - 1][n - 1]


Grid = [[0,0,0],[0,1,0],[0,0,0]]
print(dp(Grid))

'''
def dp(grid):
    # m 代表列數，也就是 grid 有幾橫列
    # 例如 3 x 4 的表格，m = 3
    m = len(grid)

    # n 代表欄數，也就是每一列有幾個格子
    # 例如 3 x 4 的表格，n = 4
    n = len(grid[0])

    # 建立一個二維 dp 陣列
    # dp[row][column] 代表：
    # 從左上角 (0,0) 走到目前格子 (row,column) 的路徑數
    dp = []

    # 逐列建立 dp 表
    for i in range(m):

        # 每一列都有 n 個欄位
        # 一開始全部設為 0
        dp.append([0] * n)

    # 如果起點 grid[0][0] 是障礙物
    # 題目規定 1 代表障礙物
    # 那代表一開始就不能出發，所以路徑數為 0
    if grid[0][0] == 1:
        return 0

    # 如果起點可以通行
    # 從起點走到起點本身，算 1 種方式
    dp[0][0] = 1

    # 從左到右、從上到下，逐格填表
    for row in range(m):

        # 掃描目前列中的每一欄
        for column in range(n):

            # 起點已經在前面設定成 1
            # 所以這裡直接跳過，避免被後面的公式重新處理
            if row == 0 and column == 0:
                continue

            # 如果目前格子是障礙物
            # 則不能走到這格
            # 所以路徑數固定為 0
            if grid[row][column] == 1:
                dp[row][column] = 0
                continue

            # 如果目前不是第一列
            # 代表可以從「上方格子」往下走到目前格子
            if row > 0:
                dp[row][column] += dp[row - 1][column]

            # 如果目前不是第一欄
            # 代表可以從「左方格子」往右走到目前格子
            if column > 0:
                dp[row][column] += dp[row][column - 1]

    # 最後右下角 dp[m-1][n-1]
    # 就是從左上角走到右下角的總路徑數
    return dp[m - 1][n - 1]
'''