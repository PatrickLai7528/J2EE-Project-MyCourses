package com.j2ee.mycourses.dao.impl;/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName ReleasementDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IReleasementDao;
import com.j2ee.mycourses.entity.ReleasementEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class ReleasementDao extends AbstractGeneralDao<ReleasementEntity> implements IReleasementDao {
    @Override
    public ReleasementEntity retrieveByRid(long rid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<ReleasementEntity> query = session.createQuery("from ReleasementEntity where rid = :rid",
                ReleasementEntity.class);
        query.setParameter("rid", rid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, ReleasementEntity releasementEntity) {
        session.save(releasementEntity);
//            session.flush();
        transaction.commit();
    }

    @Override
    protected List<ReleasementEntity> retrieveAllHook(Session session) {
        Query<ReleasementEntity> query = session.createQuery("from ReleasementEntity ", ReleasementEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, ReleasementEntity releasementEntity) {
        Query query = session.createQuery("update ReleasementEntity " +
                "set courseEntity = :courseEntity," +
                "startHour = :startHour," +
                "startMin = :startMin, " +
                "endHour = :endHour, " +
                "endMin = :endMin, " +
                "repeatAfterNDay = :repeatAfterDay, " +
                "effectiveTime = :effectiveTime, " +
                "deadTime = :deadTime, " +
                "limitNumber = :limitNumber where rid = :rid");
        query.setParameter("rid", releasementEntity.getRid());
        query.setParameter("courseEntity", releasementEntity.getCourseEntity());
        query.setParameter("startHour", releasementEntity.getStartHour());
        query.setParameter("startMin", releasementEntity.getStartMin());
        query.setParameter("endHour", releasementEntity.getEndHour());
        query.setParameter("endMin", releasementEntity.getEndMin());
        query.setParameter("repeatAfterDay", releasementEntity.getRepeatAfterNDay());        query.setParameter("endHour", releasementEntity.getEndHour());
        query.setParameter("effectiveTime", releasementEntity.getEffectiveTime());
        query.setParameter("deadTime", releasementEntity.getDeadTime());
        query.setParameter("limitNumber", releasementEntity.getLimitNumber());

        query.executeUpdate();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, ReleasementEntity releasementEntity) {
        session.delete(releasementEntity);
        transaction.commit();
    }
}
