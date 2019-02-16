package com.j2ee.mycourses.controller;/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName TestController
 * @Author Lai Kin Meng
 * @Date 2019-02-13
 * @ProjectName MyCoursesServer
 */

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class TestController {
    @RequestMapping("/")
    public String test() {
        return "test";
    }

    @RequestMapping("/test")
    public String tryThis() {
        return "should not be accessed";
    }
}
