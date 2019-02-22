package com.j2ee.mycourses.dao;

/*
 * @PackageName dao
 * @ClassName ITeacherDao
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import com.j2ee.mycourses.entity.TeacherEntity;

public interface ITeacherDao extends IGeneralDao<TeacherEntity>{
    TeacherEntity retrieveByEmail(String email);
}
