# MyCourses

## 數據庫設計

### 學生（StudentEntity）

#### 屬性

| 中文 | 英文      | 描述                                                         |
| ---- | --------- | ------------------------------------------------------------ |
| 郵箱 | email     | 只能用NJU郵箱登陸，即@smail.nju.cn作為後綴，前綴則任意3-9位數字和字母組合，不能重覆 |
| 密碼 | password  | 6-9位字母、數字和符號組合。不能包含空白字符，需有至少一位大寫字母，一位數字和一位符號。大小寫敏感 |
| 姓名 | name      | 學生姓名，僅中文，可重覆                                     |
| 學號 | studentNo | 9位數字，不可重覆                                            |
| 注消 | deleted   | 是否已被注銷                                                 |
|      |           |                                                              |

### 教師（TeacherEntity）

#### 屬性

| 中文   | 英文      | 描述                                                         |
| ------ | --------- | ------------------------------------------------------------ |
| 郵箱   | email     | 只能用NJU郵箱登陸，即@smail.nju.cn作為後綴，前綴則任意3-9位數字和字母組合，不能重覆 |
| 密碼   | password  | 6-9位字母、數字和符號組合。不能包含空白字符，需有至少一位大寫字母，一位數字和一位符號。大小寫敏感 |
| 姓名   | name      | 學生姓名，僅中文，可重覆                                     |
| 職員號 | teacherNo | 9位數字，不可重覆                                            |
|        |           |                                                              |

###課程（CourseEntity）

#### 屬性

| 中文       | 英文        | 描述                 |
| ---------- | ----------- | -------------------- |
| 課程號     | cid         | 課程的編號，不可重覆 |
| 名稱       | name        | 12個中文字內的課程   |
| 授課老師   | teacher     | / deleted            |
| 課件       | sildes      | 已上傳的課件列表     |
| 作業       | assignments | 已佈置的作業列表     |
| 成績報告單 | reportCard  | 已選課的學生的成績   |
| 論壇       | forums      | 已開放的論壇列表     |
|            |             |                      |

### 發佈（Releasement）

#### 屬性

| 中文     | 英文                | 描述                                                 |
| -------- | ------------------- | ---------------------------------------------------- |
| 發佈號   | rid                 | 課程發佈紀錄的編號，不可重覆                         |
| 課程     | course              | 發佈的課程實體類                                     |
| 上課時間 | startHour，startMin | 課程的上課小時和分鐘                                 |
| 下課時間 | endHour，endMin     | 課程的下課小時和分鐘                                 |
| 班次     | repeatAfterNDay     | 隔多少天重覆一次課程                                 |
| 生效時間 | effectiveDate       | 課程生效日期，即第一天開始上課的日期                 |
| 失效時間 | deadDate            | 課程失效日期，即最後一天上課的日期，注意需與班次配合 |
| 限選人數 | limitNumber         | 課程選課人數的上限                                   |
|          |                     |                                                      |

## 數據庫設計

### 學生（StudentEntity）

```sql
create table student_entity (
	`email` varchar(20) primary key,
    `password` varchar(12) not null,
    `name` varchar(30) not null,
    `student_no` int(10) not null,
    `is_deleted` boolean unique
);
```



### 教師（TeacherEntity）

```sql
create table teacher_entity (
	`email` varchar(20) primary key,
    `password` varchar(12) not null,
    `name` varchar(30) not null,
    `teacher_no` int(10) unique
);
```



### 課件（SlideEntity）

```sql
create table slide_entity (
	`sid` int(10) primary key auto_increment,
    `title` varchar(100) not null, 
    `file_path` varchar(100) not null
);
```



### 評論（CommentEntity）

```sql
create table comment_entity (
    `cmid` int(10) primary key auto_increment,
    `content` varchar(1000) not null,
    `commentByEmail` varchar(20) not null
);
```



###  作業（AssignmentEntity）

```sql
create table assignment_entity (
	`assid` int(10) primary key auto_increment,
    `title` varchar(20) not null,
    `description` varchar(100),
    `sid` int(10)
);
```



###  成績單（ReportCardEntity）

```sql
create table report_card_item (
	`student_no` varchar(10) primary key,
    `score` double(10, 2) not null,
    `rcid` int(10) not null
);

create table report_card_entity (
	`rcid` int(10) primary key auto_increment,
);
```



### 課程（CourseEntity）

```sql
create table course_entity (
	`cid` int(10) primary key auto_increment,
    `name` varchar(20) not null,
    `teacher_no` int(10) unique,
    `rcid` int
)
```



## 架講設計

### 項目結構截圖

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

| 類名稱        | 職責 |
| ------------- | ---- |
| DateUtils     | 提   |
| JWTTokenUTils |      |
| ResponseUtils |      |
|               |      |










### 前端頁面



## 其它

### 開發環境

### 開發心得體會





