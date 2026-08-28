/*
某事業單位依部門規定必修課程，並保存人員修課及通過狀態。每門部門必修課僅指定一個部門；
全公司選修課之 required_dept_id 為 NULL。資料表如下，有底線者為主鍵。

資料表	欄位
人員 Employee	人員代號（emp_id）、人員姓名（emp_name）、部門代號（dept_id）
課程 Course	課程代號（course_id）、課程名稱（course_name）、課程類別（category）、必修部門代號（required_dept_id）
修課 Enrollment	人員代號（emp_id）、課程代號（course_id）、修課日期（enroll_date）、成績（score）、通過狀態（pass_status）
*/


/*
create table Enrollment if not exists (
    emp_id varchar(20) not null,
    course_id varchar(20) not null,
    enroll_date date not null,
    score int default null,
    pass_status varchar(10) default null check (pass_status in ("通過" , "不通過)),
    primary key (emp_id , course),
    foreign key (emp_id) REFERENCES Employee(emp_id) on delete restrict on update cascade,
    foreign key (course_id) REFERENCES Course(course_id) on delete restrict on update cascade
-------------------------------
CREATE TABLE IF NOT EXISTS Enrollment (                 -- 若 Enrollment 不存在，才建立資料表

    emp_id VARCHAR(20) NOT NULL,                        -- 人員代號，不允許為 NULL

    course_id VARCHAR(20) NOT NULL,                     -- 課程代號，不允許為 NULL

    enroll_date DATE NOT NULL,                          -- 修課日期，不允許為 NULL

    score INT DEFAULT NULL,                             -- 成績；尚未評分時可為 NULL

    pass_status VARCHAR(10) DEFAULT NULL,               -- 通過狀態；尚未判定時可為 NULL

    CHECK (
        pass_status IN ('通過', '不通過')
        OR pass_status IS NULL                          -- 允許尚未判定時為 NULL
    ),

    PRIMARY KEY (emp_id, course_id),                    -- 複合主鍵：同一人同一課程只能有一筆修課紀錄

    FOREIGN KEY (emp_id)
        REFERENCES Employee(emp_id)                     -- emp_id 必須存在於 Employee
        ON DELETE RESTRICT                              -- 若仍有修課紀錄，不允許刪除該員工
        ON UPDATE CASCADE,                              -- 員工代號變更時，自動同步更新

    FOREIGN KEY (course_id)
        REFERENCES Course(course_id)                    -- course_id 必須存在於 Course
        ON DELETE RESTRICT                              -- 若仍有修課紀錄，不允許刪除該課程
        ON UPDATE CASCADE                               -- 課程代號變更時，自動同步更新
);
)

*/



/*
課程資料表之 required_dept_id 表示該課程為指定部門之必修課；
NULL 表示全公司選修課。請列出必修課程數達 2 門以上之部門代號及必修課程數，
並依必修課程數由大到小排序。（5 分）
select 
    c.required_dept_id AS dept_id,
    count(c.course_id) as 必修課程數
from course c
where c.require_dept_id is not null
group by c.required_dept_id
having 必修課程數 >= 2
order by 必修課程數 desc
------------------------------------
SELECT
    c.required_dept_id AS dept_id,              -- 輸出該必修課所屬的部門代號
    COUNT(c.course_id) AS 必修課程數             -- 統計每個部門被指定的必修課程數
FROM Course c                                    -- 直接從課程資料表統計
WHERE
    c.required_dept_id IS NOT NULL               -- 排除全公司選修課，只保留部門必修課
GROUP BY
    c.required_dept_id                            -- 依必修部門代號分組
HAVING
    COUNT(c.course_id) >= 2                      -- 僅保留必修課程數達 2 門以上的部門
ORDER BY
    必修課程數 DESC;                             -- 依必修課程數由大到小排序

*/