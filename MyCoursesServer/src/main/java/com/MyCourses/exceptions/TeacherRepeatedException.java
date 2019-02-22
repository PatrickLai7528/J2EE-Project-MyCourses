package com.MyCourses.exceptions;
/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName TeacherRepeatedException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class TeacherRepeatedException extends Exception {
    public TeacherRepeatedException() {
        super("老師已重覆");
    }

    public TeacherRepeatedException(String message) {
        super(message);
    }
}
