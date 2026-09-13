/*
某事業單位記錄員工訓練課程與每次測驗結果。資料表如下，有底線者為主鍵。

資料表	欄位
人員 Staff	人員代號 (staff_id)、姓名 (staff_name)、單位 (unit_name)、人員狀態 (staff_status)
訓練課程 TrainingCourse	課程代號 (course_id)、課程名稱 (course_name)、課程類別 (category)、必修註記 (required_flag)、
及格分數 (passing_score)、訓練費用 (fee)
修課紀錄 Enrollment	人員代號 (staff_id)、課程代號 (course_id)、應試次數 (attempt_no)、分數 (score)、結果 (result)

Enrollment 的複合主鍵為 (staff_id, course_id, attempt_no)，因此同一人可對同一課程重考。required_flag 值域為 Y／N；
result 值域為「通過、未通過」。
*/

/*
列出平均分數高於全體修課紀錄平均分數之課程名稱及課程平均分數，平均分數四捨五入至小數第 1 位。
select t2.course_name , round(avg(t3.score) , 1) as 課程平均分數
from TrainingCourse t2
join Enrollment t3 on t2.course_id = t3.course_id
group by t2.course_id , t2.course_name
having avg(t3.score) > (
    select avg(e.score)
    from Enrollment e
)
-------------------

SELECT
    t2.course_name,                               -- 輸出課程名稱
    ROUND(AVG(t3.score), 1) AS 課程平均分數        -- 計算該課程平均分數，四捨五入至小數第 1 位
FROM TrainingCourse t2                            -- 從訓練課程資料表開始

JOIN Enrollment t3
    ON t2.course_id = t3.course_id                -- 連接該課程所有修課與測驗紀錄

GROUP BY
    t2.course_id,                                 -- 依課程代號分組
    t2.course_name                                -- 同時保留課程名稱

HAVING
    AVG(t3.score) > (
        SELECT
            AVG(e.score)                          -- 計算所有修課紀錄的整體平均分數
        FROM Enrollment e
    );

*/


/*
列出已通過所有必修課程之在職人員姓名。
SELECT
    t1.staff_name                                  
FROM Staff t1                                      
WHERE
    t1.staff_status = '在職'   
and not exist(
    select 1 
    from TrainingCourse t2
    where t2.required_flag = 'Y' and not exist(
        select 1
        from Enrollment t3
        where t1.staff_id = t3.staff_id and t2.course_id = t3.course_id and t3.result = '通過'
    )
)                    

----------------------------


SELECT
    t1.staff_name                                  -- 輸出人員姓名
FROM Staff t1                                      -- 從人員資料表逐筆檢查
WHERE
    t1.staff_status = '在職'                       -- 只考慮目前在職人員

    AND NOT EXISTS (
        SELECT 1
        FROM TrainingCourse t2
        WHERE
            t2.required_flag = 'Y'                 -- 找出所有必修課程

            AND NOT EXISTS (
                SELECT 1
                FROM Enrollment t3
                WHERE
                    t3.staff_id = t1.staff_id       -- 必須是目前這位人員
                    AND t3.course_id = t2.course_id -- 必須是目前這門必修課
                    AND t3.result = '通過'          -- 必須至少曾有一次通過紀錄
            )
    );


*/


/*
列出每位在職人員之姓名、通過次數與未通過次數；完全沒有修課紀錄者仍須列出 0、0。
SELECT t1.staff_name ,
    sum(case when t3.result = '通過' then 1 else 0) , 
    sum(case when t3.result = '不通過' then 1 else 0)
from Staff t1
left join Enrollment t3 on t1.staff_id = t3.staff_id and t1.staff_status = '在職'
group by t1.staff_name

---------------------------------

SELECT
    t1.staff_name,                                         -- 輸出人員姓名

    SUM(
        CASE
            WHEN t3.result = '通過' THEN 1                 -- 本次結果為通過，計 1
            ELSE 0                                         -- 否則計 0
        END
    ) AS 通過次數,                                         -- 統計通過次數

    SUM(
        CASE
            WHEN t3.result = '未通過' THEN 1               -- 本次結果為未通過，計 1
            ELSE 0                                         -- 否則計 0
        END
    ) AS 未通過次數                                        -- 統計未通過次數

FROM Staff t1                                              -- 從所有人員開始

LEFT JOIN Enrollment t3
    ON t1.staff_id = t3.staff_id                           -- 連接該人員的修課紀錄

WHERE
    t1.staff_status = '在職'                               -- 真正排除非在職人員

GROUP BY
    t1.staff_id,
    t1.staff_name;

*/

/*
列出課程代號第 2 至第 3 個字元為「SE」，且課程名稱含「資安」之課程代號與課程名稱。
select t2.course_id , t2.course_name
from TrainingCourse t2
where substring(t2.course_id , 2 ,2) = 'SE' AND t2.course_name LIKE '%資安%'

------------------------------

SELECT
    t2.course_id,                               -- 輸出課程代號
    t2.course_name                              -- 輸出課程名稱
FROM TrainingCourse t2                          -- 從訓練課程資料表查詢
WHERE
    SUBSTRING(t2.course_id, 2, 2) = 'SE'        -- 取課程代號第 2 個字元起共 2 個字元，必須等於 SE
    AND t2.course_name LIKE '%資安%';           -- 課程名稱中任意位置須包含「資安」

*/



/*
列出所有在職人員之每次修課紀錄，輸出人員姓名、課程名稱、應試次數及結果，並按人員代號、課程代號及應試次數排序。
select t1.staff_name , t2.course_name , t3.attempt_no , t3.result
from Staff t1
join Enrollment t3 on t1.staff_id = t3.staff_id
join TrainingCourse t2 on t2.course_id = t3.course_id
where t1.staff_status = '在職'
order by t1.staff_id asc, t3.course_id asc , t3. attempt_no asc
------------------
SELECT
    t1.staff_name,                              -- 輸出人員姓名
    t2.course_name,                             -- 輸出課程名稱
    t3.attempt_no,                              -- 輸出該課程第幾次應試
    t3.result                                   -- 輸出本次測驗結果
FROM Staff t1                                   -- 人員資料表

JOIN Enrollment t3
    ON t1.staff_id = t3.staff_id                -- 連接該人員的每次修課／應試紀錄

JOIN TrainingCourse t2
    ON t2.course_id = t3.course_id              -- 取得每筆修課紀錄對應的課程名稱

WHERE
    t1.staff_status = '在職'                    -- 僅列出目前狀態為在職的人員

ORDER BY
    t1.staff_id ASC,                            -- 先依人員代號由小到大排序
    t3.course_id ASC,                           -- 同一人再依課程代號排序
    t3.attempt_no ASC;                          -- 同一課程再依應試次數由小到大排序

*/