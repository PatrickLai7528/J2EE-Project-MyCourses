package com.MyCourses.exceptions;
/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName CourseHasNoTeacherException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class CourseHasNoTeacherException extends Exception {
    public CourseHasNoTeacherException() {
        super("教師未指定");
    }

    public CourseHasNoTeacherException(String message) {
        super(message);
    }
}
