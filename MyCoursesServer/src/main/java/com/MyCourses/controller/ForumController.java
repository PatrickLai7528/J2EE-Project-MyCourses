package com.MyCourses.controller;/*
 * @PackageName com.MyCourses.controller
 * @ClassName ForumController
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.annotations.PleaseLog;
import com.MyCourses.entity.ForumEntity;
import com.MyCourses.entity.ReleasementEntity;
import com.MyCourses.exceptions.ForumNotExistException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import com.MyCourses.service.IReleasementService;
import com.MyCourses.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("forum")
public class ForumController {

    private final IForumService forumService;
    private final IReleasementService releasementService;


    @Autowired
    public ForumController(IForumService forumService, IReleasementService releasementService) {
        this.forumService = forumService;
        this.releasementService = releasementService;
    }

    @PostMapping("add")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<ReleasementEntity> addForum(@RequestParam(name = "topic") String topic,
                                                   @RequestParam(name = "rid") Long rid,
                                                   @RequestParam(name = "questioner") String questioner) {
        try {
            forumService.addForum(topic, questioner, rid);
            ReleasementEntity releasementEntity = releasementService.getReleasementByRid(rid);
            return ResponseUtils.ok("操作成功", releasementEntity);
        } catch (ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.notOk(e.getLocalizedMessage(), null);
        }
    }

    @PostMapping("comment")
    @PleaseLog
    @CrossOrigin(origins = "http://localhost:3000")
    public APIResponse<ForumEntity> comment(@RequestParam(name = "fid") Long fid,
                                            @RequestParam(name = "from") String messageFrom,
                                            @RequestParam(name = "content") String content,
                                            @RequestParam(name = "rid") Long rid,
                                            @RequestParam(name = "replyTo", required = false) Long replyToCommentId
    ) {
        try {
            forumService.comment(rid, fid, replyToCommentId, messageFrom, content);
            ForumEntity forumEntity = forumService.retrieveByFid(fid);
            return ResponseUtils.ok("操作成功", forumEntity);
        } catch (ForumNotExistException | ReleasementNotExistException e) {
            e.printStackTrace();
            return ResponseUtils.error(e.getLocalizedMessage(), null);
        }
    }
}
