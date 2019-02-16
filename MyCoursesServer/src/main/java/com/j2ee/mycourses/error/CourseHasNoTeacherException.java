package com.j2ee.mycourses.error;/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName CourseHasNoTeacherException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class CourseHasNoTeacherException extends Exception {
    public CourseHasNoTeacherException() {
        super();
    }

    public CourseHasNoTeacherException(String message) {
        super(message);
    }
}
