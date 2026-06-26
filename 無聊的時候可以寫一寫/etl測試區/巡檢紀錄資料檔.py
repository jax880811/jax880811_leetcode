'''
某設備巡檢系統每日輸出文字檔 inspect.txt，每行格式如下：

巡檢單號,設備代號,區域代號,異常等級,處理分鐘數
其中巡檢單號格式為 I 加上 6 碼數字，例如 I230015；異常等級只允許 A、B、C 三種；處理分鐘數必須為 0 以上整數。資料範例如下：

I230001,PUMP01,N01,A,35
I230002,VALVE2,N01,B,20
X230003,PUMP02,S02,A,50
I230004,MOTOR1,S02,D,40
I230005,PUMP01,N01,C,abc
I230006,MOTOR2,S02,A,60
(一) 請撰寫函式 valid_record(fields) 判斷一筆資料是否合法。（7 分）
(二) 請撰寫主程式讀取檔案，只統計合法資料，就放入資料庫。（10 分）
'''

import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()
cursor.execute("""
    create table if not exists inspect(
    id text,
    device text,
    area text,
    anomaly_level text,
    processing_minutes integer
    )
    """)


from typing import List

def valid_record(fields: List[str]) -> bool:
    # 將每個欄位前後空白與換行去掉
    fields = [field.strip() for field in fields]

    # 每筆資料必須剛好有 5 個欄位
    if len(fields) != 5:
        return False

    # 取出各欄位
    record_id = fields[0]             # 巡檢單號
    device_id = fields[1]             # 設備代號，本小題未要求檢查格式
    area_id = fields[2]               # 區域代號，本小題未要求檢查格式
    anomaly_level = fields[3]         # 異常等級
    processing_minutes = fields[4]    # 處理分鐘數

    # 巡檢單號必須是 I + 6 碼數字，所以長度必須剛好為 7
    if len(record_id) != 7:
        return False

    # 巡檢單號第一碼必須是大寫 I
    if record_id[0] != "I":
        return False

    # 巡檢單號後 6 碼必須全部是數字
    if not record_id[1:].isdigit():
        return False

    # 異常等級只允許 A、B、C
    if anomaly_level not in ["A", "B", "C"]:
        return False

    # 處理分鐘數必須是 0 以上整數
    # isdigit() 會允許 "0", "35", "60"，但不允許 "abc", "-1", "3.5"
    if not processing_minutes.isdigit():
        return False

    # 通過所有檢查，代表資料合法
    return True

with open("inspect.txt" , "r" , encoding="utf-8") as f:
    for data in f:
        #fields = [field.strip() for field in data.strip().split(",")]
        line = data.strip()
        fields = line.split(",")

        clean_fields = []
        for field in fields:
            clean_field = field.strip()
            clean_fields.append(clean_field)

        fields = clean_fields
        if not valid_record(fields):
            continue
        inspect_id = fields[0]
        device_id = fields[1]
        area_id = fields[2]
        anomaly_level = fields[3]
        processing_minutes = int(fields[4])
        sql_insert =( """ 
        insert into inspect values(?,?,?,?,?)
        """)
        tuple_value = (inspect_id,device_id,area_id,anomaly_level,processing_minutes)
        cursor.execute(sql_insert,tuple_value)
conn.commit()
conn.close()


