/*
某國營石油公司之加油站銷售管理系統，其關聯式資料庫（Relational Database）包含下列 3 個資料表（table），有底線者為主鍵：

資料表	欄位
加油站 (Station)	站點代號 (station_id)、站名 (station_name)、縣市 (city)、經營型態 (type，值為「直營」或「加盟」)
油品 (Product)	油品代號 (product_id)、油品名稱 (product_name)、每公升單價 (unit_price)
銷售紀錄 (SaleRecord)	交易編號 (sale_id)、站點代號 (station_id)、油品代號 (product_id)、
        銷售日期 (sale_date)、公升數 (liters)、交易金額 (amount)
其中 SaleRecord 之 station_id 與 product_id 分別為參考 Station 與 Product 之外來鍵（Foreign Key）。
針對下列問題，請分別寫出 SQL 指令：（6 題，每題 4 分，共 24 分）
*/

/*
（六）請列出 2026 年總銷售金額超過 8,000,000 元的加油站站名與其總銷售金額，
並按總銷售金額由大到小排序。
select st.station_name , sum(sr.amount) as 總銷售金額
from station st
join salerecord sr on sr.station_id = st.station_id
where sr.sale_date >= '2026-01-01' and sr.sale_date < '2027-01-01'
group by st.station_name
having sum(sr.amount) > 8000000
order by 總銷售金額 desc

*/




/*
（五）請建立一個名為 v_station_sales 之檢視表（VIEW），
內容為每個加油站的站名與其歷史總銷售金額；若該站從未有銷售紀錄，
其總金額欄位須顯示 0，不可顯示 NULL。NEW

create view v_station_sales as
select st.station_name , coalesce(sum(sr.amount) , 0) as 歷史總銷售金額
from station st
left join salerecord sr on st.station_id = sr.station_id
group by st.station_name

*/



/*
（四）因應國際油價調整，請將油品名稱為「95無鉛汽油」之每公升單價調漲 1.3 元。NEW
update product p
set p.unit_price = p.unit_price + 1.3
where p.product_name = '95無鉛汽油'


*/




/*
（三）請統計 2026 年「每個月份」的總銷售金額，輸出欄位：月份、總銷售金額，並按月份由小到大排序。NEW
select month(sr.sale_date) as 月份,
    sum(sr.amount) as 總銷售金額
form salerecord sr
where year(sr.sale_date) = 2026
group by 月份
order by 總銷售金額 asc

*/



/*
（二）請列出每一種油品於 2026 年之「最高單筆交易金額」、「最低單筆交易金額」與「平均單筆交易金額」（
平均值四捨五入至小數點以下第 1 位），輸出欄位：油品名稱、最高金額、最低金額、平均金額。
select p.product_id , max(sr.amount) as 最高金額 , min(sr.amount) as 最低金額 , round(avg(sr.amount) , 1) as 平均金額
from product p
join salerecord sr on p.product_id = sr.product_id
where sr.sale_date >= '2026-01-01' and sr.sale_date < '2027-01-01'
group by p.product_id


*/


/*
（一）部分新設站點尚未開始營業。請列出「至今從未有任何一筆銷售紀錄」的加油站之站點代號與站名。NEW
select t1.station_id , t1.station_name
from 加油站 t1
left join 銷售紀錄 t3 on t1.station_id = t3.station_id
where t3.sale_id is null

select t1.station_id , t1.station_name
from 加油站 t1
where not exists(
    select 1
    from 銷售紀錄 t3
    where t3.station_id = t1.station_id
)
*/





/*
（一）部分新設站點尚未開始營業。請列出「至今從未有任何一筆銷售紀錄」的加油站之站點代號與站名。NEW

（二）請列出每一種油品於 2026 年之「最高單筆交易金額」、「最低單筆交易金額」與「平均單筆交易金額」（平均值四捨五入至小數點以下第 1 位），輸出欄位：油品名稱、最高金額、最低金額、平均金額。

（三）請統計 2026 年「每個月份」的總銷售金額，輸出欄位：月份、總銷售金額，並按月份由小到大排序。NEW

（四）因應國際油價調整，請將油品名稱為「95無鉛汽油」之每公升單價調漲 1.3 元。NEW

（五）請建立一個名為 v_station_sales 之檢視表（VIEW），內容為每個加油站的站名與其歷史總銷售金額；若該站從未有銷售紀錄，其總金額欄位須顯示 0，不可顯示 NULL。NEW

（六）請列出 2026 年總銷售金額超過 8,000,000 元的加油站站名與其總銷售金額，並按總銷售金額由大到小排序。
*/