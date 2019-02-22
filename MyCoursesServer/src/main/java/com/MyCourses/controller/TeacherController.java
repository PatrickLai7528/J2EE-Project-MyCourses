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

@Controller
@RequestMapping("teacher")
public class TeacherController {
    private final ITeacherService teacherService;
    private final IVerifyService verifyService;

    @Autowired
    public TeacherController(ITeacherService articleService, IVerifyService verifyService) {
        this.teacherService = articleService;
        this.verifyService = verifyService;
    }

//    @GetMapping("article/{email}")
//    public ResponseEntity<TeacherEntity> getTeacherByEmail(@PathVariable("email") String email) {
//        TeacherEntity teacherEntity = teacherService.getEmail(email);
//        return new ResponseEntity<>(teacherEntity, HttpStatus.OK);
//    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("all")
    @VerifyToken
    @PleaseLog
    public ResponseEntity<APIResponse<List<TeacherEntity>>> getAllTeachers() {
        List<TeacherEntity> list = teacherService.getAllTeachers();
        return new ResponseEntity<>(ResponseUtils.ok("成功", list), HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("registry/{code}")
    @PleaseLog
    public ResponseEntity<APIResponse<Object>> registry(@RequestBody TeacherEntity teacherEntity, @PathVariable(name
            = "code") String code) {
        try {
            boolean isValid = verifyService.verify(teacherEntity.getTeacherEmail(), code);
            if (isValid) {
                teacherService.registry(teacherEntity);
                return new ResponseEntity<>(ResponseUtils.ok("注冊成功"), HttpStatus.OK);
            } else
                return new ResponseEntity<>(ResponseUtils.ok("驗證碼錯誤"), HttpStatus.OK);
        } catch (TeacherRepeatedException | VerificationException e) {
            e.printStackTrace();
            return new ResponseEntity<>(ResponseUtils.error(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(builder.path("/teacherEntity/{id}").buildAndExpand(teacherEntity.getTeacherEmail()).toUri());
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("login")
    @GenerateToken
    @PleaseLog
    public ResponseEntity<APIResponse<Object>> logIn(@RequestBody TeacherEntity teacherEntity) {
        try {
            boolean flag = teacherService.logIn(teacherEntity);
            if (flag)
                return new ResponseEntity<>(
                        ResponseUtils.ok("登錄成功"),
                        HttpStatus.OK
                );
            else
                return new ResponseEntity<>(
                        ResponseUtils.notOk("登錄失敗"),
                        HttpStatus.OK
                );
        } catch (TeacherNotExistException e) {
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

//    @PutMapping("article")
//    public ResponseEntity<TeacherEntity> updateArticle(@RequestBody TeacherEntity teacherEntity) {
//        teacherService.updateTeacher(teacherEntity);
//        return new ResponseEntity<>(teacherEntity, HttpStatus.OK);
//    }

//    @DeleteMapping("article/{email}")
//    public ResponseEntity<Void> deleteArticle(@PathVariable("email") String email) {
//        teacherService.deleteTeacher(email);
//        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//    }
} 
