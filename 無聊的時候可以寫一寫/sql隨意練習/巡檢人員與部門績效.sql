/*
第三組　巡檢人員與部門績效
5 題，共 25 分
資料表	欄位
部門 Department	部門代號（dept_id）、部門名稱（dept_name）
人員 Employee	人員代號（emp_id）、人員姓名（emp_name）、部門代號（dept_id）、主管代號（supervisor_id）
巡檢 Inspection	巡檢編號（inspect_id）、人員代號（emp_id）、巡檢日期（inspect_date）、
區域代碼（area_code）、結果（result）、成績（score）
外來鍵說明：Employee.dept_id 參照 Department.dept_id；Employee.supervisor_id 
參照 Employee.emp_id；Inspection.emp_id 參照 Employee.emp_id。
*/

/*
請列出 2026 年平均巡檢成績高於全體巡檢平均成績之部門代號、
部門名稱及平均成績，平均成績四捨五入至小數點以下 1 位。（5 分）
SELECT
    d.dept_id,                                  -- 輸出部門代號
    d.dept_name,                                -- 輸出部門名稱
    ROUND(AVG(i.score), 1) AS 平均成績           -- 計算部門平均巡檢成績，四捨五入至小數點後 1 位
FROM Department d                               -- 以部門資料表作為起點
JOIN Employee e
    ON e.dept_id = d.dept_id                    -- 依部門代號連接該部門所屬人員
JOIN Inspection i
    ON i.emp_id = e.emp_id                      -- 依人員代號連接巡檢紀錄
WHERE
    i.inspect_date BETWEEN '2026-01-01' AND '2026-12-31'
                                                  -- 外層只統計 2026 年巡檢紀錄
GROUP BY
    d.dept_id,
    d.dept_name                                 -- 依部門分組，計算各部門平均成績
HAVING
    AVG(i.score) > (
        SELECT
            AVG(i2.score)                       -- 計算 2026 年全體巡檢紀錄的平均成績
        FROM Inspection i2
        WHERE
            i2.inspect_date BETWEEN '2026-01-01' AND '2026-12-31'
                                                  -- 子查詢同樣只計算 2026 年資料
    );


*/
/*
(五) 找出平均成績高於全體的部門
5 分
請列出平均巡檢成績高於全體巡檢平均成績之人員代號及平均成績，平均成績四捨五入至小數點以下 1 位。（5 分）
select e.emp_id , round(avg(i.score) , 1) as 平均成績
from employee e
join inspection i on e.emp_id = i.emp_id
group by  e.emp_id
having avg(i.score) >
    (
        select avg(t.score)
        from (
            select e2.emp_id , i2.score
            from employee e2
            join inspection i2 on e2.emp_id = i2.emp_id
            group by e.emp_id
        ) t
    )
------------------------------
SELECT
    e.emp_id,                              -- 輸出人員代號
    ROUND(AVG(i.score), 1) AS 平均成績     -- 計算每位人員平均巡檢成績，四捨五入至小數點後 1 位
FROM Employee e                            -- 以人員資料表作為主要資料表
JOIN Inspection i
    ON e.emp_id = i.emp_id                 -- 依人員代號連接該人員的巡檢紀錄
GROUP BY
    e.emp_id                               -- 將每位人員的巡檢紀錄分成一組
HAVING
    AVG(i.score) > (
        SELECT
            AVG(i2.score)                  -- 計算所有巡檢紀錄的整體平均成績
        FROM Inspection i2
    );                                     -- 僅留下個人平均高於全體平均的人員

*/

/*
(四) 統計各部門曾巡檢的區域數
5 分
請統計各部門曾巡檢之不同區域數，輸出部門代號、部門名稱及區域數。（5 分）
SELECT
    d.dept_id,                              -- 輸出部門代號
    d.dept_name,                            -- 輸出部門名稱
    COUNT(DISTINCT i.area_code) AS 區域數   -- 統計該部門曾巡檢過的不重複區域數
FROM Department d                           -- 以部門資料表作為起點
JOIN Employee e
    ON e.dept_id = d.dept_id                -- 依部門代號連接該部門所屬人員
JOIN Inspection i
    ON i.emp_id = e.emp_id                  -- 依人員代號連接該人員的巡檢紀錄
GROUP BY
    d.dept_id,                              -- 依部門代號分組
    d.dept_name;                            -- 同時依部門名稱分組


*/


/*
(三) 找出全年未留下巡檢紀錄的人員
請列出 2026 年未執行任何巡檢之人員代號。（5 分）
SELECT
    e.emp_id                          -- 人員代號
FROM Employee e
LEFT JOIN Inspection i
    ON e.emp_id = i.emp_id            -- 先依人員代號連接
   AND i.inspect_date >= '2026-01-01' -- 只匹配 2026 年的巡檢
   AND i.inspect_date <  '2027-01-01'
WHERE i.inspect_id IS NULL;           -- 2026 年完全找不到巡檢紀錄

--------------------------------------
SELECT
    e.emp_id                          -- 人員代號
FROM Employee e
WHERE NOT EXISTS (
    SELECT 1
    FROM Inspection i
    WHERE i.emp_id = e.emp_id         -- 同一位人員
      AND i.inspect_date >= '2026-01-01'
      AND i.inspect_date <  '2027-01-01' -- 限定 2026 年
);

*/



/*
(二) 找出曾發生不合格紀錄的人員
5 分
請列出曾有巡檢成績低於 60 分之人員代號及姓名；同一人不論有幾筆不合格紀錄，均只輸出一次。（5 分）
select e.emp_id , e.emp_name
from employee e
where exists (
select 1
from inspection i
where i.score < 60 and i.emp_id = e.emp_id
)

---------------------
SELECT DISTINCT
e.emp_id,                         -- 輸出人員代號，DISTINCT 可避免同一人重複出現
e.emp_name                        -- 輸出人員姓名
FROM Employee e                       -- 以人員資料表作為主要查詢資料表
JOIN Inspection i
ON e.emp_id = i.emp_id            -- 依人員代號連接該人員的巡檢紀錄
WHERE
i.score < 60;                     -- 僅保留巡檢成績低於 60 分的不合格紀錄
----------------------------
SELECT
e.emp_id,                         -- 輸出人員代號
e.emp_name                        -- 輸出人員姓名
FROM Employee e                       -- 逐一檢查每位人員
WHERE EXISTS (
SELECT
1                             -- 只判斷符合條件的巡檢紀錄是否存在
FROM Inspection i
WHERE
i.emp_id = e.emp_id           -- 巡檢紀錄必須屬於目前這位人員
AND i.score < 60              -- 至少存在一筆低於 60 分的紀錄
);
-----------------------
select distinct e.emp_id , e.emp_name 
from employee e 
join inspection i on e.emp_id = i.emp_id 
where i.score < 60

*/

/*
(一) 顯示人員及其直屬主管
5 分
請列出所有人員之人員代號、人員姓名、所屬部門代號及直屬主管姓名；未設直屬主管者仍須列出，主管姓名顯示 NULL。（5 分）
select e.emp_id , e.emp_name , e.dept_id , e2.emp_name
from employee e
left join employee e2 on e.supervisor_id = e2.emp_id
-----------------
SELECT
e.emp_id,                         -- 人員代號
e.emp_name,                       -- 人員姓名
e.dept_id,                        -- 所屬部門代號
e2.emp_name AS supervisor_name    -- 直屬主管姓名；沒有主管時為 NULL
FROM Employee e                       -- e 代表目前正在查詢的人員
LEFT JOIN Employee e2                 -- e2 代表該人員的直屬主管
ON e.supervisor_id = e2.emp_id;   -- 人員的主管代號對應主管的人員代號
*/