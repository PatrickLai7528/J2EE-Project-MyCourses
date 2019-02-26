package com.MyCourses.dao;/*
 * @PackageName com.MyCourses.dao
 * @ClassName IForumDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.ForumEntity;

public interface IForumDAO {
    ForumEntity retrieveByFid(Long fid);

    void update(ForumEntity forumEntity);
}
