package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IMailService
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.exceptions.MailSendingException;

public interface IMailService {

    void sendSimpleMail(String to, String subject, String content) throws MailSendingException;

}
