package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName ICommentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.CommentEntity;

public interface ICommentDao extends  IGeneralDao<CommentEntity> {
    CommentEntity retrieveByCmid(long cmid);
}
