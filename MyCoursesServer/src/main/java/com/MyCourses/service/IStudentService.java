package com.MyCourses.service;
/*
 * @PackageName com.MyCourses.service
 * @ClassName IStudentService
 * @Author Lai Kin Meng
 * @Date 2019-02-17
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.StudentEntity;
import com.MyCourses.exceptions.StudentNotExistException;
import com.MyCourses.exceptions.StudentRepeatedException;

import java.util.List;

public interface IStudentService {

    List<StudentEntity> getAllStudents();

    void registry(StudentEntity studentEntity) throws StudentRepeatedException;

    boolean logIn(StudentEntity studentEntity) throws StudentNotExistException;

    void logOut(StudentEntity studentEntity);
}
