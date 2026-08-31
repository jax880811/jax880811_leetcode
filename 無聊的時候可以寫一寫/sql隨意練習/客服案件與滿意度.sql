/*
某事業單位以客服系統受理案件，案件結案後得由客戶填寫滿意度。資料表如下，有底線者為主鍵。

資料表	欄位
客戶 Customer	客戶代號（customer_id）、客戶姓名（customer_name）、地區（region）
案件 ServiceCase	案件編號（case_id）、客戶代號（customer_id）、案件類別（case_type）、
受理日期（open_date）、結案日期（close_date）、優先等級（priority）、狀態（status）

滿意度 Satisfaction	案件編號（case_id）、分數（score）、回饋日期（feedback_date）

*/


/*
案件查詢畫面每頁顯示 10 筆，請依受理日期由新到舊、同日依案件編號由小到大排序，
列出第 2 頁（第 11 至第 20 筆）案件之案件編號、客戶代號、案件類別、受理日期及狀態。（5 分）
select t2.case_id,
    t2.customer_id,
    t2.case_type,
    t2.open_date,
    t2.status
from ServiceCase t2
order by t2.open_date desc , t2.case_id asc
limit 10 offset 10
------------------------------------
SELECT
    t2.case_id,                              -- 輸出案件編號
    t2.customer_id,                          -- 輸出客戶代號
    t2.case_type,                            -- 輸出案件類別
    t2.open_date,                            -- 輸出受理日期
    t2.status                                -- 輸出案件狀態
FROM ServiceCase t2                          -- 從案件資料表查詢
ORDER BY
    t2.open_date DESC,                       -- 先依受理日期由新到舊排序
    t2.case_id ASC                           -- 同日案件再依案件編號由小到大排序
LIMIT 10                                     -- 每頁顯示 10 筆
OFFSET 10;                                   -- 跳過前 10 筆，取得第 11～20 筆


*/


/*
請列出平均滿意度分數高於全體案件平均滿意度之客戶代號、客戶姓名及平均分數，
平均分數四捨五入至小數點以下 1 位；沒有滿意度紀錄的案件不納入計算。（5 分）
select t1.customer_id , t1.customer_name , round(avg(t3.score) , 1) as 平均分數
FROM Customer t1
join ServiceCase t2 on t1.customer_id = t2.customer_id
join Satisfaction t3 on t2.case_id = t3.case_id
group by t1.customer_id , t1.customer_name
having avg(t3.score) > (
    select avg(t3.score)
    from Satisfaction t3
)
------------------------------
SELECT
    t1.customer_id,                           -- 輸出客戶代號
    t1.customer_name,                         -- 輸出客戶姓名
    ROUND(AVG(t3.score), 1) AS 平均分數       -- 計算該客戶平均滿意度，並四捨五入至小數第 1 位
FROM Customer t1                              -- 客戶資料表
JOIN ServiceCase t2
    ON t1.customer_id = t2.customer_id        -- 依客戶代號連接案件資料
JOIN Satisfaction t3
    ON t2.case_id = t3.case_id                -- 只保留有滿意度紀錄的案件
GROUP BY
    t1.customer_id,                           -- 依客戶代號分組
    t1.customer_name                          -- 同時依客戶姓名分組
HAVING
    AVG(t3.score) > (                         -- 篩選客戶平均分數高於全體案件平均分數者
        SELECT
            AVG(s2.score)                     -- 計算所有滿意度紀錄的整體平均分數
        FROM Satisfaction s2                  -- 沒有滿意度紀錄的案件自然不會被納入
    );

*/

/*
請統計各地區高（H）、中（M）、低（L）優先等級案件數，輸出地區、高優先案件數、中優先案件數及低優先案件數。（5 分）
select t1.region , 
    sum(
        case when t2.priority = 'H'
        then 1 else 0
        end
    ) as 高優先案件數 ,
    sum(
        case when t2.priority = 'M'
        then 1 else 0
        end
    ) as 中優先案件數 ,
    sum(
        case when t2.priority = 'L'
        then 1 else 0
        end
    ) as 低優先案件數
FROM Customer t1
join ServiceCase t2 on t1.customer_id = t2.customer_id
group by t1.region



*/



/*
請列出所有客戶之客戶代號、客戶姓名及 2026 年案件數；沒有案件者須顯示 0。（5 分）
select t1.customer_id ,
    t1.customer_name ,
    count(t2.case_id) as 案件數
from Customer t1
left join ServiceCase t2 on t1.customer_id = t2.customer_id
    and year(t2.open_date) = 2026
group by t1.customer_id ,
    t1.customer_name

----------------------------------------------------
SELECT
    t1.customer_id,                            -- 輸出客戶代號
    t1.customer_name,                          -- 輸出客戶姓名
    COUNT(t2.case_id) AS 案件數                -- 統計每位客戶 2026 年的案件數
FROM Customer t1                              -- Customer 為主表，確保所有客戶都會被保留
LEFT JOIN ServiceCase t2
    ON t1.customer_id = t2.customer_id         -- 依客戶代號連接案件資料
    AND t2.open_date >= '2026-01-01'           -- 只連接 2026 年開始的案件
    AND t2.open_date < '2027-01-01'            -- 排除 2027 年及之後的案件
GROUP BY
    t1.customer_id,                            -- 依客戶代號分組
    t1.customer_name;                          -- 同時依客戶姓名分組


*/


/*
請列出 2026 年受理之案件，輸出案件編號、優先等級、受理日期及案件狀態，並依受理日期由新到舊排序。（5 分）
select t2.case_id , 
    t2.priority ,
    t2.open_date ,
    t2.status
from ServiceCase t2
where t2.open_date >= "2026-01-01" and t2.open_date < "2027-01-01"
order by t2.open_date desc
--------------------------------------------
SELECT
    t2.case_id,                           -- 輸出案件編號
    t2.priority,                          -- 輸出案件優先等級
    t2.open_date,                         -- 輸出案件受理日期
    t2.status                             -- 輸出案件目前狀態
FROM ServiceCase t2                       -- 從案件資料表查詢
WHERE
    t2.open_date >= '2026-01-01'          -- 篩選 2026 年 1 月 1 日起受理的案件
    AND t2.open_date < '2027-01-01'       -- 排除 2027 年及之後受理的案件
ORDER BY
    t2.open_date DESC;                    -- 依受理日期由新到舊排序


*/