package com.MyCourses.controller;


/*
 * @PackageName com.MyCourses.controller
 * @ClassName CourseController
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */


import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.CourseHasNoTeacherException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.service.ICourseService;
import com.MyCourses.service.ITeacherService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("course")
public class CourseController {
    private final ICourseService courseService;
    private ITeacherService teacherService;

    @Autowired
    public CourseController(ICourseService courseService, ITeacherService teacherService) {
        this.courseService = courseService;
        this.teacherService = teacherService;
    }

    @GetMapping("all")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<List<CourseEntity>> getAllCourses() {
        return ResponseUtils.ok("操作成功", courseService.getAllCourses());
    }

    @GetMapping("of")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<List<CourseEntity>> getCoursesOf(@RequestParam(name = "teacherEmail") String teacherEmail) {
        try {
            List<CourseEntity> courseEntityList = courseService.getCoursesByTeacherEmail(teacherEmail);
            return ResponseUtils.ok("操作成功", courseEntityList);
        } catch (TeacherNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }


    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<Object> addCourse(
            @RequestParam(name = "teacherEmail") String teacherEmail,
            @RequestParam(name = "courseName") String courseName
    ) {
        try {
            CourseEntity courseEntity = new CourseEntity();
            TeacherEntity teacherFound = teacherService.getByEmail(teacherEmail);
            courseEntity.setTeacherEntity(teacherFound);
            courseEntity.setName(courseName);
            courseService.add(courseEntity);
            return ResponseUtils.ok("添加成功");
        } catch (CourseHasNoTeacherException | TeacherNotExistException e) {
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }
}
