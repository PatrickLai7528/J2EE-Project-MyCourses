package com.j2ee.mycourses.controller;


/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName StudentController
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.error.StudentNotExistException;
import com.j2ee.mycourses.error.StudentRepeatedException;
import com.j2ee.mycourses.error.TeacherRepeatedException;
import com.j2ee.mycourses.service.IUserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth")
public class UserAuthController {

    private final IUserAuthService userAuthService;

    @Autowired
    public UserAuthController(IUserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }


    @CrossOrigin
    @RequestMapping(value = "/student/registry", method = RequestMethod.POST)
    public APIResponse registry(@RequestBody StudentEntity studentEntity) {
        APIResponse apiResponse = new APIResponse();
        try {
            userAuthService.registry(studentEntity);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("用戶" + studentEntity.getEmail() + "注冊成功");
        } catch (StudentRepeatedException e) {
            e.printStackTrace();
            apiResponse.setSuccess(false);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    @CrossOrigin
    @RequestMapping(value = "/student/login", method = RequestMethod.POST)
    public APIResponse logIn(@RequestBody StudentEntity studentEntity) {
        APIResponse apiResponse = new APIResponse();
        try {
            boolean passwordWrong = userAuthService.logIn(studentEntity);
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

    @CrossOrigin
    @RequestMapping(
            value = "/teacher/registry",
            method = RequestMethod.POST
//            produces = {"multipart/form-data"},
//            consumes = {"application/json"}
    )
    public APIResponse registry(TeacherEntity teacherEntity) {
        System.out.println(teacherEntity);
//        System.out.println(reqMap);
//        TeacherEntity teacherEntity = new TeacherEntity();
//        teacherEntity.setTeacherNo((String) reqMap.get("teacherNo"));
//        teacherEntity.setPassword((String) reqMap.get("password"));
//        teacherEntity.setName((String) reqMap.get("name"));
//        teacherEntity.setEmail((String) reqMap.get("email"));
//        TeacherEntity teacherEntity1 = new TeacherEntity();
//        teacherEntity1.setPassword(teacherEntity.getPassword());
//        teacherEntity1.setEmail(teacherEntity.getEmail());
//        teacherEntity1.setName(teacherEntity.getName());
//        teacherEntity1.setTeacherNo(teacherEntity.getName());
        APIResponse apiResponse = new APIResponse();
        try {
            userAuthService.registry(teacherEntity);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("用戶" + teacherEntity.getTeacherEmail() + "注冊成功");
        } catch (TeacherRepeatedException e) {
            e.printStackTrace();
            apiResponse.setSuccess(false);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
//        return null;
    }

    @RequestMapping(value = "/teacher/login", method = RequestMethod.POST)
    public APIResponse logIn(@RequestBody TeacherEntity teacherEntity) {
        return null;
    }
}
