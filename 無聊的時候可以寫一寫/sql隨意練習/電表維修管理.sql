/*
某公用事業單位建置電表維修管理系統，資料庫包含下列四個資料表，有底線者為主鍵。日期欄位均為 DATE 型別，以下 SQL 以 MySQL 8.0 語法作答。

資料表	欄位	說明
District	DistrictID, DistrictName	區處主檔
Meter	MeterID, CustomerName, DistrictID, IsActive	電表主檔；DistrictID 參照 District
Employee	EmpID, EmpName, DistrictID	員工主檔；DistrictID 參照 District
WorkOrder	OrderID, MeterID, EmpID, FaultType, ReportDate, FinishDate, EstimatedHours	
工單；FinishDate 為 NULL 表示尚未完修

列出 2026 年已完修工單之工單編號、電表號碼、用戶名稱、承辦員工姓名及完修日期，
先依完修日期由新到舊，再依工單編號由小到大排序。（4 分）
列出所有電表之電表號碼、用戶名稱及 2026 年尚未完修工單的預估工時合計；即使沒有符合工單也必須列出，合計顯示 0。（5 分）
統計每一區處 2026 年已完修與尚未完修工單數；沒有任何 2026 年工單的區處亦須列出，兩種數量均顯示 0。（5 分）
列出 2026 年未承辦任何工單的員工代號、員工姓名及所屬區處名稱。（5 分）
列出 2026 年「通訊異常」工單數至少 2 筆的區處名稱、不重複故障電表數與工單數，依工單數由大到小排序。（5 分）
*/

/*
列出 2026 年「通訊異常」工單數至少 2 筆的區處名稱、不重複故障電表數與工單數，依工單數由大到小排序。（5 分）
select d.districtname , count(distinct w.meterid) as 故障電表數 , count(w.orderid) as 工單數
from district d
JOIN Meter m
    ON m.DistrictID = d.DistrictID
JOIN WorkOrder w
    ON w.MeterID = m.MeterID
where w.ReportDate BETWEEN '2026-01-01' AND '2026-12-31' and w.faulttype = '通訊異常'
group by d.districtname
having count(w.orderid) >= 2
order by 工單數 desc

--------------------------------------
SELECT
    d.DistrictName,                           -- 輸出區處名稱
    COUNT(DISTINCT w.MeterID) AS 不重複故障電表數,
                                               -- 計算各區處不重複發生通訊異常的電表數
    COUNT(w.OrderID) AS 工單數                 -- 計算各區處符合條件的工單總數
FROM District d                               -- 以區處主檔作為起點
JOIN Meter m
    ON m.DistrictID = d.DistrictID            -- 依 DistrictID 連接區處與電表
JOIN WorkOrder w
    ON w.MeterID = m.MeterID                  -- 依 MeterID 連接電表與工單
WHERE
    w.ReportDate BETWEEN '2026-01-01' AND '2026-12-31'
                                               -- 僅保留 2026 年報修的工單
    AND w.FaultType = '通訊異常'              -- 僅保留故障類型為通訊異常的工單
GROUP BY
    d.DistrictName                            -- 依區處名稱分組統計
HAVING
    COUNT(w.OrderID) >= 2                     -- 僅保留工單數至少 2 筆的區處
ORDER BY
    工單數 DESC;                              -- 依工單數由大到小排序
*/



/*
列出 2026 年未承辦任何工單的員工代號、員工姓名及所屬區處名稱。（5 分）
select e.empid , e.empname , d.districtname
from employee e
join district d on d.districtid = e.districtid
left join workorder w on e.empid = w.empid
    and w.reportdate between '2026-01-01' and '2026-12-31'
where w.orderid is null
----------------------------
select e.empid , e.empname , d.districtname
from employee e
join district d on d.districtid = e.districtid
where not exists(
    select 1
    from workorder w
    where w.empid = e.empid and w.reportdate between '2026-01-01' and '2026-12-31'
)
------------------------------
SELECT
    e.EmpID,                                  -- 員工代號
    e.EmpName,                                -- 員工姓名
    d.DistrictName                            -- 所屬區處名稱
FROM Employee e                               -- 查詢所有員工
JOIN District d
    ON d.DistrictID = e.DistrictID            -- 取得所屬區處名稱
WHERE e.EmpID NOT IN (
    SELECT
        w.EmpID                               -- 找出有承辦 2026 年工單的員工
    FROM WorkOrder w
    WHERE w.ReportDate
          BETWEEN '2026-01-01' AND '2026-12-31'
                                              -- 只考慮 2026 年工單
      AND w.EmpID IS NOT NULL                 -- 避免 NOT IN 遇到 NULL 陷阱
);
------------------------------
SELECT
    e.EmpID,                                  -- 員工代號
    e.EmpName,                                -- 員工姓名
    d.DistrictName                            -- 所屬區處名稱
FROM Employee e
JOIN District d
    ON d.DistrictID = e.DistrictID            -- 取得員工所屬區處
LEFT JOIN WorkOrder w
    ON w.EmpID = e.EmpID                      -- 嘗試連接員工承辦的工單
   AND w.ReportDate
       BETWEEN '2026-01-01' AND '2026-12-31'  -- 只連接 2026 年工單
WHERE w.OrderID IS NULL;                      -- 找不到工單的員工就是未承辦者
-----------------------------------------
SELECT
    e.EmpID,                                  -- 員工代號
    e.EmpName,                                -- 員工姓名
    d.DistrictName                            -- 所屬區處名稱
FROM Employee e
JOIN District d
    ON d.DistrictID = e.DistrictID            -- 取得所屬區處名稱
WHERE NOT EXISTS (
    SELECT
        1                                     -- 只判斷是否存在符合資料
    FROM WorkOrder w
    WHERE w.EmpID = e.EmpID                   -- 對應目前這一位員工
      AND w.ReportDate
          BETWEEN '2026-01-01' AND '2026-12-31'
                                              -- 若存在 2026 年工單則排除
);

*/



/*
統計每一區處 2026 年已完修與尚未完修工單數；沒有任何 2026 年工單的區處亦須列出，兩種數量均顯示 0。（5 分）
select d.districtid , 
    sum(
        case when w.finishdate is not null 
        then 1
        else 0
        end
    ) as 已完工單數 ,
    sum(
        case when w.finishdate is null and w.orderid is not null 
        then 1
        else 0
        end
    ) as 未完工單數 
    

from district d
left join employee e on e.districtid = d.districtid
left join workorder w on w.empid = e.empid
    and w.reportdate between '2026-01-01' and '2026-12-31'
group by d.districtid
--------------------------------------------------------------
SELECT
    d.DistrictID,
    SUM(
        CASE
            WHEN w.OrderID IS NOT NULL
             AND w.FinishDate IS NOT NULL
            THEN 1
            ELSE 0
        END
    ) AS 已完工單數,
    SUM(
        CASE
            WHEN w.OrderID IS NOT NULL
             AND w.FinishDate IS NULL
            THEN 1
            ELSE 0
        END
    ) AS 未完工單數
FROM District d
LEFT JOIN Meter m
    ON m.DistrictID = d.DistrictID
LEFT JOIN WorkOrder w
    ON w.MeterID = m.MeterID
   AND w.ReportDate BETWEEN '2026-01-01' AND '2026-12-31'
GROUP BY
    d.DistrictID;


*/


/*
列出所有電表之電表號碼、用戶名稱及 2026 年尚未完修工單的預估工時合計；即使沒有符合工單也必須列出，合計顯示 0。（5 分）
select m.meterid , m.customername , coalesce(SUM(w.EstimatedHours) , 0) as 尚未完修工單
from
    meter m
left join
    workorder w on w.meterid = m.meterid and
    year(w.reportdate) = 2026 and
    finishdate is null
group by  m.meterid , m.customername

----------------------------------------
SELECT
    m.MeterID,                                  -- 電表號碼
    m.CustomerName,                             -- 用戶名稱
    COALESCE(SUM(w.EstimatedHours), 0)
        AS 預估工時合計                          -- 加總預估工時；無符合工單則顯示 0
FROM Meter m
LEFT JOIN WorkOrder w
    ON w.MeterID = m.MeterID                    -- 依電表號碼連接工單
   AND YEAR(w.ReportDate) = 2026                 -- 僅連接 2026 年報修的工單
   AND w.FinishDate IS NULL                     -- 僅連接尚未完修的工單
GROUP BY
    m.MeterID,
    m.CustomerName;

*/


/*
列出 2026 年已完修工單之工單編號、電表號碼、用戶名稱、承辦員工姓名及完修日期，
先依完修日期由新到舊，再依工單編號由小到大排序。（4 分）
select w.orderid , m.meterid , m.customername , e.empname ,w.finishdate
from
    workorder w
join
    meter m on m.meterid = w.meterid
join
    employee e on e.empid = w.empid
where
    substring(w.finishdate , 1 , 4) = '2026'
order by w.finishdate desc , w.orderid asc
------------------------------------------------

SELECT
    w.OrderID,          -- 工單編號
    m.MeterID,          -- 電表號碼
    m.CustomerName,     -- 用戶名稱
    e.EmpName,          -- 承辦員工姓名
    w.FinishDate        -- 完修日期
FROM WorkOrder w
JOIN Meter m
    ON m.MeterID = w.MeterID
                        -- 工單的 MeterID 連接電表主檔的 MeterID
JOIN Employee e
    ON e.EmpID = w.EmpID
                        -- 工單的 EmpID 連接員工主檔的 EmpID
WHERE
    SUBSTRING(w.FinishDate, 1, 4) = '2026'
                        -- 取完修日期前 4 個字元，篩選 2026 年完修工單
ORDER BY
    w.FinishDate DESC,  -- 完修日期由新到舊
    w.OrderID ASC;      -- 同一完修日期再依工單編號由小到大

*/