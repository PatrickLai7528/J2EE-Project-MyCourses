package com.j2ee.mycourses.service;
/*
 * @PackageName service
 * @ClassName IUserAuthService
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */


import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.entity.TeacherEntity;
import com.j2ee.mycourses.error.StudentNotExistException;
import com.j2ee.mycourses.error.StudentRepeatedException;
import com.j2ee.mycourses.error.TeacherNotExistException;
import com.j2ee.mycourses.error.TeacherRepeatedException;

public interface IUserAuthService {

    /**
     *
     * @param teacherEntity password of teacherEntity will be encrypted
     * @throws TeacherRepeatedException
     */
    void registry(TeacherEntity teacherEntity) throws TeacherRepeatedException;

    /**
     *
     * @param studentEntity password of studentEntity will be encrypted
     * @throws StudentRepeatedException
     */
    void registry(StudentEntity studentEntity) throws StudentRepeatedException;

    /**
     *
     * @param teacherEntity
     * @return boolean: if the user's email exist, and the password is correct, return true,
     *                  if the user's email exist, and the password is wrong, return false
     * @throws TeacherNotExistException if the user's email DOES NOT exist, throw it!
     */
    boolean logIn(TeacherEntity teacherEntity) throws TeacherNotExistException;

    /**
     * @param studentEntity studentEntity is expected to be unencrypted
     * @return boolean: if the user's email exist, and the password is correct, return true,
     *                  if the user's email exist, and the password is wrong, return false
     * @throws StudentNotExistException if the user's email DOES NOT exist, throw it!
     */
    boolean logIn(StudentEntity studentEntity) throws StudentNotExistException;

    void logOut(TeacherEntity teacherEntity);
    void logOut(StudentEntity studentEntity);

    void logOff(StudentEntity studentEntity) throws StudentNotExistException;
}
