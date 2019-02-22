package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName CommentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.ICommentDao;
import com.j2ee.mycourses.entity.CommentEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentDao extends AbstractGeneralDao<CommentEntity> implements ICommentDao {
    @Override
    public CommentEntity retrieveByCmid(long cmid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<CommentEntity> query = session.createQuery("from CommentEntity where cmid = :cmid",
                CommentEntity.class);
        query.setParameter("cmid", cmid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, CommentEntity commentEntity) {
        session.save(commentEntity);
        transaction.commit();
    }

    @Override
    protected List<CommentEntity> retrieveAllHook(Session session) {
        Query<CommentEntity> query = session.createQuery("from CommentEntity ", CommentEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, CommentEntity commentEntity) {
        Query query = session.createQuery("update CommentEntity " +
                "set content = :content," +
                "messageFrom = :messageFrom " +
                "where cmid = :cmid");
        query.setParameter("cmid", commentEntity.getCmid());
        query.setParameter("content", commentEntity.getContent());
        query.setParameter("messageFrom", commentEntity.getMessageFrom());
        query.executeUpdate();
        transaction.commit();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, CommentEntity commentEntity) {
        session.delete(commentEntity);
        transaction.commit();
    }
}
