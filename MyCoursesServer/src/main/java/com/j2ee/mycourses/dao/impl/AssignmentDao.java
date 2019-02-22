package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName AssignmentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IAssignmentDao;
import com.j2ee.mycourses.entity.AssignmentEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class AssignmentDao extends AbstractGeneralDao<AssignmentEntity> implements IAssignmentDao {

    @Override
    public AssignmentEntity retrieveByAssId(long assId) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<AssignmentEntity> query = session.createQuery("from AssignmentEntity where assId = :assId",
                AssignmentEntity.class);
        query.setParameter("assId", assId);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, AssignmentEntity assignmentEntity) {
        session.save(assignmentEntity);
        transaction.commit();
    }

    @Override
    protected List<AssignmentEntity> retrieveAllHook(Session session) {
        Query<AssignmentEntity> query = session.createQuery("from AssignmentEntity ", AssignmentEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, AssignmentEntity assignmentEntity) {
        Query query = session.createQuery("update AssignmentEntity " +
                "set title = :title," +
                "description = :description," +
                "slideEntity = :slideEntity where assId = :assId");
        query.setParameter("assId", assignmentEntity.getAssId());
        query.setParameter("title", assignmentEntity.getTitle());
        query.setParameter("description", assignmentEntity.getDescription());
        query.setParameter("slideEntity", assignmentEntity.getSlideEntity());
        query.executeUpdate();
        transaction.commit();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, AssignmentEntity assignmentEntity) {
        session.delete(assignmentEntity);
        transaction.commit();
    }
}
