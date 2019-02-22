package com.j2ee.mycourses.service;

/*
 * @PackageName com.j2ee.mycourses.service
 * @ClassName ICourseService
 * @Author Lai Kin Meng
 * @Date 2019-02-10
 * @ProjectName MyCoursesServer
 */

import com.j2ee.mycourses.entity.CourseEntity;
import com.j2ee.mycourses.entity.ReleasementEntity;
import com.j2ee.mycourses.entity.StudentEntity;
import com.j2ee.mycourses.error.CourseHasNoTeacherException;
import com.j2ee.mycourses.error.TeacherNotExistException;

public interface ICourseService {

    void newCourse(CourseEntity courseEntity) throws CourseHasNoTeacherException, TeacherNotExistException;

    void releaseCourse(ReleasementEntity releasementEntity);

    boolean selectCourse(ReleasementEntity releasementEntity, StudentEntity studentEntity);

    void dropCourse(ReleasementEntity releasementEntity, StudentEntity studentEntity);
}
