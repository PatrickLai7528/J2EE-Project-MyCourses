package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IReportCardDao
 * @Author Lai Kin Meng
 * @Date  2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.ReportCardEntity;

public interface IReportCardDao extends  IGeneralDao<ReportCardEntity>{
    ReportCardEntity retrieveByRcid(long rcid);
}
