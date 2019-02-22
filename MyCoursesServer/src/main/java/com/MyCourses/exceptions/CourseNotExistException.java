package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName CourseNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

public class CourseNotExistException extends Exception {
    public CourseNotExistException() {
        super("課程不存在");
    }

    public CourseNotExistException(String message) {
        super(message);
    }
}
