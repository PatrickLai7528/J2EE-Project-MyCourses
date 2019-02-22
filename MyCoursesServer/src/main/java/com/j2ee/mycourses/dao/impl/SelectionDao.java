package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName SelectionDao
 * @Author Lai Kin Meng
 * @Date 2019-02-11
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.ISelectionDao;
import com.j2ee.mycourses.entity.ReleasementEntity;
import com.j2ee.mycourses.entity.SelectionEntity;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class SelectionDao extends AbstractGeneralDao<SelectionEntity> implements ISelectionDao {
    @Override
    public SelectionEntity retrieveBySlid(long slid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<SelectionEntity> query = session.createQuery("from SelectionEntity where slid = :slid",
                SelectionEntity.class);
        query.setParameter("slid", slid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    public List<SelectionEntity> retrieveByStudent(StudentEntity studentEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<SelectionEntity> query = session.createQuery("from SelectionEntity where studentEntity = :studentEntity",
                SelectionEntity.class);
        query.setParameter("studentEntity", studentEntity);
        return query.list().isEmpty() ? null : query.list();
    }

    @Override
    public List<SelectionEntity> retrieveByReleasement(ReleasementEntity releasementEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<SelectionEntity> query = session.createQuery("from SelectionEntity where releasementEntity = " +
                        ":releasementEntity",
                SelectionEntity.class);
        query.setParameter("releasementEntity", releasementEntity);
        return query.list().isEmpty() ? null : query.list();
    }

    @Override
    protected void createHook(Session session, Transaction transaction, SelectionEntity selectionEntity) {
        session.save(selectionEntity);
        transaction.commit();
    }

    @Override
    protected List<SelectionEntity> retrieveAllHook(Session session) {
        Query<SelectionEntity> query = session.createQuery("from SelectionEntity ", SelectionEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, SelectionEntity selectionEntity) {
        Query query = session.createQuery("update SelectionEntity " +
                "set selectionState = :state, " +
                "releasementEntity= :releasement, " +
                "studentEntity = :student " +
                " where slid = :slid");
        query.setParameter("state", selectionEntity.getSelectionState());
        query.setParameter("slid", selectionEntity.getSlid());
        query.setParameter("releasement", selectionEntity.getReleasementEntity());
        query.setParameter("student", selectionEntity.getStudentEntity());
        query.executeUpdate();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, SelectionEntity selectionEntity) {
        session.delete(selectionEntity);
        transaction.commit();
    }
}
