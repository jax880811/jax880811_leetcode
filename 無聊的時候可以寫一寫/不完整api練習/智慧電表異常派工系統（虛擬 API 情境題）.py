"""
某國營電力公司之智慧電表異常派工系統，當偵測到某區域之電表發生異常時，會將該區域代碼傳送至系統之共用 Queue 中。
系統定時自共用 Queue 讀取一筆待處理之區域代碼，並於「目前所在區域與該異常區域相同」且「今日有出勤」之維修人員中，
選出今日已派工件數最少者提供服務；若有多人並列，則取維修人員編號最小者。又因多個派工程式可能同時執行，於派工前須先鎖定該維修人員之派工紀錄，
鎖定失敗時應暫停後重試，派工完成後須解除鎖定。

請使用下列所有的函式，來撰寫一派工函式 DispatchWorker，輸入為維修人員總數與鎖定失敗之上限次數，
其傳回為獲派工之維修人員編號；但當共用 Queue 無待處理資料、未選出任何維修人員，或鎖定失敗超過其上限次數時，則傳回 0。
另外，當維修人員總數為 N 時，維修人員編號為 1 到 N。請註明所使用之程式語言。（20 分）

函式	說明
int gettask()	自共用 Queue 中取得下一筆待處理之異常區域代碼。其傳回為下一筆區域代碼，當無資料時，則傳回 0。
int getarea(int wid)	取得指定維修人員目前所在之區域代碼。輸入為維修人員編號，其傳回為該人員目前所在之區域代碼，
但當該人員今日未出勤時，則傳回 0。
int getload(int wid)	取得指定維修人員今日已派工之件數。輸入為維修人員編號，其傳回為已派工件數，
但當該人員今日未出勤時，則傳回 999。
int lock(int wid)	鎖定指定維修人員之派工紀錄。輸入為維修人員編號，其傳回為是否鎖定成功，當鎖定成功時，則傳回 1，當鎖定失敗時，則傳回 0。
unlock(int wid)	解鎖指定維修人員之派工紀錄。輸入為維修人員編號。
assign(int wid, int area)	將指定區域之工單派給指定維修人員。輸入為維修人員編號與區域代碼。
sleep()	執行暫停 0.1 秒。
"""

def DispatchWorker(n, max_failures):
    area = gettask()
    if area == 0:
        return 0
    best = 0
    bestload = 999
    for i in range(1,n+1):
        if getarea(i) != area:
            continue
        load = getload(i)
        if load == 999:
            continue
        if load < bestload:
            bestload = load
            best = i
    if best == 0:
        return 0
    tryCount = 0;
    while lock(best) == 0:
        tryCount += 1
        if tryCount > max_failures:
            return 0
        sleep()
    assign(best , area)
    unlock(best)
    return best

"""
# 使用程式語言：Python

def DispatchWorker(n, max_failures):
    area = gettask()  # 從共用 Queue 取得下一筆異常區域

    if area == 0:
        return 0  # Queue 無待處理資料

    best = 0  # 記錄目前最佳維修人員編號
    bestload = 999  # 記錄目前最低派工件數

    for i in range(1, n + 1):  # 維修人員編號為 1 ~ N
        if getarea(i) != area:
            continue  # 未出勤或目前不在指定區域，跳過

        load = getload(i)  # 取得今日已派工件數

        if load == 999:
            continue  # 今日未出勤，跳過

        if load < bestload:
            bestload = load
            best = i  # 更新目前最佳維修人員

    if best == 0:
        return 0  # 沒有符合條件的維修人員

    tryCount = 0  # 記錄鎖定失敗次數

    while lock(best) == 0:
        tryCount += 1  # 鎖定失敗次數加 1

        if tryCount > max_failures:
            return 0  # 鎖定失敗超過上限

        sleep()  # 暫停 0.1 秒後再嘗試

    assign(best, area)  # 將工單派給選定的維修人員
    unlock(best)  # 派工完成後解除鎖定

    return best  # 回傳獲派工之維修人員編號
"""