package com.j2ee.mycourses.error;/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName TeacherRepeatedException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class TeacherRepeatedException extends Exception {
    public TeacherRepeatedException() {
        super();
    }

    public TeacherRepeatedException(String message) {
        super(message);
    }
}
