package com.MyCourses.exceptions;/*
 * @PackageName com.MyCourses.exceptions
 * @ClassName UnexpectedReleaseConfig
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

public class UnexpectedReleaseConfig extends Exception {
    public UnexpectedReleaseConfig(){
        super("未知配置錯誤");
    }

    public UnexpectedReleaseConfig(String message){
      super(message);
    }
}
