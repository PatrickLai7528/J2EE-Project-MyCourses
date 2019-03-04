package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName AdminStatistics
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.entity.enums.SelectionState;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AdminStatistics {
    @Data
    public static class OutlineStatistics {
        // 學生總數
        private Long student;
        // 教師總數
        private Long teacher;
        // 學生教師比
        private Double studentTeacherProportion;
        // 創建課程數量
        private Long created;
        // 發佈課程數量
        private Long released;
        // 發佈/創建比
        private Double releasedCreatedProportion;
        // 通過總數
        private Long approved;
        // 否決總數
        private Long rejected;
        // 否決/通過比
        private Double rejectedApprovedProportion;
        // 最近七日教師注冊
        private Long teacherRegistryLast7;
        // 最近七日學生注冊
        private Long studentRegistryLast7;
        // 相比上週總用戶注冊
        private Double allUserRegistryCompareToLast7;
        // 最近七日教師登錄
        private Long teacherLogInLast7;
        // 最近七日學生登錄
        private Long studentLogInLast7;
        // 相比上週總用戶登錄
        private Double allUserLogInCompareToLast7;
    }

    @Data
    public static class TeacherStatistics {

        @Data
        public static class SimplifyCourse {
            private String courseName;
            private Date addTime;
            private ApprovalState approvalState;
        }

        @Data
        public static class SimplifyReleasement {
            private String courseName;
            private ApprovalState approvalState;
            private Long limited;
            private Long selected;
            private Long dropped;
            private Long bySelected;
            private Date releaseTime;
            private Date effectiveTime;
            private Date deadTime;
            private Double avgScore;
            private Long failed;
        }

        private String teacherName;
        private String teacherEmail;
        private Long created;
        private Long released;
        private Long rejected;
        private Double rejectedApprovedProportion;
        private Long selected;
        private Double fulledAllProportion;
        private Double droppedAllProportion;
        private Double bySelectedAllProportion;
        private List<SimplifyCourse> simplifyCourseList;
        private List<SimplifyReleasement> simplifyReleasementList;
    }

    @Data
    public static class StudentStatistics {

        @Data
        public static class SimplifySelection {
            private String courseName;
            private Date selectTime;
            private SelectionState selectionState;
            private Double score;
        }

        private String studentName;
        private String studentEmail;    
        private Long selected;
        private Double selectedAvgProportion;
        private Long dropped;
        private Double droppedAvgProportion;
        private Long loggedIn;
        private Double loggedInAvgProportion;
        private Date recentLogInTime;
        private Date registryTime;
        private List<SimplifySelection> simplifySelectionList;
    }

    private OutlineStatistics outlineStatistics;
    private List<TeacherStatistics> teacherStatisticsList;
    private List<StudentStatistics> studentStatisticsList;
}
