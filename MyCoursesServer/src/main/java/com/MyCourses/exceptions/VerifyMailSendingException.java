package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName VerifyMailSendingException
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

public class VerifyMailSendingException extends Exception {
    public VerifyMailSendingException() {
        super("發送驗證郵件時發生錯誤");
    }

    public VerifyMailSendingException(String message) {
        super(message);
    }
}
