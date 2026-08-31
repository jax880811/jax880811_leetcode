/*
某能源事業單位針對不同用戶類型提供節能方案。資料表如下，有底線者為主鍵。

資料表	欄位
用戶 Customer	用戶代號 (cust_id)、用戶名稱 (cust_name)、地區 (district)、用戶類型 (customer_type)、用戶狀態 (cust_status)
節能方案 EnergyPlan	方案代號 (plan_id)、方案名稱 (plan_name)、適用類型 (target_type)、補助額 (subsidy_amount)、
容量上限 (capacity_limit)
申請 Participation	用戶代號 (cust_id)、方案代號 (plan_id)、申請容量 (applied_capacity)、
審查狀態 (approval_status)、效益等級 (benefit_level，可為 NULL)
*/
/*
依啟用用戶所在地區，分欄統計核准、待審與駁回申請數。
select t1.district,
    sum (case when t3.approval_status = '核准' then 1 else 0 end) as 核准申請數,
    sum (case when t3.approval_status = '待審' then 1 else 0 end) as 待審申請數,
    sum (case when t3.approval_status = '駁回' then 1 else 0 end) as 駁回申請數
from Customer t1
join Participation t3 on t1.cust_id = t3.cust_id 
where t1.cust_status = '啟用'
group by t1.district

*/
/*
列出「任一核准申請容量至少 50」或「任一核准申請效益等級為高」的用戶代號與名稱；同時符合兩條件者只顯示一次。
select t1.cust_id , t1.cust_name
from Customer t1
join Participation t3 on t1.cust_id = t3.cust_id 
where t3.approval_status = '核准' and t3.applied_capacity >= 50

union

select t1.cust_id , t1.cust_name
from Customer t1
join Participation t3 on t1.cust_id = t3.cust_id 
where t3.approval_status = '核准' and t3.benefit_level = '高'


*/



/*
列出每一方案之方案名稱及核准用戶數；無任何核准申請的方案仍須列出 0，且同一用戶不得重複計數。
select t2.plan_name , count(distinct t3.cust_id) as 核准用戶數
from EnergyPlan t2
left join Participation t3 on t2.plan_id = t3.plan_id and t3.approval_status = '核准'
group by t2.plan_name
---------------------
SELECT
    t2.plan_name,                                  -- 輸出方案名稱
    COUNT(DISTINCT t3.cust_id) AS 核准用戶數       -- 統計不重複的核准用戶數
FROM EnergyPlan t2                                 -- 以方案資料表為主，確保所有方案都會列出
LEFT JOIN Participation t3
    ON t2.plan_id = t3.plan_id                     -- 依方案代號連接申請資料
    AND t3.approval_status = '核准'                -- 只連接核准的申請紀錄
GROUP BY
    t2.plan_id,                                    -- 依方案代號分組，避免同名方案被合併
    t2.plan_name;                                  -- 同時輸出方案名稱
*/



/*
列出「適用於該啟用用戶、但該用戶尚未提出申請」的用戶代號。
select t1.cust_id 
from Customer t1
cross join EnergyPlan t2
where t1.cust_status = '啟用'
    and t1.customer_type = t2.target_type
    and not exists(
    select 1
    from Participation t3
    where t3.cust_id = t1.cust_id and t1.plan_id = t2.plan_id
    )

--------------------
SELECT DISTINCT
    t1.cust_id                                -- 輸出符合條件的用戶代號
FROM Customer t1                              -- 用戶資料表
CROSS JOIN EnergyPlan t2                      -- 產生用戶與方案的所有可能組合
LEFT JOIN Participation t3
    ON t3.cust_id = t1.cust_id                -- 比對同一用戶
    AND t3.plan_id = t2.plan_id               -- 比對同一方案
WHERE
    t1.cust_status = '啟用'                   -- 僅保留啟用用戶
    AND t2.target_type IN (
        t1.customer_type,                     -- 方案適用於該用戶類型
        '全部'                                -- 或適用於所有用戶
    )
    AND t3.cust_id IS NULL;                   -- 找不到申請紀錄，代表尚未申請
--------------------------------------------------------
SELECT DISTINCT
    t1.cust_id                                -- 輸出符合條件的用戶代號
FROM Customer t1                              -- 用戶資料表
CROSS JOIN EnergyPlan t2                      -- 先形成每位用戶與各方案的可能組合
WHERE
    t1.cust_status = '啟用'                   -- 僅考慮啟用中的用戶
    AND t2.target_type IN (
        t1.customer_type,                     -- 方案適用於該用戶類型
        '全部'                                -- 或方案適用於所有用戶
    )
    AND NOT EXISTS (
        SELECT 1
        FROM Participation t3
        WHERE
            t3.cust_id = t1.cust_id           -- 同一用戶
            AND t3.plan_id = t2.plan_id       -- 同一方案
    );

*/

/*
列出所有啟用用戶與其適用方案的可能組合，包括用戶代號、用戶類型、方案代號及適用類型。
select t1.cust_id , t1.customer_type , t2.plan_id , t2.target_type
from Customer t1
cross join EnergyPlan t2
where t1.cust_status = '啟用'
-------------------------------
SELECT
    t1.cust_id,                              -- 輸出用戶代號
    t1.customer_type,                        -- 輸出用戶類型
    t2.plan_id,                              -- 輸出方案代號
    t2.target_type                           -- 輸出方案適用類型
FROM Customer t1                             -- 用戶資料表
CROSS JOIN EnergyPlan t2                     -- 每位用戶與每個方案形成所有可能組合
WHERE
    t1.cust_status = '啟用';                 -- 僅保留啟用中的用戶

*/

/*
列出所有啟用用戶已核准、且方案適用類型為「該用戶類型或全部」的用戶名稱；適用類型判斷須使用 IN。
select t1.cust_name
from customet t1
join Participation t3 on t1.cust_id = t3.cust_id
join EnergyPlan t2 on t2.plan_id = t3.plan_id
where t3.approval_status = '已核准' and t1.cust_status = '啟用' and t2.target_type in (t1.customer_type , 全部)
------------------------------------------------
SELECT
    t1.cust_name                               -- 輸出用戶名稱
FROM Customer t1                              -- 用戶資料表
JOIN Participation t3
    ON t1.cust_id = t3.cust_id                -- 依用戶代號連接申請資料
JOIN EnergyPlan t2
    ON t2.plan_id = t3.plan_id                -- 依方案代號連接節能方案
WHERE
    t1.cust_status = '啟用'                   -- 僅保留啟用中的用戶
    AND t3.approval_status = '已核准'          -- 僅保留已核准的申請
    AND t2.target_type IN (
        t1.customer_type,                      -- 方案適用類型等於該用戶本身的類型
        '全部'                                 -- 或方案適用於全部用戶類型
    );

*/