package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName SelectionFailExceptions
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

public class SelectionFailExceptions extends Exception {
    public SelectionFailExceptions(){
        super("選課失敗");
    }

    public SelectionFailExceptions(String message){
        super(message);
    }
}
