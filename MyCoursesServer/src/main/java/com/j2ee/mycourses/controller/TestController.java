package com.j2ee.mycourses.controller;/*
 * @PackageName com.j2ee.mycourses.controller
 * @ClassName TestController
 * @Author Lai Kin Meng
 * @Date 2019-02-13
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.ICommentDao;
import com.j2ee.mycourses.dao.impl.CommentDao;
import com.j2ee.mycourses.entity.CommentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class TestController {

    private final ICommentDao commentDao;

    @Autowired
    public TestController(ICommentDao commentDao) {
        this.commentDao = commentDao;
    }

    @RequestMapping("/")
    public String test() {
        return "test";
    }

    @RequestMapping("/test")
    public String tryThis(@RequestBody CommentEntity commentEntity) {
        commentDao.create(commentEntity);

        return "fuck";
    }
}
