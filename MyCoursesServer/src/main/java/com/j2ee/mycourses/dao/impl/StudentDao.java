package com.j2ee.mycourses.dao.impl;/*
 * @PackageName daoimpl
 * @ClassName StudentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.j2ee.mycourses.dao.IStudentDao;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDao extends AbstractGeneralDao<StudentEntity> implements IStudentDao {
    @Override
    public StudentEntity retrieveByEmail(String email) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<StudentEntity> query = session.createQuery("from StudentEntity  where email = :email",
                StudentEntity.class);
        query.setParameter("email", email);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    public StudentEntity retrieveByStudentNo(String studentNo) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<StudentEntity> query = session.createQuery("from StudentEntity  where studentNo = :studentNo",
                StudentEntity.class);
        query.setParameter("studentNo", studentNo);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    public void logicalDelete(StudentEntity studentEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            studentEntity.setDeleted(true);
            session.update(studentEntity);
            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    protected void createHook(Session session, Transaction transaction, StudentEntity studentEntity) {
        session.save(studentEntity);
//            session.flush();
        transaction.commit();
    }

    @Override
    protected List<StudentEntity> retrieveAllHook(Session session) {
        Query<StudentEntity> query = session.createQuery("from StudentEntity", StudentEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, StudentEntity studentEntity) {
        Query query = session.createQuery("update StudentEntity " +
                "set name = :name," +
                "studentNo = :studentNo," +
                "password = :password," +
                "deleted = :deleted where email = :email");
        query.setParameter("name", studentEntity.getName());
        query.setParameter("studentNo", studentEntity.getStudentNo());
        query.setParameter("password", studentEntity.getPassword());
        query.setParameter("deleted", studentEntity.getDeleted());
        query.setParameter("email", studentEntity.getEmail());
        query.executeUpdate();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, StudentEntity studentEntity) {
        session.delete(studentEntity);
        transaction.commit();
    }


//
//    @Override
//    public void create(StudentEntity studentEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
////            System.out.println(studentEntity);
////            System.out.println(studentEntity.getEmail());
//            session.save(studentEntity);
//            session.flush();
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
//    public List<StudentEntity> retrieveAll() {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Query<StudentEntity> query = session.createQuery("from StudentEntity", StudentEntity.class);
//        return query.list();
//    }
//
//    @Override
//    public StudentEntity retrieveByEmail(String email) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Query<StudentEntity> query = session.createQuery("from StudentEntity  where email = :email",
//                StudentEntity.class);
//        query.setParameter("email", email);
//        return query.list().isEmpty() ? null : query.list().get(0);
//    }
//
//
//    @Override
//    public StudentEntity retrieveByStudentNo(String studentNo) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Query<StudentEntity> query = session.createQuery("from StudentEntity  where studentNo = :studentNo",
//                StudentEntity.class);
//        query.setParameter("studentNo", studentNo);
//        assert query.list().size() <= 1;
//        return query.list().get(0);
//    }
//
//    /**
//     * Email will not be updated
//     *
//     * @param studentEntity
//     */
//    @Override
//    public void update(StudentEntity studentEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            Query query = session.createQuery("update StudentEntity " +
//                    "set name = :name," +
//                    "studentNo = :studentNo," +
//                    "password = :password," +
//                    "deleted = :deleted where email = :email");
//            query.setParameter("name", studentEntity.getName());
//            query.setParameter("studentNo", studentEntity.getStudentNo());
//            query.setParameter("password", studentEntity.getPassword());
//            query.setParameter("deleted", studentEntity.getDeleted());
//            query.setParameter("email", studentEntity.getEmail());
//            query.executeUpdate();
//        } catch (Exception e) {
//            e.printStackTrace();
//            transaction.rollback();
//        }
//
//    }
//
//    @Override
//    public void logicalDelete(StudentEntity studentEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            studentEntity.setDeleted(true);
//            session.update(studentEntity);
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
//    public void physicalDelete(StudentEntity studentEntity) {
//        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        try {
//            session.delete(studentEntity);
//            transaction.commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            transaction.rollback();
//        } finally {
//            session.close();
//        }
//    }
}
