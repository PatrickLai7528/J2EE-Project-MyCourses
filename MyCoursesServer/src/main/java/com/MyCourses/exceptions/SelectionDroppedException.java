package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName SelectionDroppedException
 * @Author Lai Kin Meng
 * @Date 2019-03-06
 * @ProjectName MyCoursesServer
 */

public class SelectionDroppedException  extends Exception{
    public SelectionDroppedException(){
        super("已退課");
    }

    public SelectionDroppedException(String messge){
        super(messge);
    }
}
