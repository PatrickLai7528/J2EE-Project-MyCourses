package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName StudentController
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.GenerateToken;
import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.annotations.VerifyToken;
import com.MyCourses.entity.StudentEntity;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.exceptions.StudentRepeatedException;
import com.MyCourses.exceptions.VerificationException;
import com.MyCourses.exceptions.VerifyMailSendingException;
import com.MyCourses.service.IStudentService;
import com.MyCourses.service.IVerifyService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("student")
public class StudentController {

    private final IStudentService studentService;
    private final IVerifyService verifyService;

    @Autowired
    public StudentController(IStudentService studentService, IVerifyService verifyService) {
        this.studentService = studentService;
        this.verifyService = verifyService;
    }

    @GetMapping("all")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    @PleaseLog
    public ResponseEntity<APIResponse<List<StudentEntity>>> getAllStudents() {
        List<StudentEntity> list = studentService.getAllStudents();
        return new ResponseEntity<>(ResponseUtils.ok("成功", list), HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("registry/{code}")
    @PleaseLog
    public ResponseEntity<APIResponse<Object>> registry(@RequestBody StudentEntity studentEntity, @PathVariable(name
            = "code") String code) {
        try {
            boolean isValid = verifyService.verify(studentEntity.getStudentEmail(), code);
            if (isValid) {
                studentService.registry(studentEntity);
                return new ResponseEntity<>(ResponseUtils.ok("注冊成功"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(ResponseUtils.notOk("驗證碼錯誤"), HttpStatus.OK);
            }
        } catch (StudentRepeatedException | VerificationException e) {
            e.printStackTrace();
            return new ResponseEntity<>(ResponseUtils.error(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("login")
    @GenerateToken
    @PleaseLog
    public ResponseEntity<APIResponse<Object>> logIn(@RequestBody StudentEntity studentEntity) {
        try {
            System.out.println(studentEntity);
            boolean flag = studentService.logIn(studentEntity);
            if (flag) {
                return new ResponseEntity<>(
                        ResponseUtils.ok("登錄成功", studentEntity.getStudentEmail()),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        ResponseUtils.notOk("登錄失敗"),
                        HttpStatus.OK
                );
            }
        } catch (StudentNotExistException e) {
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
