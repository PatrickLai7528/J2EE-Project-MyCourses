package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName StatisticsService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.*;
import com.MyCourses.entity.TeacherStatistics.*;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.*;
import com.MyCourses.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsService implements IStatisticsService {


    private final ITeacherService teacherService;
    private final ICourseService courseService;
    private final IReleasementService releasementService;
    private final ISelectionService selectionService;

    @Autowired
    public StatisticsService(ITeacherService teacherService, ICourseService courseService, IReleasementService releasementService, ISelectionService selectionService) {
        this.teacherService = teacherService;
        this.courseService = courseService;
        this.releasementService = releasementService;
        this.selectionService = selectionService;
    }

    @Override
    public TeacherStatistics getTeacherStatistics(String teacherEmail) throws TeacherNotExistException, ReleasementNotExistException {
        TeacherEntity teacherEntity = teacherService.getByEmail(teacherEmail);
        TeacherStatistics teacherStatistics = new TeacherStatistics();
        teacherStatistics.setOutlineStatistics(this.calcOutlineStatistics(teacherEntity));
        teacherStatistics.setReleasementStatisticsList(this.calcReleasementStatisticsList(teacherEntity));
        teacherStatistics.setSemesterStatisticsList(this.calcSemesterStatisticsList(teacherEntity));
        return teacherStatistics;
    }

    private List<SemesterStatistics> calcSemesterStatisticsList(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        Map<String, List<ReleasementEntity>> releasementMap = new HashMap<>();
        Map<String, List<CourseEntity>> courseMap = new HashMap<>();
        for (ReleasementEntity releasementEntity : releasementService.getReleasementOf(teacherEntity.getTeacherEmail())) {
            String dateStr = DateUtils.toDateString(releasementEntity.getEffectiveTime());
            String term = (Integer.parseInt(dateStr.split("-")[1]) > 9 ? "上學期" : "下學期");
            String semester;
            if (term.equals("上學期")) {
                int year = Integer.parseInt(dateStr.split("-")[0]);
                semester = year + " - " + (year + 1) + "學年" + term;
            } else {
                int year = Integer.parseInt(dateStr.split("-")[0]);
                semester = year - 1 + " - " + year + "學年" + term;
            }
            List<ReleasementEntity> releasementEntityList = releasementMap.get(semester);
            if (releasementEntityList == null)
                releasementEntityList = new ArrayList<>();
            releasementEntityList.add(releasementEntity);
            releasementMap.put(semester, releasementEntityList);

        }

        for (CourseEntity courseEntity : courseService.getCoursesByTeacherEmail(teacherEntity.getTeacherEmail())) {
            String dateStr = DateUtils.toDateString(courseEntity.getAddTime());
            String term = (Integer.parseInt(dateStr.split("-")[1]) > 9 ? "上學期" : "下學期");
            String semester;
            if (term.equals("上學期")) {
                int year = Integer.parseInt(dateStr.split("-")[0]);
                semester = year + " - " + (year + 1) + "學年" + term;
            } else {
                int year = Integer.parseInt(dateStr.split("-")[0]);
                semester = year - 1 + " - " + year + "學年" + term;
            }
            List<CourseEntity> courseEntityList = courseMap.get(semester);
            if (courseEntityList == null)
                courseEntityList = new ArrayList<>();
            courseEntityList.add(courseEntity);
            courseMap.put(semester, courseEntityList);
        }


        List<SemesterStatistics> semesterStatisticsList = new ArrayList<>();
        for (String semester : releasementMap.keySet()) {
            List<ReleasementEntity> releasementEntityList = releasementMap.get(semester);
            SemesterStatistics semesterStatistics = new SemesterStatistics();
            semesterStatistics.setCreated((long) courseMap.get(semester).size());
            semesterStatistics.setSemester(semester);
            semesterStatistics.setReleased((long) releasementEntityList.size());

            long selected = 0;
            List<SemesterStatistics.SimplifyReleasement> simplifyReleasementList = new ArrayList<>();
            for (ReleasementEntity releasementEntity : releasementEntityList) {
                List<SelectionEntity> selectionEntityList =
                        selectionService.getSelectionOfReleasement(releasementEntity.getRid());

                selected += selectionEntityList.size();


                SemesterStatistics.SimplifyReleasement simplifyReleasement =
                        new SemesterStatistics.SimplifyReleasement();
                simplifyReleasement.setCourseName(releasementEntity.getCourseEntity().getName());
                simplifyReleasement.setDeadTime(releasementEntity.getDeadTime());
                simplifyReleasement.setEffectiveTime(releasementEntity.getEffectiveTime());
                simplifyReleasement.setSelected((long) selectionEntityList.size());
                simplifyReleasement.setUploaded((long) releasementEntity.getSlideEntityList().size());
                simplifyReleasement.setPublished((long) releasementEntity.getAssignmentEntityList().size());

                long commented = 0;
                long submitted = 0;
                for (ForumEntity forumEntity : releasementEntity.getForumEntityList()) {
                    commented += calcCommented(forumEntity.getCommentEntityList());
                }
                for (AssignmentEntity assignmentEntity : releasementEntity.getAssignmentEntityList()) {
                    submitted += assignmentEntity.getSubmissionEntityList().size();
                }
                simplifyReleasement.setSubmitted(submitted);
                simplifyReleasement.setCommented(commented);
                simplifyReleasementList.add(simplifyReleasement);
            }
            semesterStatistics.setSelected(selected);
            semesterStatistics.setSimplifyReleasementList(simplifyReleasementList);
            semesterStatisticsList.add(semesterStatistics);
        }
        return semesterStatisticsList;
    }

    private List<ReleasementStatistics> calcReleasementStatisticsList(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        List<ReleasementStatistics> releasementStatisticsList = new ArrayList<>();
        for (ReleasementEntity releasementEntity : releasementService.getReleasementOf(teacherEntity.getTeacherEmail())) {
            ReleasementStatistics releasementStatistics = new ReleasementStatistics();
            List<SelectionEntity> selectionEntityList =
                    selectionService.getSelectionOfReleasement(releasementEntity.getRid());
            releasementStatistics.setCourseName(releasementEntity.getCourseEntity().getName());
            long commented = 0;
            long downloaded = 0;
            long submitted = 0;
            for (ForumEntity forumEntity : releasementEntity.getForumEntityList()) {
                commented += calcCommented(forumEntity.getCommentEntityList());
            }

            for (SlideEntity slideEntity : releasementEntity.getSlideEntityList()) {
                downloaded += slideEntity.getDownloadTimes();
            }

            for (AssignmentEntity assignmentEntity : releasementEntity.getAssignmentEntityList()) {
                submitted += assignmentEntity.getSubmissionEntityList().size();
            }

            releasementStatistics.setCommented(commented);
            releasementStatistics.setDownloaded(downloaded);
            releasementStatistics.setSelected((long) selectionEntityList.size());
            releasementStatistics.setSubmitted(submitted);

            List<ReleasementStatistics.SimplifySelection> simplifySelectionList = new ArrayList<>();
            for (SelectionEntity selectionEntity : selectionEntityList) {
                ReleasementStatistics.SimplifySelection simplifySelection =
                        new ReleasementStatistics.SimplifySelection();
                simplifySelection.setStudentEmail(selectionEntity.getStudentEntity().getStudentEmail());
                simplifySelection.setStudentName(selectionEntity.getStudentEntity().getName());
                simplifySelection.setStudentNo(selectionEntity.getStudentEntity().getStudentNo());
                simplifySelection.setStudentScore(selectionEntity.getScore());
                simplifySelection.setSelectTime(selectionEntity.getSelectTime());
                simplifySelectionList.add(simplifySelection);
            }
            releasementStatistics.setSimplifySelectionList(simplifySelectionList);

            releasementStatisticsList.add(releasementStatistics);
        }
        return releasementStatisticsList;
    }

    private OutlineStatistics calcOutlineStatistics(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        OutlineStatistics outlineStatistics = new OutlineStatistics();
        List<ReleasementEntity> releasementEntityList =
                releasementService.getReleasementOf(teacherEntity.getTeacherEmail());
        outlineStatistics.setCreated((long) courseService.getCoursesByTeacherEmail(teacherEntity.getTeacherEmail()).size());
        outlineStatistics.setReleased((long) releasementEntityList.size());
        long commented = 0;
        long uploaded = 0;
        long pushlished = 0;
        long selected = 0;
        for (ReleasementEntity releasementEntity : releasementEntityList) {
            // 計算留言數
            for (ForumEntity forumEntity : releasementEntity.getForumEntityList()) {
                commented += this.calcCommented(forumEntity.getCommentEntityList());
            }
            //
            uploaded += releasementEntity.getSlideEntityList().size();
            pushlished += releasementEntity.getAssignmentEntityList().size();

            selected += selectionService.getSelectionOfReleasement(releasementEntity.getRid()).size();
        }

        outlineStatistics.setCommented(commented);
        outlineStatistics.setPublished(pushlished);
        outlineStatistics.setUploaded(uploaded);
        outlineStatistics.setSelected(selected);
        return outlineStatistics;
    }

    private long calcCommented(List<CommentEntity> commentEntityList) {
        long commented = 0;
        if (commentEntityList == null || commentEntityList.isEmpty())
            return 0;
        for (CommentEntity commentEntity : commentEntityList) {
            if (commentEntity.getBelowCommentList() == null)
                return commented;
            else
                commented += commentEntity.getBelowCommentList().size() + calcCommented(commentEntity.getBelowCommentList());
        }
        return commented;
    }
}
