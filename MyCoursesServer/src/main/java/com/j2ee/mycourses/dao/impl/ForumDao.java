package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName ForumDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IForumDao;
import com.j2ee.mycourses.entity.CommentEntity;
import com.j2ee.mycourses.entity.ForumEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class ForumDao extends AbstractGeneralDao<ForumEntity> implements IForumDao {
    @Override
    public ForumEntity retrieveByFid(long fid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<ForumEntity> query = session.createQuery("from ForumEntity where fid = :fid",
                ForumEntity.class);
        query.setParameter("fid", fid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, ForumEntity forumEntity) {
        session.save(forumEntity);
//            session.flush();
        transaction.commit();
    }

    @Override
    protected List<ForumEntity> retrieveAllHook(Session session) {
        Query<ForumEntity> query = session.createQuery("from ForumEntity ", ForumEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, ForumEntity forumEntity) {
        Query query = session.createQuery("update ForumEntity " +
                "set topic = :topic," +
                "commentEntityList = :commentEntityList " +
                "where fid = :fid");
        query.setParameter("fid", forumEntity.getFid());
        query.setParameter("topic", forumEntity.getTopic());
//        query.setParameter("courseEntity", forumEntity.getCourseEntity());
        query.setParameter("commentEntityList", forumEntity.getCommentEntityList());
        query.executeUpdate();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, ForumEntity forumEntity) {
        session.delete(forumEntity);
        transaction.commit();
    }
}
