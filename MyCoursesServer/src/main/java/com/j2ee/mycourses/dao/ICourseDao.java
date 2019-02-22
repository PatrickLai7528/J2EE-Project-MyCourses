package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName ICourseDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */


import com.j2ee.mycourses.entity.CourseEntity;

public interface ICourseDao extends IGeneralDao<CourseEntity>{
    CourseEntity retrieveByCid(long cid);
}
