package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IStatisticsService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.entity.TeacherStatistics;
import com.MyCourses.exceptions.ReleasementNotExistException;
import com.MyCourses.exceptions.TeacherNotExistException;

public interface IStatisticsService {
    TeacherStatistics getTeacherStatistics(String teacherEmail) throws TeacherNotExistException, ReleasementNotExistException;
}
