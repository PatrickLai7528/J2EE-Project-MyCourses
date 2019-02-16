package com.j2ee.mycourses.controller;/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName TryController
 * @Author Lai Kin Meng
 * @Date 2019-02-16
 * @ProjectName MyCoursesServer2
 */

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TryController {

    @RequestMapping("/")
    public String fuckYouUp() {
        return "fuck you up";
    }
}
