'''
某水質檢驗中心有多個採樣站同時送驗，
同一檢驗類別需取得連續批號，且每一類別的最小批號為 1。
系統已提供下列函式；你不需要了解其內部實作，只需正確呼叫。

函式	說明
int acquire(int typeid)	鎖定指定檢驗類別的批號變數。成功回傳 1，失敗回傳 0。
release(int typeid)	解除指定檢驗類別的批號變數鎖定。
int readno(int typeid)	讀取指定檢驗類別目前批號變數值。
writeno(int typeid, int value)	設定指定檢驗類別的批號變數值。
pause()	暫停 0.1 秒。
請撰寫函式 GetBatchNo(typeid, maxfail)，輸入為檢驗類別代碼與鎖定失敗上限次數；
成功時傳回該類別下一個批號，並將批號變數加 1；若鎖定失敗次數超過上限，回傳 0。需使用上述所有函式。（14 分）
'''
def GetBatchNo(typeid, maxfail) -> int:
    fail = 0
    while fail <= maxfail:
        if acquire(typeid) == 1:
            current = readno(typeid)
            writeno(typeid , current+1)
            release(typeid)
            return current
        else:
            fail += 1
            pause()
    return 0

'''
def GetBatchNo(typeid, maxfail) -> int:
    # fail 用來記錄目前鎖定失敗次數
    fail = 0

    # 持續嘗試取得鎖
    while True:

        # 嘗試鎖定指定檢驗類別的批號變數
        # 成功回傳 1，失敗回傳 0
        if acquire(typeid) == 1:

            # 鎖定成功後，讀取目前批號
            current = readno(typeid)

            # 將批號變數加 1
            # 例如目前是 5，回傳 5，但內部更新為 6
            writeno(typeid, current + 1)

            # 完成讀寫後，解除鎖定
            release(typeid)

            # 回傳本次取得的批號
            return current

        # 如果 acquire 失敗
        fail += 1

        # 若鎖定失敗次數已經超過上限
        # 則回傳 0 表示取號失敗
        if fail > maxfail:
            return 0

        # 尚未超過失敗上限，暫停 0.1 秒後再嘗試
        pause()
'''
