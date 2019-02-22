package com.MyCourses.dao;
/*
 * @PackageName dao
 * @ClassName IStudentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.MyCourses.entity.StudentEntity;


public interface IStudentDAO extends IGeneralDAO<StudentEntity> {

    StudentEntity retrieveByEmail(String email);

    StudentEntity retrieveByStudentNo(String studentNo);

    void logicalDelete(StudentEntity studentEntity);

    boolean exists(StudentEntity studentEntity);
}
