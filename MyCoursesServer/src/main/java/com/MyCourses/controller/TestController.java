package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName TestController
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.MailSendingException;
import com.MyCourses.service.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("test")
public class TestController {

    private final IMailService mailService;

    @Autowired
    public TestController(IMailService mailService) {
        this.mailService = mailService;
    }

    @CrossOrigin
    @PleaseLog
    @PostMapping("mail")
    public String mail() throws MailSendingException {
        mailService.sendSimpleMail("laikinemngpatrick@gmail.com", "simple mail test", "simple mail content");
        return "ok";
    }
}
