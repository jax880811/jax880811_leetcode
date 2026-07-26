/*
某國營客運公司之電子票證系統，其關聯式資料庫包含下列 3 個資料表（table），有底線者為主鍵：

資料表	欄位
路線 (Route)	路線代號 (route_id)、路線名稱 (route_name)、起點城市 (start_city)、
迄點城市 (end_city)、全票票價 (price)
乘客 (Passenger)	票卡編號 (card_id)、姓名 (name)、票種 (card_type，值為「普通」、「學生」或「敬老」)
搭乘紀錄 (TripRecord)	交易編號 (trip_id)、票卡編號 (card_id)、路線代號 (route_id)、搭乘日期 (trip_date)、實收金額 (fare)
其中 TripRecord 之 card_id 與 route_id 分別為參考 Passenger 與 Route 之外來鍵。票價規則：學生票為全票 8 折、
敬老票為全票 5 折、普通票為全票原價。針對下列問題，請分別寫出 SQL 指令：（6 題，每題 4 分，共 24 分）
*/

/*
找出總營收高於所有路線平均總營收的路線。
SELECT
    r.route_name,
    -- 輸出路線名稱

    SUM(t.fare) AS 總營收
    -- 計算每條路線的歷史總營收

FROM Route r

JOIN TripRecord t
    ON t.route_id = r.route_id
    -- 將路線與搭乘紀錄連接

GROUP BY
    r.route_id,
    r.route_name
    -- 依每一條路線分組

HAVING SUM(t.fare) >
(
    SELECT AVG(x.total_fare)
    -- 計算所有路線總營收的平均值

    FROM
    (
        SELECT
            t2.route_id,
            SUM(t2.fare) AS total_fare
            -- 先算每條路線自己的總營收

        FROM TripRecord t2

        GROUP BY t2.route_id
        -- 每條路線形成一組
    ) x
);

*/


/*
（四）請列出「全票票價高於全部路線平均票價」之路線名稱與其全票票價，按票價由高到低排序。
select r.route_name , r.price
from route r
where r.price > (
    select avg(r2.price)
    from route r2
)
order by r.price desc


*/



/*
（三）依個資保存政策，請刪除 TripRecord 中搭乘日期在 2021 年 1 月 1 日（不含）以前之所有搭乘紀錄。NEW
delete t
from triprecord t
where t.trip_date < "2021-01-01"

*/



/*
（二）公司新闢一條路線：路線代號 'R208'、路線名稱「臺北－臺東」、起點「臺北」、迄點「臺東」、
全票票價 683 元。請寫出將此筆資料新增至 Route 資料表之 SQL 指令。NEW
insert into route(route_id , route_name , start_city , end_city , price)
values('R208' , '臺北－臺東' , '臺北' , '臺東' , 683)

*/


/*
（一）請列出所有路線之路線名稱、全票票價，並以 CASE 語法額外輸出一個欄位「票價等級」：
票價 300 元（含）以上顯示「長途」、100 元（含）至 300 元（不含）顯示「中途」、100 元（不含）以下顯示「短途」。NEW
select r.route_name,
    r.price,
    case 
        when r.price >= 300 then "長途"
        when r.price >= 100 and r.price < 300 then "中途"
        else "短途"
    end as 票價等級
from route r

*/


/*
（一）請列出所有路線之路線名稱、全票票價，並以 CASE 語法額外輸出一個欄位「票價等級」：
票價 300 元（含）以上顯示「長途」、100 元（含）至 300 元（不含）顯示「中途」、100 元（不含）以下顯示「短途」。NEW

（二）公司新闢一條路線：路線代號 'R208'、路線名稱「臺北－臺東」、起點「臺北」、迄點「臺東」、
全票票價 683 元。請寫出將此筆資料新增至 Route 資料表之 SQL 指令。NEW

（三）依個資保存政策，請刪除 TripRecord 中搭乘日期在 2021 年 1 月 1 日（不含）以前之所有搭乘紀錄。NEW

（四）請列出「全票票價高於全部路線平均票價」之路線名稱與其全票票價，按票價由高到低排序。NEW

（五）請統計路線代號 'R101' 於 2026 年之「不重複搭乘人數」（同一票卡多次搭乘僅計 1 人）與總搭乘次數。NEW

（六）請列出 2026 年每條路線、每種票種之搭乘次數與實收金額總計，
輸出欄位：路線名稱、票種、搭乘次數、實收總額，按路線名稱排序、同路線內按實收總額由大到小排序。
*/