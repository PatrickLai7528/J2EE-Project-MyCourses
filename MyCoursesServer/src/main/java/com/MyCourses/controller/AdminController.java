package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName AdminController
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.GenerateToken;
import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.AdminEntity;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.*;
import com.MyCourses.service.IAdminService;
import com.MyCourses.service.ICourseService;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController {
    private final IAdminService adminService;
    private final ICourseService courseService;
    private final IReleasementService releasementService;

    @Autowired
    public AdminController(IAdminService adminService, ICourseService courseService, IReleasementService releasementService) {
        this.adminService = adminService;
        this.courseService = courseService;
        this.releasementService = releasementService;
    }


    @GenerateToken
    @PleaseLog
    @PostMapping("login")
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<Object> logIn(@RequestBody AdminEntity adminEntity) {
        boolean isSuccess = false;
        try {
            isSuccess = adminService.logIn(adminEntity);
            if (isSuccess)
                return ResponseUtils.ok("登入成功", "");
            else
                return ResponseUtils.error("登入失敗");
        } catch (AdminNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }


    @PleaseLog
    @PostMapping("approve/course/{cid}")
    @VerifyToken
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<List<CourseEntity>> approveCourse(@PathVariable(name = "cid") Long cid) {
        try {
            adminService.approveCourse(cid);
            return ResponseUtils.ok("操作成功", courseService.getAllCourses());
        } catch (CourseNotExistException | CourseAlreadyReleaseException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PleaseLog
    @PostMapping("reject/course/{cid}")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    public APIResponse<List<CourseEntity>> rejectCourse(@PathVariable(name = "cid") Long cid) {
        try {
            adminService.rejectCourse(cid);
            return ResponseUtils.ok("操作成功", courseService.getAllCourses());
        } catch (CourseNotExistException | CourseAlreadyReleaseException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PleaseLog
    @PostMapping("approve/releasement/{rid}")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    public APIResponse<List<ReleasementEntity>> approveReleasement(@PathVariable(name = "rid") Long rid) {
        try {
            adminService.approveReleasement(rid);
            return ResponseUtils.ok("操作成功", releasementService.getAll());
        } catch (ReleasementNotExistException | ReleasementAlreadyPassEffectiveTimeException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PleaseLog
    @PostMapping("reject/releasement/{rid}")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    public APIResponse<List<ReleasementEntity>> rejectReleasement(@PathVariable(name = "rid") Long rid) {
        try {
            adminService.rejectReleasement(rid);
            return ResponseUtils.ok("操作成功", releasementService.getAll());
        } catch (ReleasementNotExistException | ReleasementAlreadyPassEffectiveTimeException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }


}
