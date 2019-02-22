package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName VerificationException
 * @Author Lai Kin Meng
 * @Date 2019-02-21
 * @ProjectName spring-boot-demo
 */

public class VerificationException extends Exception {
    public VerificationException() {
        super("驗證時發生錯誤");
    }

    public VerificationException(String message) {
        super(message);
    }
}
