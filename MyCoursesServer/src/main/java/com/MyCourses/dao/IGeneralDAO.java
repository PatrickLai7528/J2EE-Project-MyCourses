package com.MyCourses.dao;/*
 * @PackageName com.j2ee.mycourses.dao
 * @ClassName IGeneralDao
 * @Author Lai Kin Meng
 * @Date 2019-02-09
 * @ProjectName MyCoursesServer
 */


import java.util.List;

public interface IGeneralDAO<T> {
    void create(T t);

    List<T> retrieveAll();

    void update(T t);

    void physicalDelete(T t);
}
