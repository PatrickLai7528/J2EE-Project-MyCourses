package com.MyCourses.controller;

import com.MyCourses.annotations.GenerateToken;
import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.TeacherRepeatedException;
import com.MyCourses.exceptions.VerificationException;
import com.MyCourses.service.ITeacherService;
import com.MyCourses.service.IVerifyService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("teacher")
public class TeacherController {
    private final ITeacherService teacherService;
    private final IVerifyService verifyService;

    @Autowired
    public TeacherController(ITeacherService articleService, IVerifyService verifyService) {
        this.teacherService = articleService;
        this.verifyService = verifyService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("all")
    @VerifyToken
    @PleaseLog
    public APIResponse<List<TeacherEntity>> getAllTeachers() {
        List<TeacherEntity> list = teacherService.getAllTeachers();
        return ResponseUtils.ok("成功", list);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("registry/{code}")
    @PleaseLog
    public APIResponse<Object> registry(@RequestBody TeacherEntity teacherEntity, @PathVariable(name
            = "code") String code) {
        try {
            boolean isValid = verifyService.verify(teacherEntity.getTeacherEmail(), code);
            if (isValid) {
                teacherService.registry(teacherEntity);
                return ResponseUtils.ok("注冊成功", null);
            } else
                return ResponseUtils.ok("驗證碼錯誤");
        } catch (TeacherRepeatedException | VerificationException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("login")
    @GenerateToken
    @PleaseLog
    public APIResponse<Object> logIn(@RequestBody TeacherEntity teacherEntity) {
        try {
            boolean flag = teacherService.logIn(teacherEntity);
            if (flag)
                return ResponseUtils.ok("登錄成功");
            else
                return ResponseUtils.notOk("登錄失敗");
        } catch (TeacherNotExistException e) {
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
} 
