package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IForumService
 * @Author Lai Kin Meng
 * @Date 2019-02-25
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.ReleasementNotExistException;

public interface IForumService {

    void addForum(String topic,String questioner, Long rid) throws ReleasementNotExistException;
}
