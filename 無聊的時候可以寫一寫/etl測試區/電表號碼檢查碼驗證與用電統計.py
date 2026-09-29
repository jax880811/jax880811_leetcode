'''
（一）該公司電表號碼共 7 碼數字，其中第 7 碼為檢查碼，其計算規則為：
將前 6 碼由左至右依序乘以權重 1、3、1、3、1、3，將所有乘積相加後，取總和除以 10 之餘數作為檢查碼。
請撰寫一函式 check_meter(meter_no)，以檢查電表號碼之正確性，正確時傳回 1，不正確時傳回 0。（7 分）
（二）請撰寫一函式 main()，逐筆讀取上述抄表資料，並呼叫第（一）小題之函式篩選出電表號碼正確之紀錄，
最後列出各區處之有效紀錄筆數與電費合計金額，並另外列出電表號碼不正確之筆數。（7 分）
'''
def check_meter(meter_no: str):
    if not (meter_no.isdigit()):
        return 0
    if len(meter_no) != 7 :
        return 0
    answer = 0
    index = 0
    while index < 6:
        if index%2 == 0:
            answer += int(meter_no[index])
        else:
            answer += int(meter_no[index])*3
        index += 1
    print(answer)
    if answer % 10 != int(meter_no[6]):
        return 0
    else:
        return 1

meter_no = '9876540'
print(check_meter(meter_no))

error = 0
area = {}
with open("meter.txt" , "r" , encoding="utf-8") as f:
    for data in f:
        raw_data = data.strip().split()
        if len(raw_data) != 4:
            continue
        meter_no = raw_data[0]
        area_id = raw_data[1]
        usage = raw_data[2]
        fee = int(raw_data[3])
        if "" in [meter_no , area_id , usage , fee]:
            continue
        if check_meter(meter_no) == 1:
            if area_id in area:
                area[area_id][0] += 1
                area[area_id][1] += fee
            else:
                area[area_id] = [1,fee]
        else:
            error += 1
            continue
for area_id in area:
    print(area_id, area[area_id][0], area[area_id][1])

print("電表號碼不正確筆數：", error)
'''
meter_no（電表號碼）	area_id（區處代號）	usage（本期用電度數）	fee（本期電費）
1234567	A01	320	1280
2468013	A01	580	2610
9876540	B02	150	525
1111116	B02	900	4950
3579134	A01	410	1845
555555	C03	200	700
8642091	C03	760	3800
'''
'''
error = 0
area = {}

with open("meter.txt", "r", encoding="utf-8") as f:
    for data in f:
        raw_data = data.strip().split()

        # 每筆資料必須具有 4 個欄位
        if len(raw_data) != 4:
            continue

        meter_no = raw_data[0]
        area_id = raw_data[1]
        usage = raw_data[2]
        fee = int(raw_data[3])

        # 檢查電表號碼
        if check_meter(meter_no) == 1:
            if area_id in area:
                area[area_id][0] += 1       # 有效紀錄筆數 +1
                area[area_id][1] += fee     # 累加電費
            else:
                area[area_id] = [1, fee]    # 第一筆有效紀錄
        else:
            error += 1

# 輸出各區處統計
for area_id in area:
    print(area_id, area[area_id][0], area[area_id][1])

# 輸出錯誤電表號碼筆數
print("電表號碼不正確筆數：", error)
'''