package dao.impl;/*
 * @PackageName daoimpl
 * @ClassName TeacherDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import dao.ITeacherDao;
import entity.StudentEntity;
import entity.TeacherEntity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import utils.HibernateUtils;

import java.util.List;

public class TeacherDao implements ITeacherDao {
    @Override
    public void create(TeacherEntity teacherEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.save(teacherEntity);
            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public List<TeacherEntity> retrieveAll() {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<TeacherEntity> query = session.createQuery("from TeacherEntity", TeacherEntity.class);
        return query.list();
    }

    @Override
    public TeacherEntity retrieveByEmail(String email) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<TeacherEntity> query = session.createQuery("from TeacherEntity  where email = :email",
                TeacherEntity.class);
        query.setParameter("email", email);
        assert query.list().size() <= 1;
        return query.list().get(0);
    }

    @Override
    public void update(TeacherEntity teacherEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            Query query = session.createQuery("update TeacherEntity " +
                    "set name = :name," +
                    "teacherNo = :teacherNo," +
                    "password = :password where email = :email");
            query.setParameter("name", teacherEntity.getName());
            query.setParameter("teacherNo", teacherEntity.getTeacherNo());
            query.setParameter("password", teacherEntity.getPassword());
            query.setParameter("email", teacherEntity.getEmail());
            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public void physicalDelete(TeacherEntity teacherEntity) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.delete(teacherEntity);
            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        } finally {
            session.close();
        }
    }
}
