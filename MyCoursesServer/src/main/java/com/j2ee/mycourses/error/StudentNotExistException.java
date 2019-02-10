package com.j2ee.mycourses.error;/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName StudentNotExistException
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

public class StudentNotExistException extends Exception {
    public StudentNotExistException(){
        super("學生不存在");
    }

    public StudentNotExistException(String message){
        super(message);
    }

}
