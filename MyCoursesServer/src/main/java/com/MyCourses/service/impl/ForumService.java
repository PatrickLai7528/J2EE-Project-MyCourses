package com.MyCourses.service.impl;/*
 * @PackageName com.MyCourses.service.impl
 * @ClassName ForumService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.controller.ForumController;
import com.MyCourses.dao.*;
import com.MyCourses.entity.*;
import com.MyCourses.exceptions.ForumNotExistException;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.service.IForumService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ForumService implements IForumService {

    private final IReleasementDAO releasementDAO;
    private final ITeacherDAO teacherDAO;
    private final IStudentDAO studentDAO;
    private final IForumDAO forumDAO;
    private final ICommentDAO commentDAO;

    @Autowired
    public ForumService(IReleasementDAO releasementDAO, ITeacherDAO teacherDAO, IStudentDAO studentDAO, IForumDAO forumDAO, ICommentDAO commentDAO) {
        this.releasementDAO = releasementDAO;
        this.teacherDAO = teacherDAO;
        this.studentDAO = studentDAO;
        this.forumDAO = forumDAO;
        this.commentDAO = commentDAO;
    }

    @Override
    public ForumEntity retrieveByFid(Long fid) throws ForumNotExistException {
        ForumEntity forumEntity = forumDAO.retrieveByFid(fid);
        if (forumEntity == null)
            throw new ForumNotExistException();
        return forumEntity;
    }

    @Override
    public void addForum(String topic, String questioner, Long rid) throws ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null) throw new ReleasementNotExistException();

        TeacherEntity teacherEntity = teacherDAO.retrieveByEmail(questioner);
        StudentEntity studentEntity = studentDAO.retrieveByEmail(questioner);
        if (teacherEntity != null && studentEntity != null) {
            throw new IllegalStateException("學生和老師的郵箱相同");
        }


        List<ForumEntity> forumEntityList = releasementEntity.getForumEntityList();
        if (forumEntityList == null)
            forumEntityList = new ArrayList<>();

        ForumEntity forumEntity = new ForumEntity();
        forumEntity.setTopic(topic);
        forumEntity.setAddTime(new Date());

        if (teacherEntity != null) {
            forumEntity.setQuestionerTeacher(teacherEntity);
        }
        if (studentEntity != null) {
            forumEntity.setQuestionerStudent(studentEntity);
        }

        forumEntityList.add(forumEntity);

        releasementEntity.setForumEntityList(forumEntityList);

        releasementDAO.update(releasementEntity);
    }

    @Override
    public void comment(Long rid, Long fid, Long replyToCommentId, String messageFrom, String content) throws ForumNotExistException, ReleasementNotExistException {
        ReleasementEntity releasementEntity = releasementDAO.retrieveByRid(rid);
        if (releasementEntity == null)
            throw new ReleasementNotExistException();

        TeacherEntity messageFromTeacher = teacherDAO.retrieveByEmail(messageFrom);
        StudentEntity messageFromStudent = studentDAO.retrieveByEmail(messageFrom);

        for (ForumEntity forumEntity : releasementEntity.getForumEntityList()) {
            if (forumEntity.getFid().equals(fid)) {
                if (messageFromTeacher != null && messageFromStudent != null) {
                    throw new IllegalStateException("學生和老師的郵箱相同");
                }

                CommentEntity commentEntity = new CommentEntity();

                if (messageFromTeacher != null) commentEntity.setMessageFromTeacher(messageFromTeacher);
                if (messageFromStudent != null) commentEntity.setMessageFromStudent(messageFromStudent);

                commentEntity.setContent(content);
                commentEntity.setCommentTime(new Date());

                List<CommentEntity> commentEntityList = forumEntity.getCommentEntityList();
                if (commentEntityList == null) commentEntityList = new ArrayList<>();
                // directly reply to forum
                if (replyToCommentId == null) {

                    commentEntityList.add(commentEntity);
                    forumEntity.setCommentEntityList(commentEntityList);
                } else {
                    CommentEntity replyToThisComment = commentDAO.retrieveByCmid(replyToCommentId);
                    List<CommentEntity> belowCommentList = replyToThisComment.getBelowCommentList();
                    if (belowCommentList == null)
                        belowCommentList = new ArrayList<>();
                    belowCommentList.add(commentEntity);
                    replyToThisComment.setBelowCommentList(belowCommentList);
                    commentDAO.update(replyToThisComment);
                }
                releasementDAO.update(releasementEntity);
                return;
            }
        }
        throw new ForumNotExistException();
//        ForumEntity forumEntity = forumDAO.retrieveByFid(fid);
//        if (forumEntity == null) throw new ForumNotExistException();

    }
}
