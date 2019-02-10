package com.j2ee.mycourses.dao.impl;
/*
 * @PackageName com.j2ee.mycourses.dao.impl
 * @ClassName ReportCardDao
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.dao.IReportCardDao;
import com.j2ee.mycourses.entity.ReportCardEntity;
import com.j2ee.mycourses.utils.HibernateUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class ReportCardDao extends AbstractGeneralDao<ReportCardEntity> implements IReportCardDao {
    @Override
    public ReportCardEntity retrieveByRcid(long rcid) {
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Query<ReportCardEntity> query = session.createQuery("from ReportCardEntity where rcid = :rcid",
                ReportCardEntity.class);
        query.setParameter("rcid", rcid);
        return query.list().isEmpty() ? null : query.list().get(0);
    }

    @Override
    protected void createHook(Session session, Transaction transaction, ReportCardEntity reportCardEntity) {
        session.save(reportCardEntity);
//            session.flush();
        transaction.commit();
    }

    @Override
    protected List<ReportCardEntity> retrieveAllHook(Session session) {
        Query<ReportCardEntity> query = session.createQuery("from ReportCardEntity ", ReportCardEntity.class);
        return query.list();
    }

    @Override
    protected void updateHook(Session session, Transaction transaction, ReportCardEntity reportCardEntity) {
        Query query = session.createQuery("update ReportCardEntity " +
                "set reportCardItemList = :reportCardItemList " +
                "where rcid = :rcid");
        query.setParameter("rcid", reportCardEntity.getRcid());
        query.setParameter("reportCardItemList", reportCardEntity.getReportCardItemList());
        query.executeUpdate();
        transaction.commit();
    }

    @Override
    protected void physicalDeleteHook(Session session, Transaction transaction, ReportCardEntity reportCardEntity) {
        session.delete(reportCardEntity);
        transaction.commit();
    }
}
