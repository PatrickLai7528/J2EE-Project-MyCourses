package com.MyCourses.entity;/*
 * @PackageName com.MyCourses.entity
 * @ClassName TeacherStatistics
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.enums.SelectionState;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class TeacherStatistics {
    @Data
    public static class OutlineStatistics {
        private Long created;
        private Long released;
        private Long selected;
        private Long commented;
        private Long uploaded;
        private Long published;
    }

    @Data
    public static class SemesterStatistics {

        @Data
        public static class SimplifyReleasement {
            private String courseName;
            private Date effectiveTime;
            private Date deadTime;
            private Long selected;
            private Long uploaded;
            private Long published;
            private Long commented;
            private Long submitted;
        }

        private String semester;
        private Long created;
        private Long released;
        private Long selected;
        private List<SimplifyReleasement> simplifyReleasementList;
    }

    @Data
    public static class ReleasementStatistics {

        @Data
        public static class SimplifySelection {
            private String studentName;
            private String studentNo;
            private String studentEmail;
            private Date selectTime;
            private Double studentScore;
            private SelectionState selectionState;
        }

        private String courseName;
        private Long selected;
        private Long submitted;
        private Long downloaded;
        private Long commented;
        private List<SimplifySelection> simplifySelectionList;
    }


    private OutlineStatistics outlineStatistics;
    private List<SemesterStatistics> semesterStatisticsList;
    private List<ReleasementStatistics> releasementStatisticsList;
}
