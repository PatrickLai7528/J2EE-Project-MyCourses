package com.j2ee.mycourses.dao.impl;


/*
 * @PackageName daoimpl
 * @ClassName TeacherDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.j2ee.mycourses.dao.ITeacherDao;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TeacherDao extends AbstractGeneralDao<TeacherEntity> implements ITeacherDao {
    @Override
    public TeacherEntity retrieveByEmail(String email) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<TeacherEntity> query = session.createQuery("from TeacherEntity  where teacherEmail = :email",
                TeacherEntity.class);
        query.setParameter("email", email);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, TeacherEntity teacherEntity) {
        System.out.println(teacherEntity);

        // try to new a instance
//        TeacherEntity a = new TeacherEntity();
//        a.setEmail(teacherEntity.getEmail());
//        a.setName(teacherEntity.getName());
//        a.setPassword(teacherEntity.getPassword());
//        a.setTeacherNo(teacherEntity.getTeacherNo());

        session.saveOrUpdate(teacherEntity);
        transaction.commit();
    }

    @Override
    protected List<TeacherEntity> retrieveAllHook(Session session) {
        Query<TeacherEntity> query = session.createQuery("from TeacherEntity", TeacherEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, TeacherEntity teacherEntity) {
        Query query = session.createQuery("update TeacherEntity " +
                "set name = :name," +
                "teacherNo = :teacherNo," +
                "password = :password where teacherEmail = :email");
        query.setParameter("name", teacherEntity.getName());
        query.setParameter("teacherNo", teacherEntity.getTeacherNo());
        query.setParameter("password", teacherEntity.getPassword());
        query.setParameter("email", teacherEntity.getTeacherEmail());
        query.executeUpdate();
        transaction.commit();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, TeacherEntity teacherEntity) {
        session.delete(teacherEntity);
        transaction.commit();
    }

//    @Override
//    public void create(TeacherEntity teacherEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            session.save(teacherEntity);
//            transaction.commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            transaction.rollback();
//        } finally {
//            session.close();
//        }
//    }
//
//    @Override
//    public void create(TeacherDao teacherDao) {
//
//    }
//
//    @Override
//    public List<TeacherEntity> retrieveAll() {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Query<TeacherEntity> query = session.createQuery("from TeacherEntity", TeacherEntity.class);
//        return query.list();
//    }
//
//    @Override
//    public void update(TeacherDao teacherDao) {
//
//    }
//
//    @Override
//    public void physicalDelete(TeacherDao teacherDao) {
//
//    }
//
//    @Override
//    public TeacherEntity retrieveByEmail(String email) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Query<TeacherEntity> query = session.createQuery("from TeacherEntity  where email = :email",
//                TeacherEntity.class);
//        query.setParameter("email", email);
//        assert query.list().size() <= 1;
//        return query.list().get(0);
//    }
//
//    @Override
//    public void update(TeacherEntity teacherEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            Query query = session.createQuery("update TeacherEntity " +
//                    "set name = :name," +
//                    "teacherNo = :teacherNo," +
//                    "password = :password where email = :email");
//            query.setParameter("name", teacherEntity.getName());
//            query.setParameter("teacherNo", teacherEntity.getTeacherNo());
//            query.setParameter("password", teacherEntity.getPassword());
//            query.setParameter("email", teacherEntity.getEmail());
//            query.executeUpdate();
//            transaction.commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            transaction.rollback();
//        } finally {
//            session.close();
//        }
//    }
//
//    @Override
//    public void physicalDelete(TeacherEntity teacherEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            session.delete(teacherEntity);
//            transaction.commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            transaction.rollback();
//        } finally {
//            session.close();
//        }
//    }
}
