/*
某石油事業單位以交易資料記錄各站油品銷售情形。資料表如下，有底線者為主鍵。

資料表	欄位
加油站 Station	加油站代號（station_id）、加油站名稱（station_name）、地區（area）
油品 Fuel	油品代號（fuel_id）、油品名稱（fuel_name）、牌價（unit_price）
銷售 Sale	交易編號（sale_id）、加油站代號（station_id）、油品代號（fuel_id）、交易日期（sale_date）、
公升數（liters）、實收金額（actual_amount）

外來鍵說明：Sale.station_id 參照 Station.station_id；Sale.fuel_id 參照 Fuel.fuel_id。

*/
/*
(五) 建立站別年度營收查詢介面
5 分
請建立檢視表 v_station_revenue_2026，內容為 2026 年各加油站之加油站代號、加油站名稱及實收金額合計。（5 分）

create view v_station_revenue_2026 as
select st.station_id , st.station_name , sum(sa.actual_amount) as 實收金額合計
from station st
join sale sa on st.station_id = sa.station_id
where sa.sale_date >= '2026-01-01' and sa.sale_date < '2027-01-01'
group by st.station_id , st.station_name

*/



/*
(四) 統計各區實際販售的油品種類

請列出 2026 年各地區曾實際銷售之不同油品種類數；同一油品於同一地區不論交易幾次，均只計 1 種。（5 分）

select st.area , count(distinct sa.fuel_id) as 油品種類數
from station st 
join sale sa on st.station_id = sa.station_id
where sa.sale_date between '2026-01-01' and '2026-12-31'
group by st.area

---------------------------
SELECT
    st.area,                                   -- 輸出地區
    COUNT(DISTINCT sa.fuel_id) AS 油品種類數    -- 統計該地區實際銷售過的不重複油品種類數
FROM Station st                                -- 以加油站資料表作為起點
JOIN Sale sa
    ON st.station_id = sa.station_id           -- 依站點編號連接銷售紀錄
WHERE
    sa.sale_date BETWEEN '2026-01-01' AND '2026-12-31'
                                               -- 僅保留 2026 年實際發生的銷售資料
GROUP BY
    st.area;                                   -- 依地區分組統計不同油品種類數

*/


/*
(三) 觀察各站每月營收變化

請統計 2026 年各加油站每月實收金額，
輸出加油站代號、加油站名稱、月份及每月實收金額，並依加油站代號、月份排序。（5 分）

select 
    st.station_id,
    st.station_name,
    month(sa.sale_date) as 月份,
    sum(sa.actual_amount) as 每月實收金額
from station st
join sale sa on st.station_id = sa.station_id
where sa.sale_date between '2026-01-01' and '2026-12-31'
group by st.station_id,
    st.station_name,
    month(sa.sale_date),
order by st.station_id asc , month(sa.sale_date) asc
-----------------------------------------------------
SELECT
    st.station_id,                           -- 加油站代號
    st.station_name,                         -- 加油站名稱
    MONTH(sa.sale_date) AS 月份,             -- 取出交易月份
    SUM(sa.actual_amount) AS 每月實收金額     -- 加總該站該月份的實收金額
FROM station AS st
JOIN sale AS sa
    ON st.station_id = sa.station_id         -- 連接加油站與銷售資料
WHERE sa.sale_date >= '2026-01-01'
  AND sa.sale_date <  '2027-01-01'           -- 篩選 2026 年資料
GROUP BY
    st.station_id,
    st.station_name,
    MONTH(sa.sale_date)                      -- 依「各站、各月份」分組
ORDER BY
    st.station_id ASC,
    MONTH(sa.sale_date) ASC;                 -- 先依站號，再依月份排序

*/



/*
(二) 找出折讓幅度較大的交易

每筆交易之實收比率定義為「實收金額 ÷（銷售公升數 × 油品牌價）」。
請列出 2026 年實收比率最低的前 6-10 筆交易，
輸出交易編號、油品名稱、銷售公升數、實收金額及四捨五入至小數點以下 2 位之實收比率。（5 分）

select 
    sa.sale_id , 
    f.fuel_name , 
    sa.actual_amount ,
    round(sa.actual_amount / (sa.liters * f.unit_price)  , 2 ) as 實收比率
from sale sa
join fuel f
    on f.fuel_id = sa.fuel_id
where sa.sale_date between '2026-01-01' and '2026-12-31'
order by 實收比率 asc
limit 5
offset 5
-----------------------------
SELECT
    sa.sale_id,                                           -- 交易編號
    f.fuel_name,                                         -- 油品名稱
    sa.liters,                                           -- 銷售公升數
    sa.actual_amount,                                    -- 實收金額
    ROUND(
        sa.actual_amount / (sa.liters * f.unit_price),
        2
    ) AS 實收比率                                        -- 實收 ÷ 原價金額，四捨五入至小數第 2 位
FROM sale AS sa
JOIN fuel AS f
    ON sa.fuel_id = f.fuel_id                            -- 取得該交易油品的牌價
WHERE sa.sale_date >= '2026-01-01'
  AND sa.sale_date <  '2027-01-01'                       -- 篩選 2026 年交易
ORDER BY
    sa.actual_amount / (sa.liters * f.unit_price) ASC    -- 實收比率最低者排前面
LIMIT 5 OFFSET 5;                                        -- 略過前 5 筆，取得第 6～10 筆


*/


/*
(一) 各站各油品之銷售彙總
請統計 2026 年各加油站、各油品之銷售公升數及實收金額，並依加油站代號、油品代號由小到大排序。（5 分）
select st.station_id , sa.fuel_id , sum(sa.liters) as 銷售公升數 , sum(sa.actual_amount) as 實收金額
form station st
join sale sa on st.station_id = sa.station_id
where substring(sa.sale_date , 1 ,4) = '2026'
group by st.station_id , sa.fuel_id
order by st.station_id asc , sa.fuel_id asc
--------------------------------
SELECT
    st.station_id,                         -- 輸出加油站代號
    sa.fuel_id,                            -- 輸出油品代號
    SUM(sa.liters) AS 銷售公升數,          -- 加總各站各油品的銷售公升數
    SUM(sa.actual_amount) AS 實收金額       -- 加總各站各油品的實收金額
FROM Station st                            -- 以加油站資料表作為查詢起點
JOIN Sale sa
    ON st.station_id = sa.station_id       -- 依加油站代號連接銷售資料
WHERE
    SUBSTRING(sa.sale_date, 1, 4) = '2026' -- 篩選 2026 年交易
GROUP BY
    st.station_id,
    sa.fuel_id                             -- 依加油站與油品分組
ORDER BY
    st.station_id ASC,
    sa.fuel_id ASC;                        -- 先依加油站，再依油品由小到大排序

*/