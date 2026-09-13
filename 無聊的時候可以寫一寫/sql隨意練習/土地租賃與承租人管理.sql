/*
某公營事業管理土地租賃業務。資料表如下，有底線者為主鍵。

資料表	欄位
土地 LandParcel	土地代號 (parcel_id)、土地名稱 (parcel_name)、地區 (district)、土地類型 (land_type)、
面積平方公尺 (area_m2)、土地狀態 (parcel_status)
承租人 Tenant	承租人代號 (tenant_id)、承租人名稱 (tenant_name)、承租人類型 (tenant_type)、信用評等 (credit_grade)
租約 LeaseContract	租約代號 (lease_id)、土地代號 (parcel_id)、承租人代號 (tenant_id)、開始日 (start_date)、
結束日 (end_date，可為 NULL)、月租金 (monthly_rent)、租約狀態 (lease_status)
*/

/*
列出從未租給「法人」之土地代號與土地名稱；完全沒有租約的土地亦應列出。
select t1.parcel_id , t1.parcel_name
from LandParcel t1
where not exists (
    select 1
    from LeaseContract t3
    join Tenant t2 on t2.tenant_id = t3.tenant_id
    where t2.tenant_type = '法人' and t1.parcel_id = t3.parcel_id
)
------------------------

SELECT
    t1.parcel_id,                                  -- 輸出土地代號
    t1.parcel_name                                 -- 輸出土地名稱
FROM LandParcel t1                                 -- 從土地資料表逐筆檢查
WHERE NOT EXISTS (
    SELECT 1                                       -- 只需判斷是否存在符合條件的紀錄
    FROM LeaseContract t3                          -- 查詢該土地的歷來租約
    JOIN Tenant t2
        ON t3.tenant_id = t2.tenant_id             -- 取得租約所對應的承租人
    WHERE
        t3.parcel_id = t1.parcel_id                -- 限定為目前這一塊土地
        AND t2.tenant_type = '法人'                 -- 檢查是否曾經租給法人
);



*/


/*
將土地類型為「農業」、租約狀態為「生效」之月租金調高 3%，四捨五入至整數。
update LeaseContract t3
join LandParcel t1 on t1.parcel_id = t3.parcel_id
set t3.monthly_rent = round((t3.monthly_rent * 1.03) , 0)
where t1.land_type = '農業' and t3.lease_status = '生效'
---------------

UPDATE LeaseContract t3                              -- 指定要更新租約資料表
JOIN LandParcel t1
    ON t1.parcel_id = t3.parcel_id                  -- 依土地代號連接土地資料

SET
    t3.monthly_rent = ROUND(
        t3.monthly_rent * 1.03,                     -- 原月租金提高 3%
        0                                           -- 四捨五入至整數
    )

WHERE
    t1.land_type = '農業'                           -- 僅更新土地類型為農業的租約
    AND t3.lease_status = '生效';                   -- 且租約狀態必須為生效

*/




/*
列出歷來曾承租至少 2 種不同土地類型之承租人名稱及土地類型數。

select t2.tenant_name , count(distinct t1.land_type) as 土地類型數
from Tenant t2
join LeaseContract t3 on t3.tenant_id = t2.tenant_id
join LandParcel t1 on t1.parcel_id = t3.parcel_id
group by t2.tenant_name
having count(distinct t1.land_type) >= 2

----------------------------------------

SELECT
    t2.tenant_name,                                      -- 輸出承租人名稱
    COUNT(DISTINCT t1.land_type) AS 土地類型數           -- 統計該承租人歷來承租過的不同土地類型數
FROM Tenant t2                                           -- 承租人資料表

JOIN LeaseContract t3
    ON t3.tenant_id = t2.tenant_id                       -- 連接承租人與其歷來租約

JOIN LandParcel t1
    ON t1.parcel_id = t3.parcel_id                       -- 連接租約所對應的土地資料

GROUP BY
    t2.tenant_id,                                        -- 依承租人代號分組
    t2.tenant_name                                       -- 同時保留承租人名稱

HAVING
    COUNT(DISTINCT t1.land_type) >= 2;                   -- 僅保留至少承租過 2 種不同土地類型者

*/


/*
依土地類型統計歷來租約之平均月租金，四捨五入至整數，按平均月租金由大到小排序，並只輸出排序後第 2 至第 3 筆。
select t1.land_type,
    round(avg(t3.monthly_rent) , 0) as 平均月租金
from LandParcel t1
join LeaseContract t3 on t1.parcel_id = t3.parcel_id
group by t1.land_type
order by 平均月租金 desc
offset 1
fetch 2  -- 或者是limit 2 offset 1
--------------------------
SELECT
    t1.land_type,                                       -- 輸出土地類型
    ROUND(AVG(t3.monthly_rent), 0) AS 平均月租金       -- 計算平均月租金並四捨五入至整數
FROM LandParcel t1                                      -- 土地資料表
JOIN LeaseContract t3
    ON t1.parcel_id = t3.parcel_id                      -- 依土地代號連接歷來租約
GROUP BY
    t1.land_type                                        -- 依土地類型分組
ORDER BY
    平均月租金 DESC                                     -- 先完成排序
OFFSET 1 ROW                                            -- 跳過排序後第 1 筆
FETCH NEXT 2 ROWS ONLY;                                 -- 再取第 2、3 筆

*/

/*
列出所有狀態為「可出租」之土地名稱及其 2026-08-01 有效承租人；當日無有效租約者顯示「目前空置」。不得因日期條件而刪除空置土地。
select t1.parcel_name ,
    t3.tenant_id ,
    case when count(t3.lease_id) > 0 then count(t3.lease_id)
        else "目前空置"
        end 
from LandParcel t1
left join LeaseContract t3 on t1.parcel_id = t3.parcel_id
    and t3.lease_status = '生效'
    and t3.start_date <= '2026-08-01'
    and (t3.end_date is null or t3.end_date >= '2026-08-01')


-----------------------------------

SELECT
    t1.parcel_name,                                  -- 輸出土地名稱
    COALESCE(t3.tenant_id, '目前空置') AS 有效承租人   -- 有有效租約則顯示承租人代號，否則顯示目前空置
FROM LandParcel t1                                   -- 以土地資料表為主表

LEFT JOIN LeaseContract t3
    ON t1.parcel_id = t3.parcel_id                   -- 依土地代號連接租約
    AND t3.lease_status = '生效'                     -- 僅連接生效租約
    AND t3.start_date <= '2026-08-01'                -- 開始日不得晚於基準日
    AND (
        t3.end_date IS NULL                          -- 結束日為 NULL，代表尚未結束
        OR t3.end_date >= '2026-08-01'               -- 或結束日不得早於基準日
    )

WHERE
    t1.parcel_status = '可出租';                     -- 僅列出狀態為可出租的土地
*/

/*
列出於 2026-08-01 有效之租約代號及月租金。有效租約須同時符合狀態為「生效」， 開始日不晚於基準日，
且結束日為 NULL 或不早於基準日。

select t3.lease_id , t3.monthly_rent
from LeaseContract t3
where t3.lease_status = '生效'
    and t3.start_date <= '2026-08-01'
    and (t3.end_date is null or t3.end_date >= '2026-08-01')
--------------------------------------

SELECT
    t3.lease_id,                              -- 輸出租約代號
    t3.monthly_rent                           -- 輸出租約的月租金
FROM LeaseContract t3                         -- 從租約資料表查詢
WHERE
    t3.lease_status = '生效'                 -- 租約狀態必須為「生效」
    AND t3.start_date <= '2026-08-01'         -- 租約開始日不得晚於基準日
    AND (
        t3.end_date IS NULL                   -- 結束日為 NULL，表示尚未設定結束日
        OR t3.end_date >= '2026-08-01'        -- 或結束日不得早於基準日
    );

*/