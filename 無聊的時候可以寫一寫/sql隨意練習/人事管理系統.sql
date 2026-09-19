/*
某國營事業之人事管理系統，其關聯式資料庫（MySQL）包含下列 2 個資料表，有底線者為主鍵：
資料表	欄位
部門 (Dept)	部門代號 (dept_id)、部門名稱 (dept_name)、所在縣市 (city)
員工 (Employee)	員工代號 (emp_id)、姓名 (emp_name)、部門代號 (dept_id)、薪資 (salary)、主管代號 (mgr_id)
其中 Employee 之 dept_id 為參考 Dept 之外來鍵；mgr_id 為該員工直屬主管之員工代號，
同樣參考 Employee 資料表自身之 emp_id（最高主管之 mgr_id 為 NULL）。針對下列問題，請分別寫出 SQL 指令：（
6 題，每題 4 分，共 24 分）
（一）請列出每位員工之姓名及其直屬主管之姓名，輸出欄位：員工姓名、主管姓名（最高主管不需列出）。NEW
（二）請列出「薪資高於自己所屬部門平均薪資」之員工姓名、薪資與部門代號。NEW
（三）人事系統經常以「姓名」進行查詢，為加速查詢效能，請於 Employee 資料表之 emp_name 欄位建立一個名為 idx_emp_name 之索引。NEW
（四）請將 Employee 資料表之「查詢（SELECT）」權限授予使用者帳號 'hr_user'；並請寫出日後收回該權限之指令。NEW
（五）系統需新增「出勤紀錄」資料表 Attendance（欄位：紀錄編號 rec_id 為主鍵、員工代號 emp_id、日期 att_date、狀態 status），
要求：當某員工自 Employee 資料表被刪除時，該員工之所有出勤紀錄須「自動一併刪除」。
請寫出建立此資料表之完整 SQL 指令（含主鍵與外來鍵設定）。NEW
（六）請統計各部門之員工人數與平均薪資（平均四捨五入至整數），僅列出員工人數達 10 人（含）以上之部門，
輸出欄位：部門名稱、員工人數、平均薪資，按平均薪資由高到低排序。
*/

/*
請列出各部門中最高薪資員工與最低薪資員工之姓名及薪資。
SELECT
    d.dept_name,
    e.emp_name,
    e.salary
FROM Dept d
JOIN Employee e
    ON d.dept_id = e.dept_id
join (
    select dept_id,
        max(salary) AS max_salary,
        min(salary) AS min_salary
    from employee
    group by dept_id
) x on d.dept_id = x.dept_id
and (e.salary = x.max_salary or e.salary = x.min_salary)

-----------------------------
SELECT
    d.dept_name,                              -- 輸出部門名稱
    e.emp_name,                               -- 輸出符合最高薪或最低薪的員工姓名
    e.salary                                  -- 輸出該員工薪資
FROM Dept d                                   -- 部門資料表

JOIN Employee e
    ON d.dept_id = e.dept_id                 -- 連接各部門所屬員工

JOIN (
    SELECT
        dept_id,                              -- 依部門統計
        MAX(salary) AS max_salary,            -- 該部門最高薪資
        MIN(salary) AS min_salary             -- 該部門最低薪資
    FROM Employee
    GROUP BY dept_id
) x
    ON e.dept_id = x.dept_id                 -- 員工必須屬於該統計部門
    AND (
        e.salary = x.max_salary               -- 薪資等於該部門最高薪
        OR e.salary = x.min_salary            -- 或薪資等於該部門最低薪
    );
---------------------------
SELECT
    d.dept_name,
    e.emp_name,
    e.salary
FROM Dept d

JOIN Employee e
    ON d.dept_id = e.dept_id

JOIN (
    SELECT
        dept_id,
        MAX(salary) AS max_salary,
        MIN(salary) AS min_salary
    FROM Employee
    GROUP BY dept_id
) x
    ON e.dept_id = x.dept_id
    AND (
        e.salary = x.max_salary
        OR e.salary = x.min_salary
    );
*/
/*
請列出各部門中最高薪資員工與最低薪資員工之姓名及薪資。
select d.dept_name , e.emp_name , max(e.salary) as 最高薪資
from dept d
join employee e on d.dept_id = e.dept_id
group by d.dept_name , e.emp_name
having e.salary = max(e.salary) 

union

select d.dept_name , e.emp_name , min(e.salary) as 最高薪資
from dept d
join employee e on d.dept_id = e.dept_id
group by d.dept_name , emp_name
having e.salary = min(e.salary) 


*/

/*
請列出各部門最高薪資、最低薪資及平均薪資，且僅列出最高薪資大於全體員工平均薪資、同時最低薪資低於全體員工平均薪資之部門。
select d.dept_name , max(e.salary) as 最高薪資 , min(e.salary) as 最低薪資 , avg(e.salary) as 平均薪資
from dept d
join employee e on d.dept_id = e.dept_id
group by d.dept_name
having max(e.salary) > (
    select avg(salary)
    from employee
)
and
min(e.salary) < (
    select avg(salary)
    from employee
)
---------------------------
SELECT
    d.dept_name,                              -- 輸出部門名稱
    MAX(e.salary) AS 最高薪資,                -- 計算該部門最高薪資
    MIN(e.salary) AS 最低薪資,                -- 計算該部門最低薪資
    AVG(e.salary) AS 平均薪資                 -- 計算該部門平均薪資
FROM Dept d                                   -- 從部門資料表開始

JOIN Employee e
    ON d.dept_id = e.dept_id                 -- 連接各部門所屬員工

GROUP BY
    d.dept_id,                               -- 依部門代號分組
    d.dept_name                              -- 同時保留部門名稱

HAVING
    MAX(e.salary) > (
        SELECT AVG(salary)                   -- 計算全體員工平均薪資
        FROM Employee
    )
    AND
    MIN(e.salary) < (
        SELECT AVG(salary)                   -- 再取得全體員工平均薪資
        FROM Employee
    );
*/
/*
請列出各部門之部門名稱、最高薪資與最低薪資，僅列出至少有 2 名員工之部門，並按最高薪資由高到低排序。
select d.dept_name , max(e.salary) as 最高薪資 , min(e.salary) as 最低薪資
from dept d
join employee e on d.dept_id = e.dept_id
group by d.dept_name
having count(e.emp_id) >= 2
order by 最高薪資 desc
---------------------------
SELECT
    d.dept_name,                              -- 輸出部門名稱
    MAX(e.salary) AS 最高薪資,                -- 計算該部門最高薪資
    MIN(e.salary) AS 最低薪資                 -- 計算該部門最低薪資
FROM Dept d                                   -- 從部門資料表開始
JOIN Employee e
    ON d.dept_id = e.dept_id                 -- 連接該部門所屬員工
GROUP BY
    d.dept_id,                               -- 依部門代號分組
    d.dept_name                              -- 同時保留部門名稱
HAVING
    COUNT(e.emp_id) >= 2                     -- 僅列出至少有 2 名員工的部門
ORDER BY
    最高薪資 DESC;                            -- 依最高薪資由高到低排序
*/
/*
（一）請列出每位員工之姓名及其直屬主管之姓名，輸出欄位：員工姓名、主管姓名（最高主管不需列出）。NEW
select t1.emp_name as 員工姓名 , t2.emp_name as 主管姓名
from Employee t1 
join Employee t2 on t1.mgr_id = t2.emp_id

------------------------------
SELECT
    t1.emp_name AS 員工姓名,                -- t1 代表員工，輸出員工姓名
    t2.emp_name AS 主管姓名                 -- t2 代表該員工的直屬主管，輸出主管姓名
FROM Employee t1                            -- 第一次使用 Employee，代表「員工」
JOIN Employee t2                            -- 第二次使用 Employee，代表「主管」
    ON t1.mgr_id = t2.emp_id;               -- 員工的主管代號 = 主管本人的員工代號

*/
