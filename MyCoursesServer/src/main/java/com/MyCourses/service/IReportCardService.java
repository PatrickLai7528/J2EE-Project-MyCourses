package com.MyCourses.service;/*
 * @PackageName com.MyCourses.service
 * @ClassName IReportCardService
 * @Author Lai Kin Meng
 * @Date 2019-03-03
 * @ProjectName MyCoursesServer
 */

import com.MyCourses.exceptions.SelectionNotExistException;

public interface IReportCardService {

    void addScore(Long slid, double score) throws SelectionNotExistException;

}
