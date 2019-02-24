package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName ForumController
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("forum")
public class ForumController {

    private final IForumService forumService;

    @Autowired
    public ForumController(IForumService forumService) {
        this.forumService = forumService;
    }

    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<Object> addForum(@RequestParam(name = "topic") String topic,
                                        @RequestParam(name = "rid") Long rid) {
        try {
            forumService.addForum(topic, rid);
            return ResponseUtils.ok("操作成功");
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.notOk(e.getLocalizedMessage());
        }
    }
}
