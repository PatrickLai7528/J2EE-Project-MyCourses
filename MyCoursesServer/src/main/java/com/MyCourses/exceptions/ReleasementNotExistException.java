package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName ReleasementNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-23
 * @ProjectName MyCoursesServer
 */

public class ReleasementNotExistException extends Exception {
    public ReleasementNotExistException() {
        super("該開放課程不存");
    }

    public ReleasementNotExistException(String message) {
        super(message);
    }
}
