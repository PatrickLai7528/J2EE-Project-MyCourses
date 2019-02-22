package com.MyCourses.exceptions;
/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName TeacherNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class TeacherNotExistException extends Exception {
    public TeacherNotExistException() {
        super("教師不存在");
    }

    public TeacherNotExistException(String message) {
        super(message);
    }

}
