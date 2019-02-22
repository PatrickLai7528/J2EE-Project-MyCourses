package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName VerifyController
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.VerifyMailSendingException;
import com.MyCourses.service.IVerifyService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("verify")
public class VerifyController {
    private final IVerifyService verifyService;

    @Autowired
    public VerifyController(IVerifyService verifyService) {
        this.verifyService = verifyService;
    }

    @PleaseLog
    @PostMapping("mail")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<APIResponse<Object>> sendMail(@RequestParam(name = "email") String email) {
        try {
            verifyService.sendRegistryVerifyMail(email);
            return new ResponseEntity<>(
                    ResponseUtils.ok("發送成功"), HttpStatus.OK
            );
        } catch (VerifyMailSendingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    ResponseUtils.error(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
