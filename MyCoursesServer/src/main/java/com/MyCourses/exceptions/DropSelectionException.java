package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName DropSelectionException
 * @Author Lai Kin Meng
 * @Date 2019-03-05
 * @ProjectName MyCoursesServer
 */

public class DropSelectionException extends Exception {
    public DropSelectionException() {
        super("退選失敗");
    }

    public DropSelectionException(String message) {
        super(message);
    }
}
