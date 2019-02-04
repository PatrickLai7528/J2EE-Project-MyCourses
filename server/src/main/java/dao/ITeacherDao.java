package dao;/*
 * @PackageName dao
 * @ClassName ITeacherDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import entity.TeacherEntity;

import java.util.List;

public interface ITeacherDao {
    void create(TeacherEntity teacherEntity);

    List<TeacherEntity> retrieveAll();

    TeacherEntity retrieveByEmail(String email);

    void update(TeacherEntity teacherEntity);

    void physicalDelete(TeacherEntity teacherEntity);
}
