package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName AdminNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-03-05
 * @ProjectName MyCoursesServer
 */

public class AdminNotExistException extends Exception {
    public AdminNotExistException() {
        super("管理員不存在");
    }

    public AdminNotExistException(String message) {
        super(message);
    }
}
