package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName ScoreOutOfRangeException
 * @Author Lai Kin Meng
 * @Date  2019-03-03
 * @ProjectName MyCoursesServer
 */

public class ScoreOutOfRangeException extends Exception {
    public ScoreOutOfRangeException(){
        super("成績超出範圍");
    }

    public ScoreOutOfRangeException(String message){
        super(message);
    }
}
