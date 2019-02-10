package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IAssignmentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.AssignmentEntity;


public interface IAssignmentDao extends  IGeneralDao<AssignmentEntity>{
    AssignmentEntity retrieveByAssId(long assId);
}
