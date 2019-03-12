

# MyCourses

## 數據庫設計

### ER圖

![ER](./J2EE_MyCourses_ScreenShot/ER.png)

### 數據庫表

#### admin_entity

| 列名        | 數據類型     | 外鍵關係 | 其它         |
| ----------- | ------------ | -------- | ------------ |
| admin_email | varchar(255) | /        | primary key  |
| password    | varchar(255  | /        | default null |



#### assignment_entity

| 列名             | 數據類型     | 外鍵關係                            | 其它                         |
| ---------------- | ------------ | ----------------------------------- | ---------------------------- |
| assid            | bigint(20)   | /                                   | primary key,  auto_increment |
| add_time         | varchar(255) | /                                   | default null                 |
| ddl              | varchar(255) | /                                   | default null                 |
| description      | varchar(255) | /                                   | default null                 |
| file_size        | int(11)      | /                                   | default null                 |
| file_unit        | varchar(255) | /                                   | default null                 |
| title            | varchar(255) | /                                   | default null                 |
| slide_entity_sid | bigint(20)   | references  slide_entity (sid)      | default null                 |
| rid              | bigint(20)   | references releasement_entity (rid) | default null                 |

#### assignment_entity_submission_entity_list

| 列名                        | 數據類型   | 外鍵關係                             | 其它       |
| --------------------------- | ---------- | ------------------------------------ | ---------- |
| assignment_entity_assid     | bigint(20) | references assignment_entity (assid) | unique key |
| submission_entity_list_smid | bigint(20  | references submission_entity (smid)  | not null   |



####  comment_entity


| 列名                               | 數據類型     | 外鍵關係                                  | 其它                         |
| ---------------------------------- | ------------ | ----------------------------------------- | ---------------------------- |
| cmid                               | bigint(20)   | /                                         | primary key,  auto_increment |
| comment_time                       | varchar(255) | /                                         | default null                 |
| content                            | varchar(255) | /                                         | default null                 |
| message_from_student_student_email | varchar(255) | references student_entity (student_email) | default null                 |
| message_from_teacher_teacher_email | varchar(255) | references teacher_entity (teacher_email) | default null                 |
| fid                                | bigint(20)   | references forum_entity (fid)             | default null                 |



####  comment_entity_below_comment_list

| 列名                    | 數據類型   | 外鍵關係                         | 其它                 |
| ----------------------- | ---------- | -------------------------------- | -------------------- |
| comment_entity_cmid     | bigint(20) | references comment_entity (cmid) | unique key, not null |
| below_comment_list_cmid | bigint(20) | references comment_entity (cmid) | not null             |



#### course_entity

| 列名           | 數據類型     | 外鍵關係                                  | 其它                         |
| -------------- | ------------ | ----------------------------------------- | ---------------------------- |
| cid            | bigint(20)   | /                                         | primary key,  auto_increment |
| add_time       | varchar(255) | /                                         | default null                 |
| approval_state | varchar(255) | /                                         | default null                 |
| released       | bit(1)       | /                                         | default null                 |
| name           | varchar(255) | /                                         | default null                 |
| teacher_email  | varchar(255) | references teacher_entity (teacher_email) | default null                 |



#### forum_entity

| 列名           | 數據類型     | 外鍵關係                                  | 其它                         |
| -------------- | ------------ | ----------------------------------------- | ---------------------------- |
| fid            | bigint(20)   | /                                         | primary key,  auto_increment |
| add_time       | varchar(255) | /                                         | default null                 |
| topic          | varchar(255) | /                                         | default null                 |
| rid            | bigint(20)   | references releasement_entity (rid)       | default null                 |
| studente_email | varchar(255) | references student_entity (student_email) | default null                 |
| teacher_email  | varchar(255) | references teacher_entity (teacher_email) | default null                 |



#### releasement_entity

| 列名             | 數據類型     | 外鍵關係                       | 其它                         |
| ---------------- | ------------ | ------------------------------ | ---------------------------- |
| rid              | bigint(20)   | /                              | primary key,  auto_increment |
| add_time         | varchar(255) | /                              | default null                 |
| approval_state   | varchar(255) | /                              | default null                 |
| effective_time   | varchar(255) | /                              | default null                 |
| dead_time        | varchar(255) | /                              | default null                 |
| end_hour         | int(11)      | /                              | default null                 |
| end_min          | int(11)      | /                              | default null                 |
| limit_number     | int(11)      | /                              | default null                 |
| release_time     | varchar(255) | /                              | default null                 |
| repeat_after_day | int(11)      | /                              | default null                 |
| start_hour       | int(11)      | /                              | default null                 |
| start_min        | int(11)      | /                              | default null                 |
| course_id        | bigint(20)   | references course_entity (cid) | default null                 |
|                  |              |                                |                              |



#### selection_entity

| 列名          | 數據類型     | 外鍵關係                                  | 其它                         |
| ------------- | ------------ | ----------------------------------------- | ---------------------------- |
| slid          | bigint(20)   | /                                         | primary key,  auto_increment |
| score         | double       | /                                         | default null                 |
| select_time   | varchar(255) | /                                         | default null                 |
| state         | varchar(255) | /                                         | default null                 |
| rid           | bigint(20)   | references releasement_entity (rid)       | default null                 |
| student_email | varchar(255) | references student_entity (student_email) | default null                 |

#### slide_entity

| 列名           | 數據類型     | 外鍵關係                            | 其它                         |
| -------------- | ------------ | ----------------------------------- | ---------------------------- |
| sid            | bigint(20)   | /                                   | primary key,  auto_increment |
| download_times | bigint(20)   | /                                   | default null                 |
| file_path      | varchar(255) | /                                   | default null                 |
| titile         | varchar(255) | /                                   | default null                 |
| upload_time    | varchar(255) | /                                   | default null                 |
| rid            | bigint(20)   | references releasement_entity (rid) | default null                 |



#### student_entity

| 列名            | 數據類型     | 外鍵關係 | 其它         |
| --------------- | ------------ | -------- | ------------ |
| student_email   | varchar(255) | /        | primary key  |
| deleted         | bit(1)       | /        | default null |
| last_log_in     | varchar(255) | /        | default null |
| logged_in_times | bigint(20)   | /        | default null |
| name            | varchar(255) | /        | default null |
| password        | varchar(255) | /        | default null |
| registry_time   | varchar(255) | /        | default null |
| student_no      | varchar(255) | /        | default null |



#### submission_entity

| 列名          | 數據類型     | 外鍵關係                                  | 其它                        |
| ------------- | ------------ | ----------------------------------------- | --------------------------- |
| smid          | bigint(20)   | references  assignment_entity (assid)     | primary key, auto_increment |
| file_path     | varchar(255) | /                                         | default null                |
| submit_time   | varchar(255) | /                                         | default null                |
| student_email | varchar(255) | references student_entity (student_email) | default null                |



####  teacher_entity

| 列名            | 數據類型     | 外鍵關係 | 其它         |
| --------------- | ------------ | -------- | ------------ |
| teacher_email   | varchar(255) | /        | primary key  |
| last_log_in     | varchar(255) | /        | default null |
| logged_in_times | bigint(20)   | /        | default null |
| name            | varchar(255) | /        | default null |
| password        | varchar(255) | /        | default null |
| registry_time   | varchar(255) | /        | default null |
| teacher_no      | varchar(255) | /        | default null |

## 架講設計

### 項目結構截圖

#### 前端

![螢幕截圖 2019-03-11 下午10.05.31](./J2EE_MyCourses_ScreenShot/structure_fe_1.png)

![螢幕截圖 2019-03-11 下午10.09.20](./J2EE_MyCourses_ScreenShot/structure_fe_2.png)

#### 後端

![螢幕截圖 2019-03-11 下午10.06.01](./J2EE_MyCourses_ScreenShot/structure_be_1.png)

### 使用框架

#### 後端

- 使用Sring-Boot搭建RESTFUL API
- 使用Hibernate進行數據庫訪問和映射
- 使用AOP + JWT 進行認證與授權

#### 前端

- 使用React搭建符合容器/表現模式的前端頁面
- 使用TypeScript進行開發時的靜態類型檢查
- 使用AntDesign統一界面風格
- 使用axios調用RESTFUL API



## 類設計

### 各包的類

#### com.MyCourses.annotations

| 類名稱        | 職責                                                         |
| ------------- | ------------------------------------------------------------ |
| GenerateToken | 使用這個標註的Controller的類方法，將根據參數生成Token並擁帶返回 |
| PleaseLog     | 使用這個標註的Controller的類方法，會以日誌方式將參數、訪問方法、請求來源IP和返回值打印在控制台上 |
| VerifyToken   | 使用這個標註的Controller的類方法、需要於請求頭部Authorization擁帶Token才能訪問，否則返回提示並拒絕訪問 |
|               |                                                              |

#### com.MyCourses.aspect
| 類名稱       | 職責                                                         |
| ------------ | ------------------------------------------------------------ |
| LoggerAspect | 將標註了PleaseLog的Controller的類方法，以日誌方式將參數、訪問方法、請求來源IP和返回值打印在控制台上 |
| TokenAspect  | 以AOP的方式攔截訪問標註了VerifyToken、GenerateToken的方法的請求，根據標註完成相應Token操作 |



#### com.MyCourses.controller

| 類名稱          | 職責                                                         |
| --------------- | ------------------------------------------------------------ |
| AdminController | 提供管理員登錄、查看統計信息、審批課程的管理員功能的API |
| APIResponse     | 統一接口的返回值，返回自定義錯誤碼、回饋信息、載荷 |
| AssignmentController                | 提供提交作業、發佈作業的API                                   |
| CourseController | 提供創建課程、查詢的API |
| FileController | 提供文件上下載的API |
| ForumController | 提供創建討論區、留言的API |
| ReleasementController | 提供發佈課程、查詢的API |
| ReportCardController | 提供發佈成績的API |
| SelectionController | 提供選課、查詢和群發郵件的API |
| SlideController | 提供發佈課件的API |
| StatisticsController | 提供查詢統計信息的API |
| StudentController | 提供學生登錄註冊、查詢的API |
| TeacherController | 提供老師登錄註冊、查詢的API |
| VerifyController | 提供發送驗證郵件的API |
| | |

#### com.MyCourses.dao

| 類名稱      | 職責                                                         | 對應實現                        |
| ----------- | ------------------------------------------------------------ | ------------------------------- |
| IAdminDAO   | 提供AdminEntity的數據庫訪問                                  | com.MyCourses.dao.impl.AdminDao |
| ICommentDAO | 提供CommentEntity的數據庫訪問 | com.MyCourses.dao.impl.CommentDAO |
| ICouseDAO            | 提供CourseEntity的數據庫訪問 | com.MyCourses.dao.impl.ForumDAO |
|  IForumDAO            | 提供ForumEntity的數據庫訪問 | com.MyCourses.dao.impl.ReleasementDAO |
|  IGeneralDAO           | 使用泛型提取所有DAO公有的CRUD方法 | / |
|  IReleasementDAO           | 提供ReleasementDAO的數據庫訪問 | com.MyCourses.dao.impl.ReleasementDAO |
| ISelectionDAO | 提供SelectionEntity的數據庫訪問 | com.MyCourses.dao.impl.SelectionDAO |
| IStudentDAO | 提供StudentEntity的數據庫訪問 | com.MyCourses.dao.impl.StudentDAO |
| ITeacherDAO | 提供TeacherEntity的數據庫訪問 | com.MyCourses.dao.impl.TeacherDAO |



#### com.MyCourses.entity.conventer

| 類名稱                 | 職責                                                         |
| ---------------------- | ------------------------------------------------------------ |
| ApprovalStateConverter | 負責實體類中的ApprovalState和數據庫的字符串的互相轉換        |
| ByteUnitConverter            | 負責實體類中的ByteUnit和數據庫的字符串的互相轉換 |
| DateConverter | 負責實體類中的java.util.Date類型的屬性，按YYYY-MM-DD格式，與數據庫的字符串互相轉換 |
| DetailDateConverter | 負責實體類中java.util.Date類型的屬性，按YYYY-MM-DD HH:mm:SS格式，與數據庫的字符串互相轉換 |
| SelectionStateConverter | 負責實體類中的SelectionState和數據庫的字符串互相轉換 |
|  |  |

#### com.MyCourses.entity.enums

| 類名稱         | 職責               |
| -------------- | ------------------ |
| ApprovalState  | 表示課程的審批狀態 |
| ByteUnit       | 表示字節大小單位   |
| SelectionState | 表示選課狀態       |
|                |                    |

#### com.MyCourses.entity

| 類名稱            | 職責                   |
| ----------------- | ---------------------- |
| AdminEntity       | 管理員的實體類         |
| AdminStatistics   | 供管理員查看的統計數據 |
| AssignmentEntity  | 作業的實體類           |
| CommentEntity     |  評論的實體類                      |
| FileSize          | 文件大小的數據結構                       |
| ForumEntity       |  討論區的實體類                      |
| ReleasementEntity |  課程發佈的實體類                      |
| SelectionEntity   |  選課的實體類                      |
| SlideEntity       |  課件的實體類                      |
| StudentEntity     |  學生的實體類                      |
| SubmissionEntity  |  提交作業的實體類                      |
| TeacherEntity     |  老師的實體類                      |
| TeacherStatistics |  供老師查看的統計數據                      |

#### com.MyCourses.entity.AdminStatistics

| 類名稱            | 職責 |
| ----------------- | ---- |
| OutlineStatistics | 按系統所有情況來進行統計的概要數據     |
| TeacherStatistics | 按每個老師來進行統計的數據     |
| StudentStatistics | 按每個學生來進行統計的數據     |

#### com.MyCourses.entity.AdminStatistics.TeacherStatistics

| 類名稱              | 職責                                                         |
| ------------------- | ------------------------------------------------------------ |
| SimplifyCourse      | 簡化版CourseEntity，刪除顯示統計信息時不必要的屬性           |
| SimplifyReleasement | 簡化版ReleasementEntity，刪除顯示統計信息不必要的屬性 |



#### com.MyCourses.entity.AdminStatistics.StudentStatistics

| 類名稱            | 職責                                            |
| ----------------- | ----------------------------------------------- |
| SimplifySelection | 簡化版Selection，刪除顯示統計信息時不必要的屬性 |



#### com.MyCourses.entity.TeacherStatistics

| 類名稱                | 職責 |
| --------------------- | ---- |
| SemesterStatistics    | 按每學期來進行統計的數據     |
| ReleasementStatistics | 按每個課程發佈來進行統計的數據     |



#### com.MyCourses.exceptions

| 類名稱                                       | 職責                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| AdminNotExistException                       | 登錄時找不到對應的管理員時抛出的異常                         |
| AssignmentNotExistException                  | 找不到作業時抛出的異常                                       |
| CourseAlreadyReleaseException                | 對已發佈課程進行審批不通過操作時抛出的異常                   |
| CourseHasNoTeacherException                  | 增加課程時沒有指定老師時抛出的異常                           |
| CourseNotExistException                      | 找不到課程時抛出的異常                                       |
| DateStringFormatException                    | 日期字符串轉換發生錯誤時抛出的異常                           |
| DropSelectionException                       | 對沒有選上的課程進行退課操作時抛出的異常                     |
| FileEmptyException                           | 上傳空文件抛出的異常                                         |
| ForumNotExistException                       | 找不到討論區時抛出的異常                                     |
| MailSendingException                         | 發送郵件發生錯誤時抛出的異常                                 |
| ReleasementAlreadyPassEffectiveTimeException | 對已開課的課程發佈進行審批通過或審批不通過時抛出的異常       |
| ReleasementDateException                     | 發佈課程時開課日期、結課日期、上課時間和上課時間設置錯誤時抛出的異常 |
| ReleasementNotException                      | 找不到課程發佈時抛出的異常                                   |
| RepeatSelectionCourseException               | 對已選的課程發佈再進行選課操作時抛出重覆選課的異常           |
| ScoreOutOfRangeException                     | 發佈成績時成績範圍不符合要求時抛出的異常                     |
| SelectionFailException                       | 對已超過選課人數的課程發佈進行選課操作，或已過結課時間的課程進行選課操作時抛出的異常 |
| SelectionNotExistException                   | 找不到選課時抛出的異常                                       |
| StudentNotExistException                     | 找不到學生時抛出的異常                                       |
| StudentRepeatedException                     | 學生使用已注冊的郵箱進行注冊時抛出的異常                     |
| TeacherNotExistException                     | 找不到老師時抛出的異常                                       |
| TeacherRepeatedException                     | 老師使用已注冊的郵箱進行注冊時抛出的異常                     |
| UnexpectedReleaseConfig                      | 發佈課程時提供了不需要的數據，或沒提供需要的數據時抛出的異常 |
| VerficationException                         | 注冊時驗證碼不正確抛出的異常                                 |
| VerifyMailSendingException                   | 發送驗證郵件出錯時抛出的異常                                 |
|                                              |                                                              |

#### com.MyCourses.service

| 類名稱              | 職責                                                         | 對應實現                                     |
| ------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| IAdminService       | 提供管理員的登錄、審批課程的接口                             | com.MyCourses.service.impl.AdminService      |
| IAssignmentService  | 提供發佈作業的接口                                           | com.MyCourses.service.impl.AssignmentService |
| ICourseService      | 提供增加、發佈和查詢課程的接口                               | com.MyCourses.service.impl.CourseService     |
| IEncryptService     | 提供字符串哈希運算的接口                                     | com.MyCourses.service.EncryptService         |
| IFileService        | 提接上下載文件的接口                                         | com.MyCourses.service.impl.FileService       |
| IForumService       | 提供創建、留言和查詢討論區的接口                             | com.MyCourses.service.impl.ForumService      |
| IMailService        | 提供發送郵件的服務                                           | com.MyCourses.dao.impl.SelectionDAO          |
| IReleasementService | 提供發佈課程的查詢接口                                       | com.MyCourses.service.ReleasementService     |
| IReportCardService  | 提供發佈成績的接口                                           | com.MyCourses.service.impl.ReportCardService |
| ISelectionService   | 提供選課、查詢選課情況和群發郵件的接口                       | com.MyCourses.service.impl.SelectionService  |
| ISlideService       | 提供上載文件的接口                                           | com.MyCourses.service.impl.SlideService      |
| IStatisticsService  | 提供取得統計信息的接口                                       | com.MyCourses.service.impl.StatisticsService |
| IStudentService     | 提供取得登錄/注冊，查詢學生的接口                            | com.MyCourses.service.impl.StudentService    |
| ISubmissionService  | 提供提交作業的接口                                           | com.MyCourses.service.impl.SubmissionService |
| ITeacherService     | 提供教師登錄/注冊，查詢的接口                                | com.MyCourses.service.impl.TeacherService    |
| IVerifyService      | 提供發送驗證郵件和普通郵件的接口                             | com.MyCourses.service.impl.VerifyService     |
| ReleaseConfig       | 發佈課程需要提供的數據的集合                                 | /                                            |
| RenamableRecourse   | 對org.springframework.core.io.Resource進行包裝，使其可重新命名 | /                                            |

#### com.MyCourses.service.schedule

| 類名稱           | 職責                                                         |
| ---------------- | ------------------------------------------------------------ |
| ReleasementCheck | 定時任務，每天中午12檢查有沒有Releasement是準備開課，若選課人數超過限制人數，則進行隨機抽取 |
|                  |                                                              |

#### com.MyCourses.utils

| 類名稱        | 職責                                    |
| ------------- | --------------------------------------- |
| DateUtils     | 提供java.utils.Date的轉換為字符串的方法 |
| JWTTokenUTils | 提供生成Token和驗證Token的方法          |
| ResponseUtils | 提供生成AIPResponse的方法               |
|               |                                         |

### 前端頁面

##### 登錄

- 可選擇用戶身份（學生、教師和管理員）
- 登錄後將切換至相應的頁面
- 表單驗證：郵箱需為郵箱格式、密碼不能為空且長度為6-16

![螢幕截圖 2019-03-11 下午6.59.59](./J2EE_MyCourses_ScreenShot/login.png)



##### 註冊

- 表單驗證：
  - 郵箱需為郵箱格式
  - 姓名長度為2-4
  - 密碼不能為空且長度為6-16
  - 密碼和確定密碼需一致
- 點擊驗證碼可發送驗證碼至上面填寫的郵箱，需填寫正確驗證碼才能順利注冊

![螢幕截圖 2019-03-11 下午7.00.07](./J2EE_MyCourses_ScreenShot/signup.png)



##### 教師查看待發佈課程

- 審批未通過的課程不能發佈
- 審批通過的課程可多次發佈

![螢幕截圖 2019-03-11 下午7.00.40](./J2EE_MyCourses_ScreenShot/course_display.png)

##### 教師可創建新的課程

![螢幕截圖 2019-03-11 下午7.28.49](./J2EE_MyCourses_ScreenShot/add_course.png)



##### 教師可發佈審批通過的課程

![螢幕截圖 2019-03-11 下午7.27.30](./J2EE_MyCourses_ScreenShot/release_course.png)



##### 個人資料

- 點擊修改個人資料可進行編輯

![螢幕截圖 2019-03-11 下午7.02.11](./J2EE_MyCourses_ScreenShot/profile.png)



##### 編輯個人資料

- 若留空，則不會更新該項
- 若要更改新的密碼，必須提供舊的密碼

![螢幕截圖 2019-03-11 下午7.02.17](./J2EE_MyCourses_ScreenShot/profile_edit.png)



##### 教師查看統計信息（概述和按學期按計）

![螢幕截圖 2019-03-11 下午7.02.31](./J2EE_MyCourses_ScreenShot/statistics_teacher_1.png)



##### 教師查看統計信息（按課程統計）

![螢幕截圖 2019-03-11 下午7.02.37](./J2EE_MyCourses_ScreenShot/statistics_teacher_2.png)



##### 課程發佈的主頁面

- 右上側為教師的操作面版，可對選課的學生發送郵件，或對選課學生發佈成績

![螢幕截圖 2019-03-11 下午7.02.45](./J2EE_MyCourses_ScreenShot/releasement_display.png)



##### 教師可上傳課件

![螢幕截圖 2019-03-11 下午7.34.21](./J2EE_MyCourses_ScreenShot/upload_slide.png)



##### 教師和學生皆可創建討論區

![螢幕截圖 2019-03-11 下午7.34.38](./J2EE_MyCourses_ScreenShot/add_forum.png)



##### 教師可以發佈作業

![螢幕截圖 2019-03-11 下午7.02.56](./J2EE_MyCourses_ScreenShot/add_assignment.png)



##### 教師可以下載學生提交的作業

- 下載的作業會以該學生的學號進行保存

![螢幕截圖 2019-03-11 下午7.03.04](./J2EE_MyCourses_ScreenShot/download_submission.png)



##### 教師和學生皆可以創建討論區和留言

![螢幕截圖 2019-03-11 下午7.03.20](./J2EE_MyCourses_ScreenShot/forum_display.png)



##### 學生瀏覽已發佈的課程

![螢幕截圖 2019-03-11 下午7.05.04](./J2EE_MyCourses_ScreenShot/releasement_select.png)



##### 學生進入課程主頁面

![螢幕截圖 2019-03-11 下午7.05.15](./J2EE_MyCourses_ScreenShot/releasement_display_student.png)



##### 進行退課時的提示框

![螢幕截圖 2019-03-11 下午7.05.28](./J2EE_MyCourses_ScreenShot/drop_warn.png)



##### 管理員可以審批課程

- 不能對同一課程多次審批

![螢幕截圖 2019-03-11 下午7.05.49](./J2EE_MyCourses_ScreenShot/approve_course.png)



##### 管理員可以審批課程發佈

- 不能對同一課程發佈多次審批
- 對過了開課時間的課程不能通過

![螢幕截圖 2019-03-11 下午7.07.52](./J2EE_MyCourses_ScreenShot/approve_releasement.png)



##### 管理員查看統計信息（概述）

![螢幕截圖 2019-03-11 下午7.07.58](./J2EE_MyCourses_ScreenShot/statistics_admin_1.png)



##### 管理員查看統計信息（按教師統計）

![螢幕截圖 2019-03-11 下午7.08.16](./J2EE_MyCourses_ScreenShot/statistics_admin_2.png)



##### 管理員查看統計信息（按學生統計之一）

![螢幕截圖 2019-03-11 下午7.08.33](./J2EE_MyCourses_ScreenShot/statistics_admin_4.png)



#####管理員查看統計信息（按學生統計之二） 

![螢幕截圖 2019-03-11 下午7.08.26](./J2EE_MyCourses_ScreenShot/statistics_admin_3.png)





## 其它

### 開發環境

| 名稱       | 版本                                                         |
| ---------- | ------------------------------------------------------------ |
| MySQL      | Ver 8.0.14 for macos10.14 on x86_64 (MySQL Community Server - GPL) |
| SpringBoot | v1.5.2.RELEASE                                               |
| SDK        | 11.0.2                                                       |
| React Dom  | 16.7.0                                                       |
| React      | 16.7.0                                                       |
| AntDesign  | 3.13.1                                                       |
| 操作系統   | MacOS 10.14.3（18D109                                        |
|            |                                                              |

### 開發心得體會

#### 關於後端

- 對於Spring配置極其繁瑣，還好SpringBoot提供更簡單、方便的配置方式，若要我從零開始配置一個Spring項目，我沒有把握能順利配好。
- 對於Hibernate和數據庫的使用，Hibernate使用了很多次，但是還有一些像Casade等不夠熟悉，MapKey和JoinColumn等JPA標註的區別也不是分得很清楚。
- 覺得Convert標註是一個很有用的標註，可以用它把Date轉換成字符串保存在數據庫，直接看數據庫時覺得舒服一點。
- 對於數據庫的表的設計還是有點隨便，沒有認真思考怎麼設計是最佳的，導致實體類很臃腫。
- 終於掌握了一對一、一對多、多對一和多對多的正確配置方法。

#### 關於前端

- 如果該項目的狀態複雜且數據來源不唯一時，最好還是使用一下狀態管理庫工具，如Redux。
- 對於React來說，對組件拆分應愈細愈好，設計為無狀態組件更好，如FunctionalComponent或PureComponent，否則該組件內部狀態太多，就很難去測試和維護。
- 如果要通過REST API獲得數據，最好把發請求的代碼集中在一個API文件夾裡，能夠更好地統一管理，以同一的格式返回請求結果就更好。
- 最好將一個組件拆分為展示組件和容器組件，容器組件負責獲得/發送/處理數據，處理完的數據可交給展示組件進行展件，可分離關注點，且展示組件可再次復用。





