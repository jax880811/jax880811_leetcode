'''
某倉庫系統有多個儲位可存放同一種料件。系統已提供下列 API，請勿考慮其內部實作。

API	說明
int getRequestQty()	取得本次入庫料件數量；若無需求，回傳 0。
int getBinCount()	取得儲位總數 N，儲位編號為 1 到 N。
int getFreeSpace(int binid)	取得指定儲位剩餘容量；若儲位停用，回傳 -1。
int reserve(int binid, int qty)	保留指定儲位容量；成功回傳 1，失敗回傳 0。
請撰寫函式 SelectBin()：取得入庫數量後，從編號小到大尋找第一個容量足夠的儲位並保留；
無需求、無儲位或保留失敗則回傳 0；成功則回傳儲位編號。

'''
def SelectBin():
    # 定義 SelectBin 函式
    # 功能：選擇第一個容量足夠的儲位，並嘗試保留該儲位容量

    value = getRequestQty()
    # 呼叫 getRequestQty() 取得本次入庫料件數量
    # 若沒有入庫需求，API 會回傳 0

    if value == 0:
        # 如果本次入庫數量為 0，代表無需求

        return 0
        # 無需求時，依題意回傳 0

    store = getBinCount()
    # 呼叫 getBinCount() 取得儲位總數 N
    # 儲位編號為 1 到 N

    for i in range(1, store + 1):
        # 從儲位編號 1 開始，依序檢查到 store
        # range(1, store + 1) 會產生 1, 2, ..., store

        check = getFreeSpace(i)
        # 呼叫 getFreeSpace(i) 取得第 i 個儲位的剩餘容量
        # 若該儲位停用，會回傳 -1

        if check == -1:
            # 如果 check == -1，代表該儲位停用

            continue
            # 跳過此儲位，繼續檢查下一個儲位

        if check >= value:
            # 如果該儲位剩餘容量大於或等於本次入庫數量
            # 代表此儲位容量足夠

            if reserve(i, value) == 1:
                # 呼叫 reserve(i, value) 嘗試保留第 i 個儲位的 value 容量
                # 若保留成功，API 回傳 1

                return i
                # 成功時依題意回傳儲位編號 i

            else:
                # 如果 reserve(i, value) 不是回傳 1
                # 代表保留失敗

                return 0
                # 保留失敗時依題意回傳 0

    return 0
    # 如果所有儲位都檢查完，仍找不到容量足夠的儲位
    # 則回傳 0
