package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IForumDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.ForumEntity;

public interface IForumDao extends IGeneralDao<ForumEntity>{
    ForumEntity retrieveByFid(long fid);
}
