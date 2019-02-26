package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName ForumDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.IForumDAO;
import com.MyCourses.entity.ForumEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class ForumDAO implements IForumDAO {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public ForumEntity retrieveByFid(Long fid) {
        return entityManager.find(ForumEntity.class, fid);
    }

    @Override
    public void update(ForumEntity forumEntity) {
        ForumEntity f = retrieveByFid(forumEntity.getFid());
        f.setTopic(forumEntity.getTopic());
        f.setQuestionerStudent(forumEntity.getQuestionerStudent());
        f.setQuestionerTeacher(forumEntity.getQuestionerTeacher());
        f.setCommentEntityList(forumEntity.getCommentEntityList());
        entityManager.flush();
    }
}
