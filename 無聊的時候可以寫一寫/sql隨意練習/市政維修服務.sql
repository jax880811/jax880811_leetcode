/*
某市政維修服務系統包含下列資料表，有底線者為主鍵。請依各小題分別撰寫 SQL 指令。

資料表	欄位	說明
Citizen	CitizenID, CitizenName, Phone	市民主檔
Department	DeptID, DeptName	部門主檔
Employee	EmpID, EmpName, DeptID, SupervisorID	員工主檔；SupervisorID 參照 Employee.EmpID
ServiceCase	CaseID, CitizenID, EmpID, CaseType, Priority, OpenDate, CloseDate, Status	案件資料；Priority 為 H/M/L；Status 為 Open/Closed/Cancel
Satisfaction	CaseID, Score, SurveyDate	案件滿意度調查
(一) 列出 2026 年未承辦任何案件的員工代號、員工姓名與部門名稱。（LEFT JOIN + IS NULL）
(二) 列出所有部門於最近 30 天內 Priority='H' 的案件數；沒有案件者顯示 0。（LEFT JOIN 條件放 ON + COALESCE / DATE_SUB）
(三) 列出每位員工及其主管姓名；若無主管，主管姓名顯示「無」。（SELF JOIN）
(四) 列出 2026 年各部門承辦過的不同市民數。（COUNT DISTINCT）
(五) 列出 2026 年各部門高優先案件數、一般案件數與總案件數。（CASE + SUM）
(六) 列出 2026 年已結案但沒有滿意度調查的案件。（NOT EXISTS）
(七) 列出 2026 年平均結案天數高於全體平均結案天數的部門。（Derived Table）
(八) 建立檢視表 v_overdue_open_cases，列出開案超過 7 天仍未結案案件。（CREATE VIEW + DATE_ADD）
*/

/*
(八) 建立檢視表 v_overdue_open_cases，列出所有未結案案件。
create view v_overdue_open_cases as
select sc.caseid as 未結案案件
from servicecase sc
where sc.closedate is null

*/

/*
(八) 建立檢視表 v_overdue_open_cases，列出開案超過 7 天仍未結案案件。
CREATE VIEW v_overdue_open_cases AS
-- 建立一個名為 v_overdue_open_cases 的檢視表

SELECT
    sc.CaseID
    -- 顯示案件代號

FROM ServiceCase sc
-- 從案件資料表查詢

WHERE sc.CloseDate IS NULL
-- 只保留尚未結案案件

AND DATE_ADD(sc.OpenDate, INTERVAL 7 DAY) < CURRENT_DATE;
-- 將開案日期加上 7 天
-- 如果加 7 天後仍早於今天
-- 代表案件已經超過 7 天仍未結案
*/


/*
(七) 列出 2026 年結案天數高於全體平均結案天數的部門。
SELECT
    dept_avg.DeptID,
    -- 輸出部門代號

    dept_avg.DeptName,
    -- 輸出部門名稱

    dept_avg.平均結案天數
    -- 輸出該部門的平均結案天數

FROM (
    -- 這整包小查詢會先產生一張「暫時表」
    -- 也就是 Derived Table，衍生表

    SELECT
        d.DeptID,
        -- 部門代號

        d.DeptName,
        -- 部門名稱

        AVG(DATEDIFF(sc.CloseDate, sc.OpenDate)) AS 平均結案天數
        -- DATEDIFF(CloseDate, OpenDate)：計算每件案件從開案到結案花幾天
        -- AVG(...)：再計算每個部門的平均結案天數

    FROM Department d
    -- 從部門表開始

    JOIN Employee e
        ON e.DeptID = d.DeptID
        -- 部門連到員工，找出該部門有哪些承辦人

    JOIN ServiceCase sc
        ON sc.EmpID = e.EmpID
        -- 員工連到案件，找出該部門承辦過哪些案件

    WHERE sc.OpenDate >= '2026-01-01'
      AND sc.OpenDate < '2027-01-01'
      -- 只統計 2026 年開案的案件

      AND sc.Status = 'Closed'
      -- 只統計已結案案件

      AND sc.CloseDate IS NOT NULL
      -- 避免 CloseDate 為 NULL，導致 DATEDIFF 無法正常計算

    GROUP BY d.DeptID, d.DeptName
    -- 依部門分組，算出「各部門平均結案天數」

) AS dept_avg
-- 把上面那張暫時表命名為 dept_avg

WHERE dept_avg.平均結案天數 > (
    -- 拿每個部門平均，去比較「全體平均」

    SELECT
        AVG(DATEDIFF(sc2.CloseDate, sc2.OpenDate))
        -- 計算 2026 年所有已結案案件的平均結案天數

    FROM ServiceCase sc2
    WHERE sc2.OpenDate >= '2026-01-01'
      AND sc2.OpenDate < '2027-01-01'
      AND sc2.Status = 'Closed'
      AND sc2.CloseDate IS NOT NULL
);
*/


/*
(六) 列出 2026 年已結案但沒有滿意度調查的案件。
select sc.CaseID
from servicecase sc
where sc.opendate >= '2026-01-01' and sc.opendate < '2027-01-01'
and not exists(
    select 1
    from satisfaction sf
    where sc.caseid = sf.caseid
)



*/



/*
(五) 列出 2026 年各部門高優先案件數、一般案件數與總案件數。
select d.deptID,
    sum(case when sc.priority = 'H' then 1 else 0) as 高優先案件數,
    sum(case when sc.priority = 'M' then 1 else 0) as 一般案件數,
    count(sc.caseid) as 總案件數
from department d
join employee e on e.deptid = d.deptid
join servicecase sc on e.empid = sc.empid 
where sc.opendate between '2026-01-01' and '2026-12-31'
group by d.deptID 



*/


/*
(四) 列出 2026 年各部門承辦過的不同市民數。（COUNT DISTINCT）
select d.deptID , count(distinct CitizenID) as 市民數
from department d
join employee e on e.deptid = d.deptid
join servicecase sc on e.empid = sc.empid 
where sc.opendate between '2026-01-01' and '2026-12-31'
group by d.deptID 

*/



/*
(三) 列出每位員工及其主管姓名；若無主管，主管姓名顯示「無」。（SELF JOIN）
SELECT
    e1.EmpName AS 員工姓名,
    -- 輸出員工姓名

    case
        when e1.supervisorID is null then "無"
        else e2.Empname
        end as 主管姓名

FROM Employee e1
-- 第一份 Employee
-- e1 代表「員工本人」

LEFT JOIN Employee e2
-- 第二份 Employee
-- e2 代表「主管」

ON e1.SupervisorID = e2.EmpID;
-- 員工紀錄中的 SupervisorID
-- 去對應主管自己的 EmpID

*/


/*
(二) 列出所有部門於最近 30 天內 Priority='H' 的案件數；沒有案件者顯示 0。（LEFT JOIN 條件放 ON + COALESCE / DATE_SUB）
select d.deptID , coalesce(count(distinct sc.caseid) , 0) as 案件數
from department d
join employee e on e.deptid = d.deptid
left join servicecase sc on e.empid = sc.empid 
    and sc.priority = 'H'
    and sc.opendate >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
group by  d.deptID
order by 案件數 asc




*/

/*
(一) 列出 2026 年未承辦任何案件的員工代號、員工姓名與部門名稱。（LEFT JOIN + IS NULL）
SELECT
    e.EmpID,          -- 輸出員工代號
    e.EmpName,        -- 輸出員工姓名
    d.DeptName        -- 輸出該員工所屬部門名稱
FROM Employee e       -- 從員工主檔開始查，因為題目要列出「員工」
JOIN Department d     -- 連接部門主檔，取得部門名稱
    ON e.DeptID = d.DeptID
                       -- 員工表的 DeptID 對應部門表的 DeptID
                       -- 這樣才能知道每位員工屬於哪個部門

LEFT JOIN ServiceCase sc
                       -- 左外連接案件表
                       -- 重點：保留所有員工，即使該員工沒有案件也要保留下來
    ON e.EmpID = sc.EmpID
                       -- 員工代號對應案件承辦員工代號
                       -- 表示找出這位員工承辦過的案件
   AND sc.OpenDate >= '2026-01-01'
                       -- 只比對開案日期在 2026 年 1 月 1 日含以後的案件
   AND sc.OpenDate < '2027-01-01'
                       -- 只比對開案日期在 2027 年 1 月 1 日以前的案件
                       -- 合起來就是 2026-01-01 00:00:00 到 2026-12-31 23:59:59 的案件
WHERE sc.CaseID IS NULL;
                       -- 經過 LEFT JOIN 後，如果案件表沒有成功配對到資料，
                       -- sc.CaseID 就會是 NULL
                       -- 代表該員工在 2026 年沒有承辦任何案件
*/
