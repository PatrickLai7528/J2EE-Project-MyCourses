package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName ForumController
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.aspect.LoggerAspect;
import com.MyCourses.exceptions.DateStringFormatException;
import com.MyCourses.exceptions.ForumNotExistException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import com.MyCourses.utils.DateUtils;
import com.MyCourses.utils.ResponseUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("forum")
public class ForumController {

    private final IForumService forumService;

    private final static Logger logger = LoggerFactory.getLogger(ForumController.class);

    @Autowired
    public ForumController(IForumService forumService) {
        this.forumService = forumService;
    }

    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<Object> addForum(@RequestParam(name = "topic") String topic,
                                        @RequestParam(name = "rid") Long rid,
                                        @RequestParam(name = "questioner") String questioner) {
        try {
            forumService.addForum(topic, questioner, rid);
            return ResponseUtils.ok("操作成功");
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.notOk(e.getLocalizedMessage());
        }
    }

    @PostMapping("comment")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<Object> comment(@RequestParam(name = "fid") Long fid,
                                       @RequestParam(name = "from") String messageFrom,
                                       @RequestParam(name = "content") String content,
                                       @RequestParam(name = "rid") Long rid,
                                       @RequestParam(name = "replyTo", required = false) Long replyToCommentId
    ) {
        try {
            forumService.comment(rid, fid, replyToCommentId, messageFrom, content);
            return ResponseUtils.ok("操作成功");
        } catch (ForumNotExistException | ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage());
        }
    }
}
