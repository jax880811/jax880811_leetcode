/*
某電力事業單位以系統記錄電表、承辦人員及異常工單。資料表如下，有底線者為主鍵。

資料表	欄位
電表 Meter	電表號碼（meter_id）、用戶名稱（customer_name）、區處（district）、裝設日期（install_date）、狀態（status）
人員 Employee	人員代號（emp_id）、人員姓名（emp_name）、區處（district）
工單 WorkOrder	工單號（order_id）、電表號碼（meter_id）、承辦人員代號（emp_id）、報修日期（report_date）、
完修日期（finish_date）、故障類別（fault_type）、狀態（status）、預估工時（estimated_hours）
外來鍵說明：WorkOrder.meter_id 參照 Meter.meter_id；WorkOrder.emp_id 參照 Employee.emp_id。
*/


/*
請統計 2026 年各區處已完修與未完修工單數，輸出區處、已完修工單數及未完修工單數。（5 分）
select m.district ,
    sum(
        case 
            when w.finish_date is not null then 1
            else 0
        ) as 完修工單數 ,
    sum(
        case 
            when w.finish_date is null then 1
            else 0
        ) as 未完修工單數
from meter m
join workorder w on m.meter_id = w.meter_id
where 
    w.report_date >= '2026-01-01' and
    w.report_date < '2027-01-01'
group by m.district 
*/


/*
請列出所有電表之電表號碼、用戶名稱及 2026 年尚未完修工單的預估工時合計；
若無尚未完修工單，預估工時合計須顯示 0。（5 分）
select m.meter_id ,
    m.customer_name ,
    coalesce(sum(w.estimated_hours) , 0) as 預估工時合計
from meter m
left join
    workorder w on m.meter_id = w.meter_id 
    and w.report_date >= '2026-01-01' 
    and w.report_date < '2027-01-01' 
    and w.finish_date is null
group by 
    m.meter_id ,
    m.customer_name

-------------------
SELECT
    m.meter_id,                              -- 輸出電表號碼
    m.customer_name,                         -- 輸出用戶名稱
    COALESCE(SUM(w.estimated_hours), 0) AS 預估工時合計
                                                -- 加總符合條件工單的預估工時
                                                -- 若沒有符合工單，將 NULL 顯示為 0
FROM Meter m
LEFT JOIN WorkOrder w
    ON m.meter_id = w.meter_id               -- 依電表號碼連接工單
   AND w.report_date >= '2026-01-01'          -- 只連接 2026 年報修的工單
   AND w.report_date < '2027-01-01'
   AND w.finish_date IS NULL                  -- 只連接尚未完修的工單
GROUP BY
    m.meter_id,                               -- 每個電表形成一組
    m.customer_name;                          -- 同時輸出用戶名稱
*/


/*
請統計 2026 年各區處「通訊異常」工單數，僅列出工單數達 3 件以上之區處，並依工單數由大到小排序。（5 分）

select m.district , count(*) as 異常工單
from meter m
join workorder w on w.meter_id = m.meter_id
where w.fault_type = '通訊異常' and 
    w.report_date >= '2026-01-01' and
    w.report_date < '2027-01-01'
group by m.district
having count(*) >= 3
order by count(*) desc


---------------------
SELECT
    m.district,                  -- 區處
    COUNT(*) AS 異常工單數       -- 統計各區處的通訊異常工單數
FROM Meter m
JOIN WorkOrder w
    ON w.meter_id = m.meter_id  -- 依電表號碼連接電表與工單
WHERE w.fault_type = '通訊異常' -- 僅保留故障類別為通訊異常的工單
  AND w.report_date >= '2026-01-01'
                                -- 包含 2026 年 1 月 1 日
  AND w.report_date < '2027-01-01'
                                -- 排除 2027 年及其後的資料
GROUP BY
    m.district                  -- 依區處分組統計
HAVING
    COUNT(*) >= 3              -- 僅保留工單數達 3 件以上的區處
ORDER BY
    COUNT(*) DESC;             -- 依工單數由大到小排序

*/

/*
請列出用戶名稱以「台」字開頭且目前狀態為「啟用」之電表號碼、用戶名稱、區處及裝設日期。（5 分）
select 
    m.meter_id , 
    m.customer_name , 
    m.district ,
    m.install_date
from meter m
where m.customer_name like '台%' and m.status ='啟用'
------------------------------------
SELECT
    m.meter_id,          -- 電表號碼
    m.customer_name,     -- 用戶名稱
    m.district,          -- 區處
    m.install_date       -- 裝設日期
FROM Meter m
WHERE m.customer_name LIKE '台%'   -- 用戶名稱以「台」字開頭
  AND m.status = '啟用';            -- 目前狀態為啟用
*/


/*
請列出 2026 年已完修之工單，輸出工單號、電表號碼、用戶名稱、承辦人員姓名、
報修日期及完修日期，並依報修日期由新到舊、同日再依工單號由小到大排序。
select w.order_id , w.meter_id , m.customer_name , e.emp_name , w.report_date , w.finish_date
from workorder w
join meter m on m.meter_id = w.meter_id
join employee e on e.emp_id = w.emp_id
where substring(w.finish_date , 1 , 4) = '2026' and w.status = '已完修'
ORDER BY w.report_date DESC, w.order_id ASC

我這一題是為了要刻意練習substring

SELECT
    w.order_id,          -- 從工單資料表輸出工單號
    w.meter_id,          -- 從工單資料表輸出電表號碼
    m.customer_name,     -- 從電表資料表輸出用戶名稱
    e.emp_name,          -- 從人員資料表輸出承辦人員姓名
    w.report_date,       -- 從工單資料表輸出報修日期
    w.finish_date        -- 從工單資料表輸出完修日期
FROM WorkOrder w         -- 以工單資料表作為主要查詢資料表
JOIN Meter m
    ON m.meter_id = w.meter_id
                         -- 依電表號碼連接工單與電表資料
JOIN Employee e
    ON e.emp_id = w.emp_id
                         -- 依承辦人員代號連接工單與人員資料
WHERE SUBSTRING(w.finish_date, 1, 4) = '2026'
                         -- 從完修日期第 1 個字元開始取 4 個字元
                         -- 篩選完修年份為 2026 年的工單
  AND w.status = '已完修'
                         -- 僅保留狀態為已完修的工單
ORDER BY
    w.report_date DESC,  -- 報修日期由新到舊排列
    w.order_id ASC;      -- 報修日期相同時，工單號由小到大排列
*/
