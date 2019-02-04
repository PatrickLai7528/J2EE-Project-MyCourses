package dao;/*
 * @PackageName dao
 * @ClassName IStudentDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import entity.StudentEntity;

import java.util.List;

public interface IStudentDao {
    void create(StudentEntity studentEntity);

    List<StudentEntity> retrieveAll();

    StudentEntity retrieveByEmail(String email);

    StudentEntity retrieveByStudentNo(String studentNo);

    void update(StudentEntity studentEntity);

    void logicalDelete(StudentEntity studentEntity);

    void physicalDelete(StudentEntity studentEntity);
}
