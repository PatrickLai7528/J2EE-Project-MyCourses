package com.j2ee.mycourses.error;/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName TeacherNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

public class TeacherNotExistException extends Exception {
    public TeacherNotExistException(){
        super();
    }

    public TeacherNotExistException(String message){
        super(message);
    }

}
