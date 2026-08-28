/*
某國營事業以採購案為履約與驗收單位，驗收合格後始辦理付款。資料表如下，有底線者為主鍵。

資料表	欄位
供應商 Supplier	供應商代號（supplier_id）、供應商名稱（supplier_name）、城市（city）

採購案 PurchaseOrder	採購案號（purchase_id）、供應商代號（supplier_id）、簽約日期（sign_date）、
採購金額（purchase_amount）、驗收日期（accepted_date）、驗收狀態（accepted_status）

付款 Payment	付款編號（payment_id）、採購案號（purchase_id）、付款日期（payment_date）、
付款金額（payment_amount）、付款狀態（status）
*/

/*
已存在待付款清單 PendingPayment(purchase_id, supplier_id, due_amount, created_date)。
請將所有「驗收合格且尚無付款紀錄」之採購案寫入該清單，created_date 填入今日日期。（5 分）

insert into PendingPayment(purchase_id, supplier_id, due_amount, created_date)
select t2.purchase_id as purchase_id ,
    t2.supplier_id as supplier_id ,
    sum(t2.purchase_amount) as due_amount ,
    curdate()
from PurchaseOrder t2
where t2.accepted_status = '合格'
    and not exists (
    select 1
    from payment t3
    where t2.purchase_id = t3.purchase_id
)
group by t2.purchase_id , t2.supplier_id
-------------------------------
INSERT INTO PendingPayment (
    purchase_id,                         -- 採購案號
    supplier_id,                         -- 供應商代號
    due_amount,                          -- 待付款金額
    created_date                         -- 清單建立日期
)
SELECT
    t2.purchase_id,                      -- 寫入採購案號
    t2.supplier_id,                      -- 寫入供應商代號
    t2.purchase_amount,                  -- 採購金額作為待付款金額
    CURRENT_DATE                         -- 取得資料庫系統的當日日期
FROM PurchaseOrder t2                    -- 從採購案資料表取得資料
WHERE
    t2.accepted_status = '合格'          -- 僅處理驗收合格的採購案
    AND NOT EXISTS (
        SELECT 1                         -- 僅判斷付款紀錄是否存在
        FROM Payment t3
        WHERE t3.purchase_id = t2.purchase_id
                                           -- 檢查此採購案是否已有付款紀錄
    );



*/

/*
(四) 找出同年度承攬多案的供應商
請列出 2026 年簽訂採購案數達 2 件以上之供應商代號、供應商名稱及採購案數，並依採購案數由大到小排序。（5 分）
select t1.supplier_id ,
    t1.supplier_name ,
    count(*) as 採購案數
from supplier t1
join purchaseorder t2 on t1.supplier_id = t2.supplier_id
where t2.sign_date between '2026-01-01' and '2026-12-31'
group by t1.supplier_id ,
    t1.supplier_name 
having count(*) > 2
order by 採購案數 desc
------------------------------------
SELECT
    t1.supplier_id,                         -- 輸出供應商代號
    t1.supplier_name,                       -- 輸出供應商名稱
    COUNT(*) AS 採購案數                    -- 統計該供應商 2026 年簽訂的採購案數
FROM Supplier t1                            -- 供應商主檔
JOIN PurchaseOrder t2
    ON t1.supplier_id = t2.supplier_id      -- 依供應商代號連接採購案
WHERE
    t2.sign_date BETWEEN '2026-01-01' AND '2026-12-31'
                                             -- 僅保留 2026 年簽訂的採購案
GROUP BY
    t1.supplier_id,                         -- 依供應商代號分組
    t1.supplier_name                        -- 同時依供應商名稱分組
HAVING
    COUNT(*) >= 2                           -- 僅保留採購案數達 2 件以上的供應商
ORDER BY
    採購案數 DESC;                          -- 依採購案數由大到小排序

*/


/*
(三) 取得各供應商最近一次驗收合格日期
請列出曾有驗收合格紀錄之供應商代號、供應商名稱及最近一次驗收合格日期。（5 分）
select t1.supplier_id ,
    t1.supplier_name ,
    max(t2.accepted_date) as 最近一次驗收合格
from supplier t1
join purchaseorder t2 on t1.supplier_id = t2.supplier_id
where t2.accepted_status = '合格'
group by t1.supplier_id ,
    t1.supplier_name 
-------------------------------------
SELECT
    t1.supplier_id,                          -- 輸出供應商代號
    t1.supplier_name,                        -- 輸出供應商名稱
    MAX(t2.accepted_date) AS 最近一次驗收合格日期
                                              -- 找出每位供應商最晚的一筆驗收合格日期
FROM Supplier t1                              -- 供應商主檔
JOIN PurchaseOrder t2
    ON t1.supplier_id = t2.supplier_id        -- 依供應商代號連接該供應商的採購案
WHERE
    t2.accepted_status = '合格'               -- 只保留驗收狀態為合格的採購案
GROUP BY
    t1.supplier_id,                           -- 依供應商代號分組
    t1.supplier_name;                         -- 同時依供應商名稱分組

*/