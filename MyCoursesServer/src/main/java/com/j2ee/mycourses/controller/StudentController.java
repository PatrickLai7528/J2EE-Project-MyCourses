package com.j2ee.mycourses.controller;/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName StudentController
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.error.StudentNotExistException;
import com.j2ee.mycourses.error.StudentRepeatedException;
import com.j2ee.mycourses.service.IUserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/student")
public class StudentController {

    private final IUserAuthService studentService;

    @Autowired
    public StudentController(IUserAuthService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(value = "/registry", method = RequestMethod.POST)
    public APIResponse registry(@RequestBody StudentEntity studentEntity) {
        APIResponse apiResponse = new APIResponse();
        try {
            studentService.registry(studentEntity);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("用戶" + studentEntity.getEmail() + "注冊成功");
        } catch (StudentRepeatedException e) {
            e.printStackTrace();
            apiResponse.setSuccess(false);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public APIResponse logIN(@RequestBody StudentEntity studentEntity) {
        APIResponse apiResponse = new APIResponse();
        try {
            boolean passwordWrong = studentService.logIn(studentEntity);
            if (passwordWrong) {
                apiResponse.setSuccess(false);
                apiResponse.setMessage("沒有找到匹配用戶");
            } else {
                apiResponse.setSuccess(true);
                apiResponse.setMessage("用戶" + studentEntity.getEmail() + "登入成功");
            }
        } catch (StudentNotExistException e) {
            e.printStackTrace();
            apiResponse.setSuccess(false);
            apiResponse.setMessage("沒有找到匹配用戶");
        }
        return apiResponse;
    }
}
