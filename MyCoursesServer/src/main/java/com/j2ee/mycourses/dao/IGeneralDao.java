package com.j2ee.mycourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IGeneralDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.AssignmentEntity;

import java.util.List;

public interface IGeneralDao<T> {
    void create(T t);

    List<T> retrieveAll();

    void update(T t);

    void physicalDelete(T t);
}
