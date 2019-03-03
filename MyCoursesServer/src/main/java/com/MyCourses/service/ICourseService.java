package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName ICourseService
 * @Author Lai Kin Meng
 * @Date 2019-02-19
 * @ProjectName spring-boot-demo
 */

import com.MyCourses.entity.CourseEntity;
import com.MyCourses.exceptions.*;

import java.util.List;
import java.util.Map;

public interface ICourseService {
    List<CourseEntity> getAllCourses();

    List<CourseEntity> getCoursesByTeacherEmail(String teacherEmail) throws TeacherNotExistException;

    void add(CourseEntity courseEntity) throws CourseHasNoTeacherException;

//    void release(Long cid) throws CourseNotExistException;

    void release(Long cid, Map<String, String> config) throws CourseNotExistException, UnexpectedReleaseConfig, ReleasementDateException;

    CourseEntity findByCid(Long cid) throws CourseNotExistException;

}
