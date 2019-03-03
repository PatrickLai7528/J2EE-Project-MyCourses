package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName ReleasementDateException
 * @Author Lai Kin Meng
 * @Date  2019-03-03
 * @ProjectName MyCoursesServer
 */

public class ReleasementDateException extends Exception {
    public ReleasementDateException() {
        super("課程發佈的日期錯誤");
    }

    public ReleasementDateException(String message) {
        super(message);
    }

}
