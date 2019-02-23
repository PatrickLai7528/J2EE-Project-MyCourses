package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName DateStringFormatException
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

public class DateStringFormatException extends Exception {
    public DateStringFormatException() {
        super("日期字符串格式有錯誤");
    }

    public DateStringFormatException(String message) {
        super(message);
    }
}
