package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IForumService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.ForumEntity;
import com.MyCourses.exceptions.ForumNotExistException;
import com.MyCourses.exceptions.ReleasementNotExistException;

import java.util.Date;


public interface IForumService {

    ForumEntity retrieveByFid(Long fid) throws ForumNotExistException;

    void addForum(String topic, String questioner, Long rid) throws ReleasementNotExistException;

    void comment(Long rid, Long fid, Long replyCommentId, String messageFrom, String content) throws ReleasementNotExistException, ForumNotExistException;
}
