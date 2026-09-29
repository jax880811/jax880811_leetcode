/*
某國營石油公司之加油站油品銷售管理系統，其關聯式資料庫（MySQL）包含下列 3 個資料表，有底線者為主鍵：

資料表	欄位
加油站 (Station)	站別代號 (st_id)、站別名稱 (st_name)、所在縣市 (city)、營業型態 (st_type，值為「直營」或「加盟」)
油品 (Product)	油品代號 (p_id)、油品名稱 (p_name)、油品類別 (p_type，值為「汽油」、「柴油」或「潤滑油」)、每公升單價 (unit_price)
銷售紀錄 (Sales)	交易編號 (s_id)、站別代號 (st_id)、油品代號 (p_id)、銷售日期 (s_date)、銷售公升數 (liters)、付款方式 (pay_type，
值為「現金」、「信用卡」或「油卡」)
其中 Sales 之 st_id 與 p_id 分別為參考 Station 與 Product 之外來鍵。銷售金額須以「銷售公升數 × 每公升單價」計算。
針對下列問題，請分別寫出 SQL 指令：（6 題，每題 4 分，共 24 分）
（一）請列出全部油品之油品名稱與其 2026 年之總銷售公升數，包含 2026 年完全沒有銷售紀錄之油品（其總銷售公升數顯示為 0），
並按總銷售公升數由大到小排序。
（二）請統計各加油站於 2026 年之「現金」、「信用卡」、「油卡」三種付款方式之交易筆數，每個加油站僅輸出一列，
輸出欄位：站別名稱、現金筆數、信用卡筆數、油卡筆數。
（三）請列出各油品類別之總銷售金額，以及該類別佔全公司總銷售金額之百分比（四捨五入至小數點後 1 位，欄位名稱 pct），按百分比由大到小排序。
（四）請列出「最近一次銷售日期距今日已超過 90 天」之加油站，輸出欄位：站別代號、最近銷售日期、
距今天數（欄位名稱 days_idle），按距今天數由大到小排序。
（五）因油價調整，請將油品單價依類別調整：「汽油」調升 3%、「柴油」調升 2%、「潤滑油」不調整。
請以一道 UPDATE 指令完成，調整後之單價四捨五入至小數點後 1 位。
（六）銷售報表採分頁顯示，每頁 20 筆。請列出 2026 年銷售金額最高之交易紀錄，
按銷售金額由大到小排序，並取出第 3 頁之資料。
*/

/*
（六）加油站銷售報表採分頁顯示，每頁 20 筆。請列出 2026 年銷售金額最高之交易紀錄，
按銷售金額由大到小排序，並取出第 3 頁之資料。
SELECT
    t3.s_id,                                      -- 輸出交易編號
    t1.st_name,                                   -- 輸出站別名稱
    t2.p_name,                                    -- 輸出油品名稱
    t3.liters,                                    -- 輸出本筆交易銷售公升數
    t3.liters * t2.unit_price AS 銷售金額         -- 計算本筆交易的銷售金額
FROM Station t1                                   -- 加油站資料表
join Sales t3 on t1.st_id = t3.st_id
join product t2 on t3.p_id = t2.p_id
where t3.s_date between '2026-01-01' and '2026-12-31'
order by 銷售金額 desc
limit 20 offset 40



*/


/*
五）因油價調整，請將油品單價依類別調整：「汽油」調升 3%、「柴油」調升 2%、「潤滑油」不調整。
請以一道 UPDATE 指令完成，調整後之單價四捨五入至小數點後 1 位。
update Product t2
set t2.unit_price = round(case when t2.p_type = '汽油' then t2.unit_price * 1.03
             when t2.p_type = '柴油' then t2.unit_price * 1.02
             else t2.unit_price * 1.00 end , 1)
--------------------------

UPDATE Product t2                                      -- 更新 Product 油品資料表
SET
    t2.unit_price = ROUND(                             -- 將計算後的新單價四捨五入至小數第 1 位
        CASE
            WHEN t2.p_type = '汽油'
                THEN t2.unit_price * 1.03              -- 汽油調升 3%

            WHEN t2.p_type = '柴油'
                THEN t2.unit_price * 1.02              -- 柴油調升 2%

            ELSE
                t2.unit_price                          -- 潤滑油及其他類型維持原價
        END,
        1                                              -- 四捨五入至小數點後 1 位
    );

*/


/*
（四）請列出「最近一次銷售日期距今日已超過 90 天」之加油站名稱。
select t1.name,
    max(t3.s_date) as 最近銷售日期
from station t1
JOIN Sales t3
    ON t1.st_id = t3.st_id
group by t1.name
having max(t3.s_date) < current_date - interval '90' day

-----------------------------------------
SELECT
    t1.st_name,                                  -- 輸出站別名稱
    MAX(t3.s_date) AS 最近銷售日期               -- 找出各站最近一次銷售日期
FROM Station t1

JOIN Sales t3
    ON t1.st_id = t3.st_id                       -- 連接各加油站的銷售紀錄

GROUP BY
    t1.st_id,
    t1.st_name                                   -- 依加油站分組

HAVING
    MAX(t3.s_date) < CURRENT_DATE - INTERVAL '90' DAY;  -- 最近銷售日早於 90 天前


*/

/*
（三）請列出各油品類別之總銷售金額，以及該類別佔全公司總銷售金額之百分比（四捨五入至小數點後 1 位，欄位名稱 pct），按百分比由大到小排序。
select t2.p_type , 
    sum(t3.liters * t2.unit_price) as 總銷售金額,
    round(SUM(t3.liters * t2.unit_price) / (
        select sum(s.liters * p.unit_price)
        from product p
        join sales s on p.p_id = s.p_id
    ) * 100 , 1) as pct
from product t2
join sales t3 on t3.p_id = t2.p_id
group by t2.p_type
order by pct desc

----------------------

SELECT
    t2.p_type,                                                     -- 輸出油品類別

    SUM(t3.liters * t2.unit_price) AS 總銷售金額,                  -- 計算該類別所有交易的總銷售金額

    ROUND(
        SUM(t3.liters * t2.unit_price)
        /
        (
            SELECT
                SUM(s.liters * p.unit_price)                       -- 計算全公司所有交易的總銷售金額
            FROM Sales s
            JOIN Product p
                ON s.p_id = p.p_id                                 -- 取得每筆交易對應的油品單價
        )
        * 100,
        1                                                          -- 百分比四捨五入至小數第 1 位
    ) AS pct

FROM Product t2

JOIN Sales t3
    ON t2.p_id = t3.p_id                                           -- 連接油品與銷售紀錄

GROUP BY
    t2.p_type                                                      -- 依油品類別分組

ORDER BY
    pct DESC;                                                      -- 依百分比由大到小排序
*/

/*
（二）請統計各加油站於 2026 年之「現金」、「信用卡」、「油卡」三種付款方式之交易筆數，每個加油站僅輸出一列，
輸出欄位：站別名稱、現金筆數、信用卡筆數、油卡筆數。
select t1.st_name , 
    sum(case when t3.pay_type = '現金' then 1 else 0) as 現金筆數,
    sum(case when t3.pay_type = '信用卡' then 1 else 0) as 信用卡筆數,
    sum(case when t3.pay_type = '油卡' then 1 else 0) as 油卡筆數
from station t1
join sales t3 on t1.st_id = t3.st_id
where substring(t3.s_date , 1 , 4) = '2026'
group by t1.st_name
------------------------------
SELECT
    t1.st_name,                                                   -- 輸出站別名稱

    SUM(
        CASE
            WHEN t3.pay_type = '現金' THEN 1                      -- 若付款方式為現金，計 1
            ELSE 0                                                -- 否則計 0
        END
    ) AS 現金筆數,                                                -- 統計現金交易筆數

    SUM(
        CASE
            WHEN t3.pay_type = '信用卡' THEN 1                    -- 若付款方式為信用卡，計 1
            ELSE 0                                                -- 否則計 0
        END
    ) AS 信用卡筆數,                                              -- 統計信用卡交易筆數

    SUM(
        CASE
            WHEN t3.pay_type = '油卡' THEN 1                      -- 若付款方式為油卡，計 1
            ELSE 0                                                -- 否則計 0
        END
    ) AS 油卡筆數                                                 -- 統計油卡交易筆數

FROM Station t1                                                   -- 以加油站資料表為主表

LEFT JOIN Sales t3
    ON t1.st_id = t3.st_id                                        -- 依站別代號連接銷售紀錄
    AND t3.s_date >= '2026-01-01'                                 -- 只連接 2026 年起的銷售紀錄
    AND t3.s_date < '2027-01-01'                                  -- 排除 2027 年以後的紀錄

GROUP BY
    t1.st_id,                                                     -- 依站別代號分組
    t1.st_name;                                                   -- 同時保留站別名稱

*/

/*
（一）請列出全部油品之油品名稱與其 2026 年之總銷售公升數，包含 2026 年完全沒有銷售紀錄之油品（其總銷售公升數顯示為 0），
並按總銷售公升數由大到小排序。
select t2.p_name , sum(t3.liters) as 總銷售公升數
from product t2
left join sales t3 on t2.p_id = t3.p_id and t3.s_date between '2026-01-01' and '2026-12-31'
group by t2.p_name
order by 總銷售公升數 desc

----------------------------------

SELECT
    t2.p_name,                                              -- 輸出油品名稱
    COALESCE(SUM(t3.liters), 0) AS 總銷售公升數             -- 加總 2026 年銷售公升數；若完全無紀錄則顯示 0
FROM Product t2                                             -- 以油品資料表為主表，確保所有油品都能保留

LEFT JOIN Sales t3
    ON t2.p_id = t3.p_id                                    -- 依油品代號連接銷售紀錄
    AND t3.s_date >= '2026-01-01'                           -- 只連接 2026 年起的銷售紀錄
    AND t3.s_date < '2027-01-01'                            -- 排除 2027 年以後的紀錄

GROUP BY
    t2.p_id,                                                -- 依油品代號分組
    t2.p_name                                               -- 同時保留油品名稱

ORDER BY
    總銷售公升數 DESC;                                      -- 依總銷售公升數由大到小排序
*/