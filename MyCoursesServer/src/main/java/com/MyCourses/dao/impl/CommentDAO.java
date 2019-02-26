package com.MyCourses.dao.impl;/*
 * @PackageName com.MyCourses.dao.impl
 * @ClassName CommentDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-26
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.dao.ICommentDAO;
import com.MyCourses.entity.CommentEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class CommentDAO implements ICommentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(CommentEntity commentEntity) {
        entityManager.persist(entityManager);
    }

    @Override
    public List<CommentEntity> retrieveAll() {
        String hql = "from CommentEntity as c ORDER BY c.cmid";
        List<CommentEntity> ret = (List<CommentEntity>) entityManager.createQuery(hql).getResultList();
        return ret;
    }

    @Override
    public void update(CommentEntity commentEntity) {
        CommentEntity c = retrieveByCmid(commentEntity.getCmid());
        c.setMessageFromStudent(commentEntity.getMessageFromStudent());
        c.setMessageFromTeacher(commentEntity.getMessageFromTeacher());
        c.setContent(commentEntity.getContent());
        c.setBelowCommentList(commentEntity.getBelowCommentList());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(CommentEntity commentEntity) {
        entityManager.remove(commentEntity);
    }

    @Override
    public CommentEntity retrieveByCmid(Long cmid) {
        return entityManager.find(CommentEntity.class, cmid);
    }
}
