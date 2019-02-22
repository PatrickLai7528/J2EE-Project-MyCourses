package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName CourseDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.ICourseDao;
import com.j2ee.mycourses.entity.CourseEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseDao extends AbstractGeneralDao<CourseEntity> implements ICourseDao {

    @Override
    public CourseEntity retrieveByCid(long cid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<CourseEntity> query = session.createQuery("from CourseEntity  where cid = :cid",
                CourseEntity.class);
        query.setParameter("cid", cid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, CourseEntity courseEntity) {
        session.save(courseEntity);
//            session.flush();
        transaction.commit();
    }

    @Override
    protected List<CourseEntity> retrieveAllHook(Session session) {
        Query<CourseEntity> query = session.createQuery("from CourseEntity ", CourseEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, CourseEntity courseEntity) {
        Query query = session.createQuery("update CourseEntity " +
                "set name = :name," +
//                "teacherEntity = :teacherEntity," +
                "assignmentEntityList = :assignmentEntityList," +
                "slideEntityList = :slideEntityList, " +
                "forumEntityList = : forumEntityList," +
                "reportCardEntity = :reportCardEntity " +
                "where cid = :cid");
        query.setParameter("name", courseEntity.getName());
//        query.setParameter("teacherEntity", courseEntity.getTeacherEntity());
        query.setParameter("assignmentEntityList",  courseEntity.getAssignmentEntityList());
        query.setParameter("slideEntityList", courseEntity.getSlideEntityList());
        query.setParameter("forumEntityList", courseEntity.getForumEntityList());
        query.setParameter("reportCardEntity", courseEntity.getReportCardEntity());
        query.executeUpdate();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, CourseEntity courseEntity) {
       session.delete(courseEntity);
       transaction.commit();
    }
}
