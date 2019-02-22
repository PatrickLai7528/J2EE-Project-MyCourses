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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Controller
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
    public ResponseEntity<APIResponse<List<CourseEntity>>> getAllCourses() {
        return new ResponseEntity<>(
                ResponseUtils.ok("操作成功", courseService.getAllCourses()),
                HttpStatus.OK
        );
    }

    @GetMapping("of")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<APIResponse<List<CourseEntity>>> getCoursesOf(@RequestParam(name = "teacherEmail") String teacherEmail) {
        try {
            List<CourseEntity> courseEntityList = courseService.getCoursesByTeacherEmail(teacherEmail);
            return new ResponseEntity<>(
                    ResponseUtils.ok("操作成功", courseEntityList), HttpStatus.OK
            );
        } catch (TeacherNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    (APIResponse<List<CourseEntity>>) ResponseUtils.error(e.getLocalizedMessage(),
                            Collections.EMPTY_LIST),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<APIResponse<Object>> addCourse(
            @RequestParam(name = "teacherEmail") String teacherEmail,
            @RequestParam(name = "courseName") String courseName
    ) {
        try {
            CourseEntity courseEntity = new CourseEntity();
            TeacherEntity teacherFound = teacherService.getByEmail(teacherEmail);
            courseEntity.setTeacherEntity(teacherFound);
            courseEntity.setName(courseName);
            courseService.add(courseEntity);
            return new ResponseEntity<>(
                    ResponseUtils.ok("添加成功"),
                    HttpStatus.OK
            );
        } catch (CourseHasNoTeacherException | TeacherNotExistException e) {
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
