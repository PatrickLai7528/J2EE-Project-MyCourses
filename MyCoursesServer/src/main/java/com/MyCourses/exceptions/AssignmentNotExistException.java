package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName AssignmentNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-27
 * @ProjectName MyCoursesServer
 */

public class AssignmentNotExistException extends Exception {
    public AssignmentNotExistException() {
        super("該作業不存在");
    }

    public AssignmentNotExistException(String message) {
        super(message);
    }
}
