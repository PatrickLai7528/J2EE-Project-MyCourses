package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName StatisticsService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.*;
import com.MyCourses.entity.enums.ApprovalState;
import com.MyCourses.entity.enums.SelectionState;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.*;
import com.MyCourses.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StatisticsService implements IStatisticsService {


    private final ITeacherService teacherService;
    private final ICourseService courseService;
    private final IReleasementService releasementService;
    private final ISelectionService selectionService;
    private final IStudentService studentService;

    @Autowired
    public StatisticsService(ITeacherService teacherService, ICourseService courseService, IReleasementService releasementService, ISelectionService selectionService, IStudentService studentService) {
        this.teacherService = teacherService;
        this.courseService = courseService;
        this.releasementService = releasementService;
        this.selectionService = selectionService;
        this.studentService = studentService;
    }

    @Override
    public TeacherStatistics getTeacherStatistics(String teacherEmail) throws TeacherNotExistException, ReleasementNotExistException {
        TeacherEntity teacherEntity = teacherService.getByEmail(teacherEmail);
        TeacherStatistics teacherStatistics = new TeacherStatistics();
        teacherStatistics.setOutlineStatistics(this.calcTeacherOutlineStatistics(teacherEntity));
        teacherStatistics.setReleasementStatisticsList(this.calcTeacherReleasementStatisticsList(teacherEntity));
        teacherStatistics.setSemesterStatisticsList(this.calcTeacherSemesterStatisticsList(teacherEntity));
        return teacherStatistics;
    }

    @Override
    public AdminStatistics getAdminStatistics() {
        AdminStatistics adminStatistics = new AdminStatistics();
        adminStatistics.setOutlineStatistics(this.calcAdminOutlineStatistics());
        try {
            adminStatistics.setStudentStatisticsList(this.calcAdminStudentStatistics());
            adminStatistics.setTeacherStatisticsList(this.calcAdminTeacherStatistics());
        } catch (TeacherNotExistException | StudentNotExistException e) {
            e.printStackTrace();
        }
        return adminStatistics;
    }

    private List<AdminStatistics.TeacherStatistics> calcAdminTeacherStatistics() throws TeacherNotExistException {
        List<AdminStatistics.TeacherStatistics> teacherStatisticsList = new ArrayList<>();
        List<TeacherEntity> teacherEntityList = teacherService.getAllTeachers();
        if (teacherEntityList == null || teacherEntityList.isEmpty()) return null;
        for (TeacherEntity teacherEntity : teacherEntityList) {
            AdminStatistics.TeacherStatistics teacherStatistics = new AdminStatistics.TeacherStatistics();

            String teacherName = teacherEntity.getName();
            String teacherEmail = teacherEntity.getTeacherEmail();

            long created = courseService.getCoursesByTeacherEmail(teacherEmail).size();
            long rejected = 0;
            long released = releasementService.getReleasementOf(teacherEmail).size();
            long selected = 0;
            long approved = 0;
            long bySelectedAll = 0;
            long dropped = 0;
            long full = 0;
            List<AdminStatistics.TeacherStatistics.SimplifyCourse> simplifyCourseList = new ArrayList<>();
            List<AdminStatistics.TeacherStatistics.SimplifyReleasement> simplifyReleasementList = new ArrayList<>();

            for (CourseEntity courseEntity : courseService.getCoursesByTeacherEmail(teacherEmail)) {
                if (courseEntity.getApprovalState().equals(ApprovalState.REJECTED)) {
                    rejected++;
                }
                if (courseEntity.getApprovalState().equals(ApprovalState.APPROVED)) {
                    approved++;
                }

                AdminStatistics.TeacherStatistics.SimplifyCourse simplifyCourse =
                        new AdminStatistics.TeacherStatistics.SimplifyCourse();

                simplifyCourse.setAddTime(courseEntity.getAddTime());
                simplifyCourse.setCourseName(courseEntity.getName());
                simplifyCourse.setApprovalState(courseEntity.getApprovalState());

                simplifyCourseList.add(simplifyCourse);

            }

            for (ReleasementEntity releasementEntity : releasementService.getReleasementOf(teacherEmail)) {

                List<SelectionEntity> selectionEntityList =
                        selectionService.getAllSelectionOfReleasement(releasementEntity.getRid());
                selected += selectionEntityList.size();

                double scoreSum = 0;
                long failed = 0;
                long bySelected = 0;
                for (SelectionEntity selectionEntity : selectionEntityList) {
                    if (selectionEntity.getSelectionState().equals(SelectionState.BY_SELECTED)) {
                        bySelected++;
                        bySelectedAll++;
                    }
                    if (selectionEntity.getSelectionState().equals(SelectionState.DROPPED)) {
                        dropped++;
                    }
                    if (selectionEntity.getScore() != null) {
                        if (selectionEntity.isFail()) {
                            failed++;
                        }
                        scoreSum += selectionEntity.getScore();
                    }

                }
                if (selectionEntityList.size() >= releasementEntity.getLimitNumber()) {
                    full++;
                }
                if (releasementEntity.getApprovalState().equals(ApprovalState.REJECTED)) {
                    rejected++;
                }
                if (releasementEntity.getApprovalState().equals(ApprovalState.APPROVED)) {
                    approved++;
                }

                AdminStatistics.TeacherStatistics.SimplifyReleasement simplifyReleasement =
                        new AdminStatistics.TeacherStatistics.SimplifyReleasement();

                simplifyReleasement.setApprovalState(releasementEntity.getApprovalState());
                simplifyReleasement.setAvgScore(scoreSum / (selectionEntityList.size() == 0 ? 1 : selectionEntityList.size()));
                simplifyReleasement.setBySelected(bySelected);
                simplifyReleasement.setCourseName(releasementEntity.getCourseEntity().getName());
                simplifyReleasement.setDeadTime(releasementEntity.getDeadTime());
                simplifyReleasement.setDropped(dropped);
                simplifyReleasement.setEffectiveTime(releasementEntity.getEffectiveTime());
                simplifyReleasement.setFailed(failed);
                simplifyReleasement.setLimited((long) releasementEntity.getLimitNumber());
                simplifyReleasement.setSelected(selected);

                simplifyReleasementList.add(simplifyReleasement);
            }


            teacherStatistics.setCreated(created);
            teacherStatistics.setRejected(rejected);
            teacherStatistics.setReleased(released);
            teacherStatistics.setSelected(selected);
            teacherStatistics.setTeacherName(teacherName);
            teacherStatistics.setTeacherEmail(teacherEmail);
            teacherStatistics.setRejectedApprovedProportion( ((double)rejected / approved));
            teacherStatistics.setBySelectedAllProportion( ((double)bySelectedAll / selected));
            teacherStatistics.setDroppedAllProportion( ((double)dropped / selected));
            teacherStatistics.setFulledAllProportion( ((double)full / selected));
            teacherStatistics.setSimplifyCourseList(simplifyCourseList);
            teacherStatistics.setSimplifyReleasementList(simplifyReleasementList);
            teacherStatisticsList.add(teacherStatistics);
        }
        return teacherStatisticsList;
    }

    private List<AdminStatistics.StudentStatistics> calcAdminStudentStatistics() throws StudentNotExistException {
        List<AdminStatistics.StudentStatistics> studentStatisticsList = new ArrayList<>();
        List<StudentEntity> studentEntityList = studentService.getAllStudents();
        if (studentEntityList == null || studentEntityList.isEmpty()) return null;

        long logInSum = 0;
        double logInAvg;
        long dropSum = 0;
        double dropAvg;
        long selectSum = 0;
        double selectAvg;
        for (StudentEntity studentEntity : studentEntityList) {
            if (studentEntity.getLoggedInTimes() != null)
                logInSum += studentEntity.getLoggedInTimes();
            List<SelectionEntity> selectionEntityList =
                    selectionService.getActiveSelectionOf(studentEntity.getStudentEmail());
            if (selectionEntityList == null || selectionEntityList.isEmpty())
                continue;
            selectSum += selectionEntityList.size();
            for (SelectionEntity selectionEntity : selectionEntityList) {
                if (selectionEntity.getSelectionState().equals(SelectionState.DROPPED)) {
                    dropSum++;
                }
            }

        }
        logInAvg =( (double) logInSum / (studentEntityList.size() == 0 ? 1 : studentEntityList.size()));
        dropAvg =  ((double)dropSum / (studentEntityList.size() == 0 ? 1 : studentEntityList.size()));
        selectAvg =  ((double)selectSum / studentEntityList.size() == 0 ? 1 : studentEntityList.size());

        for (StudentEntity studentEntity : studentEntityList) {
            AdminStatistics.StudentStatistics studentStatistics = new AdminStatistics.StudentStatistics();

            String studentName = studentEntity.getName();
            String studentEmail = studentEntity.getStudentEmail();
            long dropped = 0;
            long loggedIn = studentEntity.getLoggedInTimes();
            long selected = selectionService.getAllSelectionOf(studentEmail).size();
            double droppedAvgProportion;
            double loggedInAvgProportion = (studentEntity.getLoggedInTimes() / (logInAvg == 0 ? 1 : logInAvg));
            double selectedAvgProportion;
            Date recentLogInTime = studentEntity.getLastLogInDate();
            Date registryTime = studentEntity.getRegistryTime();
            List<AdminStatistics.StudentStatistics.SimplifySelection> simplifySelectionList = new ArrayList<>();

            List<SelectionEntity> selectionEntityList =
                    selectionService.getAllSelectionOf(studentEntity.getStudentEmail());

            for (SelectionEntity selectionEntity : selectionEntityList) {
                if (selectionEntity.getSelectionState().equals(SelectionState.DROPPED)) {
                    dropped++;
                }

                AdminStatistics.StudentStatistics.SimplifySelection simplifySelection =
                        new AdminStatistics.StudentStatistics.SimplifySelection();

                simplifySelection.setCourseName(selectionEntity.getReleasementEntity().getCourseEntity().getName());
                simplifySelection.setScore(selectionEntity.getScore() == null ? 0 : selectionEntity.getScore());
                simplifySelection.setSelectionState(selectionEntity.getSelectionState());
                simplifySelection.setSelectTime(selectionEntity.getSelectTime());

                simplifySelectionList.add(simplifySelection);
            }

            droppedAvgProportion = dropped / (dropAvg == 0 ? 1 : dropAvg);
            selectedAvgProportion = selected / (selectAvg == 0 ? 1 : selectAvg);

            studentStatistics.setStudentName(studentName);
            studentStatistics.setStudentEmail(studentEmail);
            studentStatistics.setDropped(dropped);
            studentStatistics.setDroppedAvgProportion(droppedAvgProportion);
            studentStatistics.setLoggedIn(loggedIn);
            studentStatistics.setLoggedInAvgProportion(loggedInAvgProportion);
            studentStatistics.setRecentLogInTime(recentLogInTime);
            studentStatistics.setRegistryTime(registryTime);
            studentStatistics.setSelected(selected);
            studentStatistics.setSelectedAvgProportion(selectedAvgProportion);
            studentStatistics.setSimplifySelectionList(simplifySelectionList);
            studentStatisticsList.add(studentStatistics);
        }


        return studentStatisticsList;
    }

    private AdminStatistics.OutlineStatistics calcAdminOutlineStatistics() {
        AdminStatistics.OutlineStatistics outlineStatistics = new AdminStatistics.OutlineStatistics();


        long created = this.courseService.getAllCourses().size();
        long approved = 0;
        long rejected = 0;
        long released = this.releasementService.getAll().size();
        for (CourseEntity courseEntity : this.courseService.getAllCourses()) {
            if (courseEntity.getApprovalState().equals(ApprovalState.APPROVED))
                approved++;
            if (courseEntity.getApprovalState().equals(ApprovalState.REJECTED))
                rejected++;
        }
        for (ReleasementEntity releasementEntity : this.releasementService.getAll()) {
            if (releasementEntity.getApprovalState().equals(ApprovalState.APPROVED))
                approved++;
            if (releasementEntity.getApprovalState().equals(ApprovalState.REJECTED))
                rejected++;
        }

        outlineStatistics.setApproved(approved);
        outlineStatistics.setCreated(created);
        outlineStatistics.setRejected(rejected);
        outlineStatistics.setReleased(released);
        outlineStatistics.setRejectedApprovedProportion( ((double)rejected / (approved == 0 ? 1 : approved)));
        outlineStatistics.setReleasedCreatedProportion( ((double)released / (created == 0 ? 1 : created)));

        List<StudentEntity> studentEntityList = studentService.getAllStudents();
        List<TeacherEntity> teacherEntityList = teacherService.getAllTeachers();
        outlineStatistics.setStudent((long) studentEntityList.size());
        outlineStatistics.setTeacher((long) teacherEntityList.size());
        outlineStatistics.setStudentTeacherProportion( ((double)studentEntityList.size() / (teacherEntityList.size() == 0 ? 1 : teacherEntityList.size())));
        long allUserLogIn = 0;
        long teacherRegistryLast7 = 0;
        long allUserRegistry = 0;
        long studentLogInLast7 = 0;
        long teacherLogInLast7 = 0;
        long studentRegistryLast7 = 0;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, -7);
        System.out.println(calendar.toString());
        long last7Time = calendar.getTime().getTime();

        calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -7);
        long last14Time = calendar.getTime().getTime();

        for (StudentEntity studentEntity : studentEntityList) {
            if (studentEntity.getRegistryTime() != null && studentEntity.getRegistryTime().getTime() >= last14Time && studentEntity.getRegistryTime().getTime() <= last7Time) {
                allUserRegistry++;
            }
            if (studentEntity.getLastLogInDate() != null && studentEntity.getLastLogInDate().getTime() >= last14Time && studentEntity.getLastLogInDate().getTime() <= last7Time) {
                allUserLogIn++;
            }
            if (studentEntity.getRegistryTime() != null && studentEntity.getRegistryTime().getTime() >= last7Time) {
                studentRegistryLast7++;
            }
            if (studentEntity.getLastLogInDate() != null && studentEntity.getLastLogInDate().getTime() >= last7Time) {
                studentLogInLast7++;
            }
        }
        for (TeacherEntity teacherEntity : teacherEntityList) {
            if (teacherEntity.getRegistryTime() != null && teacherEntity.getRegistryTime().getTime() >= last14Time && teacherEntity.getRegistryTime().getTime() <= last7Time) {
                allUserRegistry++;
            }
            if (teacherEntity.getLastLogInDate() != null && teacherEntity.getLastLogInDate().getTime() >= last14Time && teacherEntity.getLastLogInDate().getTime() <= last7Time) {
                allUserLogIn++;
            }
            if (teacherEntity.getRegistryTime() != null && teacherEntity.getRegistryTime().getTime() >= last7Time) {
                teacherRegistryLast7++;
            }
            if (teacherEntity.getLastLogInDate() != null && teacherEntity.getLastLogInDate().getTime() >= last7Time) {
                teacherLogInLast7++;
            }
        }

        outlineStatistics.setAllUserLogInCompareToLast7(((double) (teacherLogInLast7 + studentLogInLast7) / (allUserLogIn == 0 ? 1 : allUserLogIn)));
        outlineStatistics.setAllUserRegistryCompareToLast7( ((double)(teacherRegistryLast7 + studentRegistryLast7) / (allUserRegistry == 0 ? 1 : allUserRegistry)));
        outlineStatistics.setStudentLogInLast7(studentLogInLast7);
        outlineStatistics.setTeacherLogInLast7(teacherLogInLast7);
        outlineStatistics.setStudentRegistryLast7(studentRegistryLast7);
        outlineStatistics.setTeacherRegistryLast7(teacherRegistryLast7);
        return outlineStatistics;
    }

    private List<TeacherStatistics.SemesterStatistics> calcTeacherSemesterStatisticsList(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        Map<String, List<ReleasementEntity>> releasementMap = new HashMap<>();
        Map<String, List<CourseEntity>> courseMap = new HashMap<>();
        for (ReleasementEntity releasementEntity : releasementService.getReleasementOf(teacherEntity.getTeacherEmail())) {
            String dateStr = DateUtils.toDateString(releasementEntity.getEffectiveTime());  // return YYYY-MM-DD
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


        List<TeacherStatistics.SemesterStatistics> semesterStatisticsList = new ArrayList<>();
        for (String semester : releasementMap.keySet()) {
            List<ReleasementEntity> releasementEntityList = releasementMap.get(semester);
            TeacherStatistics.SemesterStatistics semesterStatistics = new TeacherStatistics.SemesterStatistics();
            semesterStatistics.setCreated((long) courseMap.get(semester).size());
            semesterStatistics.setSemester(semester);
            semesterStatistics.setReleased((long) releasementEntityList.size());

            long selected = 0;
            List<TeacherStatistics.SemesterStatistics.SimplifyReleasement> simplifyReleasementList = new ArrayList<>();
            for (ReleasementEntity releasementEntity : releasementEntityList) {
                List<SelectionEntity> selectionEntityList =
                        selectionService.getAllSelectionOfReleasement(releasementEntity.getRid());

                selected += selectionEntityList.size();


                TeacherStatistics.SemesterStatistics.SimplifyReleasement simplifyReleasement =
                        new TeacherStatistics.SemesterStatistics.SimplifyReleasement();
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

    private List<TeacherStatistics.ReleasementStatistics> calcTeacherReleasementStatisticsList(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        List<TeacherStatistics.ReleasementStatistics> releasementStatisticsList = new ArrayList<>();
        for (ReleasementEntity releasementEntity : releasementService.getReleasementOf(teacherEntity.getTeacherEmail())) {
            TeacherStatistics.ReleasementStatistics releasementStatistics = new TeacherStatistics.ReleasementStatistics();
            List<SelectionEntity> selectionEntityList =
                    selectionService.getAllSelectionOfReleasement(releasementEntity.getRid());
            releasementStatistics.setCourseName(releasementEntity.getCourseEntity().getName());
            long commented = 0;
            long downloaded = 0;
            long submitted = 0;
            for (ForumEntity forumEntity : releasementEntity.getForumEntityList()) {
                commented += calcCommented(forumEntity.getCommentEntityList());
            }

            for (SlideEntity slideEntity : releasementEntity.getSlideEntityList()) {
                if (slideEntity.getDownloadTimes() != null)
                    downloaded += slideEntity.getDownloadTimes();
            }

            for (AssignmentEntity assignmentEntity : releasementEntity.getAssignmentEntityList()) {
                submitted += assignmentEntity.getSubmissionEntityList().size();
            }

            releasementStatistics.setCommented(commented);
            releasementStatistics.setDownloaded(downloaded);
            releasementStatistics.setSelected((long) selectionEntityList.size());
            releasementStatistics.setSubmitted(submitted);

            List<TeacherStatistics.ReleasementStatistics.SimplifySelection> simplifySelectionList = new ArrayList<>();
            for (SelectionEntity selectionEntity : selectionEntityList) {
                TeacherStatistics.ReleasementStatistics.SimplifySelection simplifySelection =
                        new TeacherStatistics.ReleasementStatistics.SimplifySelection();
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

    private TeacherStatistics.OutlineStatistics calcTeacherOutlineStatistics(TeacherEntity teacherEntity) throws TeacherNotExistException, ReleasementNotExistException {
        TeacherStatistics.OutlineStatistics outlineStatistics = new TeacherStatistics.OutlineStatistics();
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

            selected += selectionService.getAllSelectionOfReleasement(releasementEntity.getRid()).size();
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
