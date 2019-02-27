package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName SelectionNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-27
 * @ProjectName MyCoursesServer
 */

public class SelectionNotExistException extends Exception {
    public SelectionNotExistException() {
        super("該選課不存在");
    }

    public SelectionNotExistException(String message) {
        super(message);
    }
}
