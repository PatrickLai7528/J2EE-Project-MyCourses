package com.MyCourses.service;

import java.util.List;

import com.MyCourses.entity.TeacherEntity;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.exceptions.StudentRepeatedException;
import com.MyCourses.exceptions.TeacherNotExistException;
import com.MyCourses.exceptions.TeacherRepeatedException;

public interface ITeacherService {
    /**
     * @return
     */
    List<TeacherEntity> getAllTeachers();

    /**
     * @param teacherEntity password of teacherEntity will be encrypted
     * @throws TeacherRepeatedException
     */
    void registry(TeacherEntity teacherEntity) throws TeacherRepeatedException;


    /**
     * @param teacherEntity
     * @return boolean: if the user's email exist, and the password is correct, return true,
     * if the user's email exist, and the password is wrong, return false
     * @throws TeacherNotExistException if the user's email DOES NOT exist, throw it!
     */
    boolean logIn(TeacherEntity teacherEntity) throws TeacherNotExistException;

    /**
     * @param teacherEntity
     */
    void logOut(TeacherEntity teacherEntity);


    TeacherEntity getByEmail(String email) throws TeacherNotExistException;

    void update(String email, String no, String name, String oldPassword, String newPassword) throws TeacherNotExistException;
}
