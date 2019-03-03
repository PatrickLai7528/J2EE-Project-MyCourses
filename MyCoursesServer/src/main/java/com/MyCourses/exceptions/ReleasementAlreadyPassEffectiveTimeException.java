package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName ReleasementAlreadyPassEffectiveTimeException
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

public class ReleasementAlreadyPassEffectiveTimeException extends Exception {
    public ReleasementAlreadyPassEffectiveTimeException() {
        super("課程已經開始了");
    }

    public ReleasementAlreadyPassEffectiveTimeException(String message) {
        super(message);
    }
}
