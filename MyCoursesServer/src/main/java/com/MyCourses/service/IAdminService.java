package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IAdminService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.AdminEntity;
import com.MyCourses.exceptions.*;

public interface IAdminService {


    boolean logIn(AdminEntity adminEntity) throws AdminNotExistException;

    void approveCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException;

    void rejectCourse(Long cid) throws CourseNotExistException, CourseAlreadyReleaseException;

    void approveReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException;

    void rejectReleasement(Long rid) throws ReleasementNotExistException, ReleasementAlreadyPassEffectiveTimeException;
}
