package com.j2ee.mycourses.error;/*
 * @PackageName com.j2ee.mycourses.error
 * @ClassName StudentRepeatedException
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

public class StudentRepeatedException extends Exception{
    public StudentRepeatedException(){
        super("學生已重覆");
    }

    public StudentRepeatedException(String message){
        super(message);
    }
}
