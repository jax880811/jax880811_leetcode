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

