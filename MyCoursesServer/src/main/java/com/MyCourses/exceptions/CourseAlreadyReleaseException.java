package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName CourseAlreadyReleaseException
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

public class CourseAlreadyReleaseException extends Exception {
    public CourseAlreadyReleaseException(){
        super("課程已經發佈");
    }
    public CourseAlreadyReleaseException(String message){
        super(message);
    }
}
