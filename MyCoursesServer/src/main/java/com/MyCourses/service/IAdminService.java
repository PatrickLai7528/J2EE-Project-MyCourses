package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IAdminService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.AdminEntity;
import com.MyCourses.exceptions.CourseAlreadyReleaseException;
import com.MyCourses.exceptions.CourseNotExistException;
import com.MyCourses.exceptions.ReleasementAlreadyPassEffectiveTimeException;
import com.MyCourses.exceptions.ReleasementNotExistException;

public interface IAdminService {

    boolean logIn(AdminEntity adminEntity);

    void approveCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException;

    void rejectCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException;

    void approveReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException;

    void rejectReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException;
}
