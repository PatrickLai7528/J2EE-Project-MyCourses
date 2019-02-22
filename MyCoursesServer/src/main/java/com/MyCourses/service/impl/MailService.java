package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service
 * @ClassName MailService
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.StudentEntity;
import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.MailSendingException;
import com.MyCourses.service.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MailService implements IMailService {
    private static final String from = "mycourses_51@163.com";
    private final JavaMailSender mailSender;


    @Autowired
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void sendSimpleMail(String to, String subject, String content) throws MailSendingException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MailSendingException();
        }

    }

}
