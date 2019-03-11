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

@RestController
@RequestMapping("student")
public class StudentController {

    private final IStudentService studentService;
    private final IVerifyService verifyService;

    @Autowired
    public StudentController(IStudentService studentService, IVerifyService verifyService) {
        this.studentService = studentService;
        this.verifyService = verifyService;
    }

    @GetMapping("get")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    @PleaseLog
    public APIResponse<StudentEntity> getStudentByEmail(@RequestParam(name = "email") String email) {
        try {
            StudentEntity studentEntity = studentService.getByEmail(email);
            return ResponseUtils.ok("操作成功", studentEntity);
        } catch (StudentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @PostMapping("update")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    @PleaseLog
    public APIResponse<StudentEntity> updateStudent(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "no", required = false) String no,
            @RequestParam(name = "newName", required = false) String newName,
            @RequestParam(name = "oldPassword", required = false) String oldPassword,
            @RequestParam(name = "newPassword", required = false) String newPassword
    ) {
        try {
            studentService.update(email, no, newName, oldPassword, newPassword);
            return ResponseUtils.ok("操作成功", studentService.getByEmail(email));
        } catch (StudentNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }

    @GetMapping("all")
    @CrossOrigin(origins = "http://localhost:3000")
    @VerifyToken
    @PleaseLog
    public APIResponse<List<StudentEntity>> getAllStudents() {
        List<StudentEntity> list = studentService.getAllStudents();
        return ResponseUtils.ok("成功", list);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("registry/{code}")
    @PleaseLog
    public APIResponse<Object> registry(@RequestBody StudentEntity studentEntity, @PathVariable(name
            = "code") String code) {
        try {
            boolean isValid = verifyService.verify(studentEntity.getStudentEmail(), code);
            if (isValid) {
                studentService.registry(studentEntity);
                return ResponseUtils.ok("注冊成功");
            } else {
                return ResponseUtils.notOk("驗證碼錯誤");
            }
        } catch (StudentRepeatedException | VerificationException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("login")
    @GenerateToken
    @PleaseLog
    public APIResponse<Object> logIn(@RequestBody StudentEntity studentEntity) {
        try {
            System.out.println(studentEntity);
            boolean flag = studentService.logIn(studentEntity);
            if (flag) {
                return ResponseUtils.ok("登錄成功", studentEntity.getStudentEmail());
            } else {
                return ResponseUtils.notOk("登錄失敗");
            }
        } catch (StudentNotExistException e) {
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
