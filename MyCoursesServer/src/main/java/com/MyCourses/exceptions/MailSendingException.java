package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName MailSendingException
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

public class MailSendingException extends Exception {
    public MailSendingException() {
        super("發送郵件時發生異常");
    }

    public MailSendingException(String message) {
        super(message);
    }
}
