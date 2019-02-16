package com.j2ee.mycourses.dao;/*
 * @PackageName dao
 * @ClassName IStudentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */


import com.j2ee.mycourses.entity.StudentEntity;

public interface IStudentDao extends IGeneralDao<StudentEntity> {

    StudentEntity retrieveByEmail(String email);

    StudentEntity retrieveByStudentNo(String studentNo);

    void logicalDelete(StudentEntity studentEntity);
}
