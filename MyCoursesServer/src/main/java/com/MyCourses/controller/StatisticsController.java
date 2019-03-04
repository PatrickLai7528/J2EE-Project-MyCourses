package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName StatisticsController
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.AdminStatistics;
import com.MyCourses.entity.TeacherStatistics;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.IStatisticsService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("statistics")
public class StatisticsController {

    private final IStatisticsService statisticsService;

    @Autowired
    public StatisticsController(IStatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @PleaseLog
    @VerifyToken
    @GetMapping("teacher")
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<TeacherStatistics> getTeacherStatistics(@RequestParam(name = "email") String teacherEmail) {
        try {
            TeacherStatistics teacherStatistics = statisticsService.getTeacherStatistics(teacherEmail);
            return ResponseUtils.ok("操作成功", teacherStatistics);
        } catch (TeacherNotExistException | ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PleaseLog
//    @VerifyToken
    @GetMapping("admin")
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<AdminStatistics> getAdminStatistics() {
        try {
            AdminStatistics adminStatistics = statisticsService.getAdminStatistics();
            return ResponseUtils.ok("操作成功", adminStatistics);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

}
