package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName ForumNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

public class ForumNotExistException extends Exception {
    public ForumNotExistException() {
        super("討論區不存在");
    }

    public ForumNotExistException(String message) {
        super(message);
    }
}
