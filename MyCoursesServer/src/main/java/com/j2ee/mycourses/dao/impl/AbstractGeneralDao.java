package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName AbstractGeneralDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IGeneralDao;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public abstract class AbstractGeneralDao<T> implements IGeneralDao<T> {
    @Override
    public void create(T t) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            createHook(session, transaction, t);
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    protected abstract void createHook(Session session, Transaction transaction, T t);

    @Override
    public List<T> retrieveAll() {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        return retrieveAllHook(session);
    }

    protected abstract List<T> retrieveAllHook(Session session);

    @Override
    public void update(T t) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            updateHook(session, transaction, t);
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    protected abstract void updateHook(Session session, Transaction transaction, T t);

    @Override
    public void physicalDelete(T t) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
             physicalDeleteHook(session, transaction, t);
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    protected abstract void physicalDeleteHook(Session session, Transaction transaction, T t);
}
