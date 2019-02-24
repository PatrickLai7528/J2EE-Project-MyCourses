package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName FileEmptyException
 * @Author Lai Kin Meng
 * @Date 2019-02-24
 * @ProjectName MyCoursesServer
 */

public class FileEmptyException extends Exception {
    public FileEmptyException() {
        super("文件為空");
    }

    public FileEmptyException(String message) {
        super(message);
    }
}
