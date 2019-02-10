package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IReleasementDao
 * @Author Lai Kin Meng
 * @Date  2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.ReleasementEntity;

public interface IReleasementDao extends IGeneralDao<ReleasementEntity> {
    ReleasementEntity retrieveByRid(long rid);
}
