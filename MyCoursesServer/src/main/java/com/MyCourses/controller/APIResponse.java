package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName APIResponse
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import lombok.Data;

@Data
public class APIResponse<T> {
    private int code;
    private String message;
    private T payload;
}
