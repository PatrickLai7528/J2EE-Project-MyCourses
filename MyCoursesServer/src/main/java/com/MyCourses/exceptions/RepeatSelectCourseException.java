package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName RepeatSelectCourseException
 * @Author Lai Kin Meng
 * @Date 2019-02-26
 * @ProjectName MyCoursesServer
 */

public class RepeatSelectCourseException extends Exception {
    public RepeatSelectCourseException() {
        super("重覆選課");
    }

    public RepeatSelectCourseException(String message) {
        super(message);
    }
}
