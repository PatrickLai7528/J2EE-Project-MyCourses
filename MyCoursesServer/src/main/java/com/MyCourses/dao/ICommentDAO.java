package com.MyCourses.dao;/*
 * @PackageName com.MyCourses.dao
 * @ClassName ICommentDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-26
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.CommentEntity;

public interface ICommentDAO extends IGeneralDAO<CommentEntity> {
    CommentEntity retrieveByCmid(Long cmid);
}
