'''
某自來水監控系統會將漏水警報區段代碼送入共用 Queue。
系統定時自 Queue 讀取一筆警報區段，並指派距離該區段最近且目前可服務的巡修隊。
巡修隊編號為 1 到 N。區段代碼為整數，距離已由系統 API 計算。你不需要知道 API 如何實作，只需正確呼叫。

函式	說明
int nextalarm()	自共用 Queue 取得下一筆警報區段代碼；若無資料，回傳 999。
int teamready(int teamid)	查詢巡修隊是否可服務；可服務回傳 1，不可服務回傳 0。
int distance(int teamid, int zoneid)	取得巡修隊至警報區段之距離；若無法計算距離，回傳 999。
assign(int teamid, int zoneid)	將指定巡修隊派往指定警報區段。
請撰寫函式 SelectTeam(N)，輸入為巡修隊總數；若 Queue 無資料，回傳 -1；
否則選擇可服務且距離最短的巡修隊，呼叫 assign 後回傳巡修隊編號；若沒有任何可服務巡修隊，回傳 0。
若距離相同，選擇編號較小者。（14 分）
'''


def SelectTeam(N):
    # 1. 讀取一筆警報區段
    zoneid = nextalarm()
    if zoneid == 999:
        return -1  # Queue 無資料，回傳 -1

    team_id = 0
    best_distance = 999

    # 2. 依序檢查編號 1 到 N 的巡修隊
    for i in range(1, N + 1):
        if teamready(i) == 1:  # 該隊伍可服務
            d = distance(i, zoneid)
            # 💡 嚴格小於：既能找到最短距離，又能鎖定編號較小者
            if d < best_distance:
                best_distance = d
                team_id = i

    # 3. 根據防守結果進行派工
    if team_id == 0:
        return 0  # 沒有任何可服務（或可計算距離）的巡修隊
    else:
        assign(team_id, zoneid)  # 呼叫指派 API
        return team_id  # 回傳巡修隊編號

'''
def SelectTeam(N):
    while True:
        zoneid = nextalarm()
        if zoneid == 999:
            return -1
        team_id = 0
        best_distance = 999
        for i in range(1,N+1):
            if teamready(i) == 1:
                d = distance(i,zoneid)
                if d<best_distance:
                    best_distance = d
                    team_id = i

        if team_id == 0:
            return 0
        else:
            assign(team_id , zoneid)
            return team_id
''' 

    