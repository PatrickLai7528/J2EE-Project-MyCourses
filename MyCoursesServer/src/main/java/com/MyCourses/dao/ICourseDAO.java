package com.MyCourses.dao;/*
 * @PackageName com.MyCourses.dao
 * @ClassName ICourseDAO
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.CourseEntity;
import com.MyCourses.entity.TeacherEntity;

import java.util.List;

public interface ICourseDAO extends IGeneralDAO<CourseEntity> {
    CourseEntity retrieveByCid(Long cid);

    List<CourseEntity> retrieveByName(String name);

    List<CourseEntity> retrieveByTeacherEntity(TeacherEntity teacherEntity);
}
