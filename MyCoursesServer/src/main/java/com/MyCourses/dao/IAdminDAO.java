package com.MyCourses.dao;/*
 * @PackageName com.MyCourses.dao
 * @ClassName IAdminDAO
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.AdminEntity;

public interface IAdminDAO {
    AdminEntity retrieveByEmail(String adminEmail);
}
