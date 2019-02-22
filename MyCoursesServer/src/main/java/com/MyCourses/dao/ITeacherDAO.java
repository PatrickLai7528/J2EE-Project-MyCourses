package com.MyCourses.dao;

import java.util.List;

import com.MyCourses.entity.TeacherEntity;

public interface ITeacherDAO extends IGeneralDAO<TeacherEntity> {

    /**
     * @param email
     * @return
     */
    TeacherEntity retrieveByEmail(String email);

    TeacherEntity retrieveByTeacherNo(String teacherNo);

    /**
     *
     * @param teacherEntity
     */
    void physicalDelete(TeacherEntity teacherEntity);

    /**
     *
     * @param teacherEntity
     * @return
     */
    boolean exist(TeacherEntity teacherEntity);
}

